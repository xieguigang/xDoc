Imports System.Collections.Generic
Imports System.Globalization
Imports System.IO
Imports System.Linq
Imports System.Security.Cryptography
Imports System.Text
Imports Flute.Http.Core
Imports Flute.Http.Core.HttpStream
Imports Flute.Http.Core.Message
Imports Flute.Http.Core.Message.HttpHeader
Imports Microsoft.VisualBasic.Net.Http

''' <summary>
''' the experimental nuget server controller.
''' </summary>
''' <remarks>
''' this class is loaded through reflection by the Fluteway ``/run`` command.
''' it exposes the nuget v3 protocol endpoints (service index, flat container,
''' registration and search), the experimental TOTP protected upload endpoints
''' and the json endpoints consumed by the static web front end.
''' </remarks>
Public Class Service
    Implements IHttpAppModule

    Private config As NugetConfiguration
    Private store As NugetStore
    Private auth As TotpAuth
    Private router As HttpRouter

    Public Sub Mount(router As HttpRouter, config As IReadOnlyDictionary(Of String, String)) Implements IHttpAppModule.Mount
        Me.router = router
        Me.config = NugetConfiguration.FromConfig(config)

        Call Directory.CreateDirectory(Me.config.DataDirectory)
        Call Directory.CreateDirectory(Me.config.PackageDirectory)
        Call Directory.CreateDirectory(Me.config.DatabaseDirectory)

        Me.store = New NugetStore(Me.config.DatabaseDirectory)
        Me.auth = New TotpAuth(Me.store)

        Call $"nuget server data directory: {Me.config.DataDirectory}".info()
    End Sub

#Region "service index"

    <HttpGet("/v3/index.json")>
    Public Sub ServiceIndex(req As HttpRequest, res As HttpResponse)
        Dim baseUrl As String = getBaseUrl(req)

        Dim resources As New List(Of Object) From {
            resource($"{baseUrl}/v3-flatcontainer/", "PackageBaseAddress/3.0.0", "Package base address (flat container)"),
            resource($"{baseUrl}/v3/registration/", "RegistrationsBaseUrl/3.6.0", "Package registration metadata"),
            resource($"{baseUrl}/v3/registration/", "RegistrationsBaseUrl/3.4.0", "Package registration metadata"),
            resource($"{baseUrl}/v3/search", "SearchQueryService/3.0.0-beta", "Package search"),
            resource($"{baseUrl}/v3/autocomplete", "SearchAutocompleteService/3.0.0-beta", "Package autocomplete"),
            resource($"{baseUrl}/api/v2/package", "PackagePublish/2.0.0", "Package publish endpoint")
        }

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(New Dictionary(Of String, Object) From {
            {"version", "3.0.0"},
            {"resources", resources}
        })
    End Sub

#End Region

#Region "flat container"

    <HttpGet("/v3-flatcontainer/{id}/index.json")>
    Public Sub FlatContainerVersions(req As HttpRequest, res As HttpResponse)
        Dim id As String = routeValue(req, "id")
        Dim versions As List(Of PackageRecord) = store.GetVersions(id)

        If versions.Count = 0 Then
            res.WriteError(HTTP_RFC.RFC_NOT_FOUND, $"package '{id}' was not found")
            Return
        End If

        Dim data As String() = versions _
            .Select(Function(v) v.version.ToLowerInvariant()) _
            .ToArray()

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(New Dictionary(Of String, Object) From {
            {"versions", data}
        })
    End Sub

    <HttpGet("/v3-flatcontainer/{id}/{version}/{file}")>
    Public Sub FlatContainerDownload(req As HttpRequest, res As HttpResponse)
        Dim id As String = routeValue(req, "id")
        Dim version As String = routeValue(req, "version")
        Dim fileName As String = routeValue(req, "file")
        Dim pkg As PackageRecord = store.GetPackage(id, version)

        If pkg Is Nothing Then
            res.WriteError(HTTP_RFC.RFC_NOT_FOUND, $"package '{id}' {version} was not found")
            Return
        End If

        If fileName.EndsWith(".nuspec", StringComparison.OrdinalIgnoreCase) Then
            Dim nuspec As String = nuspecFilePath(pkg)

            If File.Exists(nuspec) Then
                res.AccessControlAllowOrigin = "*"
                res.SendFile(nuspec)
            Else
                res.WriteError(HTTP_RFC.RFC_NOT_FOUND, "the nuspec manifest was not found")
            End If
        Else
            Dim package As String = nupkgFilePath(pkg)

            If File.Exists(package) Then
                Call store.IncrementDownload(pkg.package_id, pkg.version)
                res.AccessControlAllowOrigin = "*"
                res.SendFile(package)
            Else
                res.WriteError(HTTP_RFC.RFC_NOT_FOUND, "the package file was not found")
            End If
        End If
    End Sub

#End Region

#Region "registration"

    <HttpGet("/v3/registration/{id}/index.json")>
    Public Sub RegistrationIndex(req As HttpRequest, res As HttpResponse)
        Dim id As String = routeValue(req, "id")
        Dim versions As List(Of PackageRecord) = store.GetVersions(id)

        If versions.Count = 0 Then
            res.WriteError(HTTP_RFC.RFC_NOT_FOUND, $"package '{id}' was not found")
            Return
        End If

        Dim baseUrl As String = getBaseUrl(req)
        Dim idLower As String = versions.First().package_id.ToLowerInvariant()
        Dim leaves As New List(Of Object)

        For Each pkg As PackageRecord In versions
            leaves.Add(registrationLeaf(baseUrl, pkg))
        Next

        Dim range As New Dictionary(Of String, Object) From {
            {"@id", $"{baseUrl}/v3/registration/{idLower}/index.json"},
            {"count", leaves.Count},
            {"lower", versions.First().version.ToLowerInvariant()},
            {"upper", versions.Last().version.ToLowerInvariant()},
            {"items", leaves}
        }

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(New Dictionary(Of String, Object) From {
            {"count", 1},
            {"items", New List(Of Object) From {range}}
        })
    End Sub

    <HttpGet("/v3/registration/{id}/{version}.json")>
    Public Sub RegistrationLeaf(req As HttpRequest, res As HttpResponse)
        Dim id As String = routeValue(req, "id")
        Dim version As String = routeValue(req, "version")
        Dim pkg As PackageRecord = store.GetPackage(id, version)

        If pkg Is Nothing Then
            res.WriteError(HTTP_RFC.RFC_NOT_FOUND, $"package '{id}' {version} was not found")
            Return
        End If

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(registrationLeaf(getBaseUrl(req), pkg))
    End Sub

    Private Function registrationLeaf(baseUrl As String, pkg As PackageRecord) As Dictionary(Of String, Object)
        Dim idLower As String = pkg.package_id.ToLowerInvariant()
        Dim versionLower As String = pkg.version.ToLowerInvariant()
        Dim content As String = $"{baseUrl}/v3-flatcontainer/{idLower}/{versionLower}/{idLower}.{versionLower}.nupkg"

        Return New Dictionary(Of String, Object) From {
            {"@id", $"{baseUrl}/v3/registration/{idLower}/{versionLower}.json"},
            {"catalogEntry", catalogEntry(baseUrl, pkg)},
            {"listed", pkg.listed},
            {"packageContent", content},
            {"published", isoDate(pkg.published)},
            {"registration", $"{baseUrl}/v3/registration/{idLower}/index.json"}
        }
    End Function

    Private Function catalogEntry(baseUrl As String, pkg As PackageRecord) As Dictionary(Of String, Object)
        Dim idLower As String = pkg.package_id.ToLowerInvariant()
        Dim versionLower As String = pkg.version.ToLowerInvariant()
        Dim content As String = $"{baseUrl}/v3-flatcontainer/{idLower}/{versionLower}/{idLower}.{versionLower}.nupkg"

        Return New Dictionary(Of String, Object) From {
            {"@id", $"{baseUrl}/v3/catalog/{idLower}/{versionLower}.json"},
            {"id", pkg.package_id},
            {"version", pkg.version},
            {"description", pkg.description},
            {"authors", pkg.authors},
            {"iconUrl", ""},
            {"language", ""},
            {"licenseUrl", ""},
            {"licenseExpression", If(pkg.license, "")},
            {"listed", pkg.listed},
            {"minClientVersion", ""},
            {"packageContent", content},
            {"projectUrl", If(pkg.project_url, "")},
            {"published", isoDate(pkg.published)},
            {"requireLicenseAcceptance", False},
            {"summary", If(pkg.description, "")},
            {"tags", splitTags(pkg.tags)},
            {"title", pkg.package_id},
            {"versionDownloadCount", pkg.downloads},
            {"downloadCount", pkg.downloads},
            {"dependencyGroups", dependencyGroups(pkg)}
        }
    End Function

    Private Function dependencyGroups(pkg As PackageRecord) As List(Of Object)
        Dim dependencies As List(Of DependencyInfo) = parseDependencies(pkg.dependencies)

        If dependencies.Count = 0 Then
            Return New List(Of Object)
        End If

        Dim items As New List(Of Object)
        For Each dependency As DependencyInfo In dependencies
            items.Add(New Dictionary(Of String, Object) From {
                {"id", dependency.id},
                {"range", dependency.range}
            })
        Next

        Return New List(Of Object) From {
            New Dictionary(Of String, Object) From {
                {"targetFramework", ""},
                {"dependencies", items}
            }
        }
    End Function

#End Region

#Region "search"

    <HttpGet("/v3/search")>
    Public Sub Search(req As HttpRequest, res As HttpResponse)
        Dim keyword As String = queryValue(req, "q")
        Dim skip As Integer = queryInt(req, "skip", 0)
        Dim take As Integer = queryInt(req, "take", 20)
        Dim baseUrl As String = getBaseUrl(req)

        Dim groups As List(Of PackageSearchResult) = store.GroupPackages(keyword)
        Dim page As List(Of PackageSearchResult) = groups.Skip(skip).Take(take).ToList()
        Dim data As New List(Of Object)

        For Each group As PackageSearchResult In page
            Dim idLower As String = group.package_id.ToLowerInvariant()
            Dim versions As New List(Of Object)

            For Each version As PackageRecord In group.versions
                versions.Add(New Dictionary(Of String, Object) From {
                    {"version", version.version},
                    {"downloads", version.downloads},
                    {"@id", $"{baseUrl}/v3/registration/{idLower}/{version.version.ToLowerInvariant()}.json"}
                })
            Next

            data.Add(New Dictionary(Of String, Object) From {
                {"@id", $"{baseUrl}/v3/registration/{idLower}/index.json"},
                {"id", idLower},
                {"version", group.latest.version},
                {"description", group.latest.description},
                {"versions", versions},
                {"authors", splitTags(group.latest.authors)},
                {"tags", splitTags(group.latest.tags)},
                {"totalDownloads", group.total_downloads},
                {"verified", False},
                {"packageTypes", New List(Of Object) From {
                    New Dictionary(Of String, Object) From {{"name", "Dependency"}}
                }}
            })
        Next

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(New Dictionary(Of String, Object) From {
            {"totalHits", groups.Count},
            {"data", data}
        })
    End Sub

    <HttpGet("/v3/autocomplete")>
    Public Sub Autocomplete(req As HttpRequest, res As HttpResponse)
        Dim packageId As String = queryValue(req, "id")

        If Not String.IsNullOrEmpty(packageId) Then
            Dim versions As List(Of PackageRecord) = store.GetVersions(packageId)
            res.AccessControlAllowOrigin = "*"
            res.WriteJSON(New Dictionary(Of String, Object) From {
                {"totalHits", versions.Count},
                {"data", versions.Select(Function(v) v.version).ToArray()}
            })
            Return
        End If

        Dim keyword As String = queryValue(req, "q")
        Dim groups As List(Of PackageSearchResult) = store.GroupPackages(keyword)

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(New Dictionary(Of String, Object) From {
            {"totalHits", groups.Count},
            {"data", groups.Take(20).Select(Function(g) g.package_id.ToLowerInvariant()).ToArray()}
        })
    End Sub

#End Region

#Region "register and upload"

    <HttpPost("/api/register")>
    Public Sub RegisterUser(req As HttpPOSTRequest, res As HttpResponse)
        Dim email As String = argument(req, "email")

        If String.IsNullOrEmpty(email) Then
            res.WriteError(HTTP_RFC.RFC_BAD_REQUEST, "the email argument is required")
            Return
        End If

        Dim user As UserRecord = auth.Register(email)

        If user Is Nothing Then
            res.WriteError(HTTP_RFC.RFC_INTERNAL_SERVER_ERROR, "failed to register the user")
            Return
        End If

        Call writeResult(res, True, $"registered {user.email}", New Dictionary(Of String, Object) From {
            {"email", user.email},
            {"secret", user.secretKey},
            {"issuer", "nuget"},
            {"otpauth", TotpModule.BuildOtpAuthUri(user.secretKey, user.email, "nuget")}
        })
    End Sub

    <HttpPost("/api/v2/package")>
    Public Sub UploadCustom(req As HttpPOSTRequest, res As HttpResponse)
        Call uploadPackage(req, res, argument(req, "email"), argument(req, "code"))
    End Sub

    <HttpPut("/api/v2/package")>
    Public Sub UploadStandard(req As HttpPOSTRequest, res As HttpResponse)
        Dim apiKey As String = req.HttpHeaders.TryGetValue("X-NuGet-ApiKey")
        Dim email As String = ""
        Dim code As String = ""

        If Not String.IsNullOrEmpty(apiKey) Then
            Dim index As Integer = apiKey.IndexOf(":"c)
            If index > 0 Then
                email = apiKey.Substring(0, index)
                code = apiKey.Substring(index + 1)
            End If
        End If

        Call uploadPackage(req, res, email, code)
    End Sub

    Private Sub uploadPackage(req As HttpPOSTRequest, res As HttpResponse, email As String, code As String)
        If Not auth.Authenticate(email, code) Then
            res.WriteError(HTTP_RFC.RFC_UNAUTHORIZED, "invalid email or TOTP code")
            Return
        End If

        Dim upload As HttpPostedFile = firstUpload(req)

        If upload Is Nothing Then
            res.WriteError(HTTP_RFC.RFC_BAD_REQUEST, "the package file is required (multipart field 'file')")
            Return
        End If

        Dim temp As String = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString("N") & ".nupkg")

        Try
            Call upload.SaveAs(temp)

            Dim metadata As NupkgMetadata
            Try
                metadata = NupkgReader.ReadMetadata(temp)
            Catch ex As Exception
                Call App.LogException(ex)
                res.WriteError(HTTP_RFC.RFC_BAD_REQUEST, $"invalid nupkg package: {ex.Message}")
                Return
            End Try

            If String.IsNullOrEmpty(metadata.Id) OrElse String.IsNullOrEmpty(metadata.Version) Then
                res.WriteError(HTTP_RFC.RFC_BAD_REQUEST, "invalid nuspec: the id or version is missing")
                Return
            End If

            If store.PackageExists(metadata.Id, metadata.Version) Then
                res.WriteError(HTTP_RFC.RFC_CONFLICT, $"package {metadata.Id} {metadata.Version} already exists")
                Return
            End If

            Dim pkg As New PackageRecord With {
                .package_id = metadata.Id,
                .version = metadata.Version,
                .description = metadata.Description,
                .authors = metadata.Authors,
                .tags = metadata.Tags,
                .project_url = metadata.ProjectUrl,
                .license = metadata.License,
                .dependencies = metadata.Dependencies,
                .downloads = 0,
                .size = New FileInfo(temp).Length,
                .sha256 = computeSha256(temp),
                .published = Date.UtcNow,
                .listed = True
            }

            ' the files are only written to their final location after all the
            ' validations passed, so a rejected upload leaves no half product.
            Call Directory.CreateDirectory(versionDirectory(pkg))
            Call File.Copy(temp, nupkgFilePath(pkg), overwrite:=True)
            Call File.WriteAllText(nuspecFilePath(pkg), NupkgReader.ReadNuspecXml(temp))
            Call store.AddPackage(pkg)
            Call registerStaticFiles(pkg)

            Call writeResult(res, True, $"published {pkg.package_id} {pkg.version}", New Dictionary(Of String, Object) From {
                {"id", pkg.package_id},
                {"version", pkg.version},
                {"size", pkg.size},
                {"sha256", pkg.sha256}
            })
        Catch ex As Exception
            Call App.LogException(ex)
            res.WriteError(HTTP_RFC.RFC_INTERNAL_SERVER_ERROR, ex.Message)
        Finally
            Try
                If File.Exists(temp) Then
                    File.Delete(temp)
                End If
            Catch
            End Try
        End Try
    End Sub

#End Region

#Region "web front end json api"

    <HttpGet("/api/packages")>
    Public Sub ApiPackages(req As HttpRequest, res As HttpResponse)
        Dim keyword As String = queryValue(req, "q")
        Dim skip As Integer = queryInt(req, "skip", 0)
        Dim take As Integer = queryInt(req, "take", 50)

        Dim all As List(Of PackageSummary) = store.ListPackages(keyword)
        Dim page As List(Of PackageSummary) = all.Skip(skip).Take(take).ToList()

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(New Dictionary(Of String, Object) From {
            {"total", all.Count},
            {"skip", skip},
            {"take", take},
            {"packages", page.Select(Function(p) packageSummaryJson(p)).ToList()}
        })
    End Sub

    <HttpGet("/api/stats")>
    Public Sub ApiStats(req As HttpRequest, res As HttpResponse)
        Dim stats As NugetStats = store.Stats()
        Dim groups As List(Of PackageSearchResult) = store.GroupPackages("")

        Dim top As New List(Of Object)
        For Each group As PackageSearchResult In groups.OrderByDescending(Function(g) g.total_downloads).Take(10)
            top.Add(New Dictionary(Of String, Object) From {
                {"id", group.package_id},
                {"latestVersion", group.latest.version},
                {"downloads", group.total_downloads},
                {"versions", group.versions.Count}
            })
        Next

        Dim recent As New List(Of Object)
        For Each pkg As PackageRecord In store.ReadAllPackages().OrderByDescending(Function(p) p.published).Take(10)
            recent.Add(New Dictionary(Of String, Object) From {
                {"id", pkg.package_id},
                {"version", pkg.version},
                {"published", isoDate(pkg.published)},
                {"downloads", pkg.downloads}
            })
        Next

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(New Dictionary(Of String, Object) From {
            {"stats", New Dictionary(Of String, Object) From {
                {"packages", stats.packages},
                {"versions", stats.versions},
                {"downloads", stats.downloads},
                {"users", stats.users}
            }},
            {"topDownloads", top},
            {"recent", recent},
            {"generated", isoDate(Date.UtcNow)}
        })
    End Sub

    <HttpGet("/api/package/{id}")>
    Public Sub ApiPackage(req As HttpRequest, res As HttpResponse)
        Call writePackageDetail(req, res, routeValue(req, "id"), Nothing)
    End Sub

    <HttpGet("/api/package/{id}/{version}")>
    Public Sub ApiPackageVersion(req As HttpRequest, res As HttpResponse)
        Call writePackageDetail(req, res, routeValue(req, "id"), routeValue(req, "version"))
    End Sub

    Private Sub writePackageDetail(req As HttpRequest, res As HttpResponse, id As String, version As String)
        Dim versions As List(Of PackageRecord) = store.GetVersions(id)

        If versions.Count = 0 Then
            res.WriteError(HTTP_RFC.RFC_NOT_FOUND, $"package '{id}' was not found")
            Return
        End If

        Dim latest As PackageRecord = If(String.IsNullOrEmpty(version), versions.Last(),
            versions.FirstOrDefault(Function(v) v.version.Equals(version, StringComparison.OrdinalIgnoreCase)))

        If latest Is Nothing Then
            res.WriteError(HTTP_RFC.RFC_NOT_FOUND, $"package '{id}' {version} was not found")
            Return
        End If

        Dim baseUrl As String = getBaseUrl(req)
        Dim idLower As String = latest.package_id.ToLowerInvariant()
        Dim versionList As New List(Of Object)

        For Each item As PackageRecord In versions
            Dim versionLower As String = item.version.ToLowerInvariant()
            versionList.Add(New Dictionary(Of String, Object) From {
                {"version", item.version},
                {"downloads", item.downloads},
                {"size", item.size},
                {"published", isoDate(item.published)},
                {"listed", item.listed},
                {"downloadUrl", $"{baseUrl}/v3-flatcontainer/{idLower}/{versionLower}/{idLower}.{versionLower}.nupkg"},
                {"nuspecUrl", $"{baseUrl}/v3-flatcontainer/{idLower}/{versionLower}/{idLower}.nuspec"}
            })
        Next

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(New Dictionary(Of String, Object) From {
            {"id", latest.package_id},
            {"description", latest.description},
            {"authors", latest.authors},
            {"tags", splitTags(latest.tags)},
            {"license", latest.license},
            {"projectUrl", latest.project_url},
            {"latestVersion", versions.Last().version},
            {"selectedVersion", latest.version},
            {"totalDownloads", versions.Sum(Function(v) v.downloads)},
            {"published", isoDate(latest.published)},
            {"versions", versionList}
        })
    End Sub

    Private Shared Function packageSummaryJson(pkg As PackageSummary) As Dictionary(Of String, Object)
        Return New Dictionary(Of String, Object) From {
            {"id", pkg.package_id},
            {"latestVersion", pkg.latest_version},
            {"description", pkg.description},
            {"authors", pkg.authors},
            {"tags", pkg.tags},
            {"license", pkg.license},
            {"projectUrl", pkg.project_url},
            {"totalDownloads", pkg.total_downloads},
            {"versions", pkg.versions},
            {"published", isoDate(pkg.published)}
        }
    End Function

#End Region

#Region "helpers"

    Private Function versionDirectory(pkg As PackageRecord) As String
        Return Path.Combine(config.PackageDirectory, pkg.package_id.ToLowerInvariant(), pkg.version.ToLowerInvariant())
    End Function

    Private Function nupkgFilePath(pkg As PackageRecord) As String
        Dim idLower As String = pkg.package_id.ToLowerInvariant()
        Dim versionLower As String = pkg.version.ToLowerInvariant()
        Return Path.Combine(versionDirectory(pkg), $"{idLower}.{versionLower}.nupkg")
    End Function

    Private Function nuspecFilePath(pkg As PackageRecord) As String
        Return Path.Combine(versionDirectory(pkg), $"{pkg.package_id.ToLowerInvariant()}.nuspec")
    End Function

    Private Sub registerStaticFiles(pkg As PackageRecord)
        If router Is Nothing OrElse router.FileSystem Is Nothing Then
            Return
        End If

        Dim idLower As String = pkg.package_id.ToLowerInvariant()
        Dim versionLower As String = pkg.version.ToLowerInvariant()
        Dim fs As Flute.Http.FileSystem.FileSystem = router.FileSystem.fs(0)

        Call fs.AddMapping($"/packages/{idLower}/{versionLower}/{idLower}.{versionLower}.nupkg", nupkgFilePath(pkg))
        Call fs.AddMapping($"/packages/{idLower}/{versionLower}/{idLower}.nuspec", nuspecFilePath(pkg))
    End Sub

    Private Function getBaseUrl(req As HttpRequest) As String
        If config IsNot Nothing AndAlso Not String.IsNullOrEmpty(config.BaseUrl) Then
            Return config.BaseUrl.TrimEnd("/"c)
        End If

        Dim host As String = req.HttpHeaders.TryGetValue("Host")
        If String.IsNullOrEmpty(host) Then
            host = "localhost"
        End If

        Return "http://" & host
    End Function

    Private Shared Function resource(id As String, type As String, comment As String) As Dictionary(Of String, Object)
        Return New Dictionary(Of String, Object) From {
            {"@id", id},
            {"@type", type},
            {"comment", comment}
        }
    End Function

    Private Shared Function routeValue(req As HttpRequest, name As String) As String
        If req.RouteData IsNot Nothing Then
            Dim value As String = Nothing
            If req.RouteData.TryGetValue(name, value) Then
                Return value
            End If
        End If
        Return Nothing
    End Function

    Private Shared Function argument(req As HttpRequest, name As String) As String
        Dim value As String = CType(req.Argument(name), String)
        If value Is Nothing Then
            Return ""
        End If
        Return value.Trim()
    End Function

    Private Shared Function queryValue(req As HttpRequest, name As String) As String
        Return argument(req, name)
    End Function

    Private Shared Function queryInt(req As HttpRequest, name As String, fallback As Integer) As Integer
        Dim value As Integer
        If Integer.TryParse(queryValue(req, name), value) AndAlso value >= 0 Then
            Return value
        End If
        Return fallback
    End Function

    Private Shared Function splitTags(text As String) As String()
        If String.IsNullOrEmpty(text) Then
            Return New String() {}
        End If
        Return text.Split(New Char() {" "c, ","c, ";"c}, StringSplitOptions.RemoveEmptyEntries)
    End Function

    Private Shared Function isoDate(value As Date) As String
        If value = Date.MinValue Then
            value = Date.UtcNow
        End If
        Return value.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ", CultureInfo.InvariantCulture)
    End Function

    Private Shared Function computeSha256(path As String) As String
        Using stream As Stream = File.OpenRead(path)
            Using algorithm As SHA256 = SHA256.Create()
                Dim hash As Byte() = algorithm.ComputeHash(stream)
                Dim sb As New StringBuilder

                For Each b As Byte In hash
                    sb.Append(b.ToString("x2"))
                Next

                Return sb.ToString()
            End Using
        End Using
    End Function

    Private Shared Function firstUpload(req As HttpPOSTRequest) As HttpPostedFile
        If req.POSTData Is Nothing OrElse req.POSTData.files Is Nothing Then
            Return Nothing
        End If

        Dim list As List(Of HttpPostedFile) = Nothing
        If req.POSTData.files.TryGetValue("file", list) AndAlso list IsNot Nothing AndAlso list.Count > 0 Then
            Return list(0)
        End If

        For Each item In req.POSTData.files
            If item.Value IsNot Nothing AndAlso item.Value.Count > 0 Then
                Return item.Value(0)
            End If
        Next

        Return Nothing
    End Function

    Private Shared Sub writeResult(res As HttpResponse, ok As Boolean, message As String, Optional data As Dictionary(Of String, Object) = Nothing)
        Dim payload As New Dictionary(Of String, Object) From {
            {"ok", ok},
            {"message", message}
        }

        If data IsNot Nothing Then
            For Each item In data
                payload(item.Key) = item.Value
            Next
        End If

        res.AccessControlAllowOrigin = "*"
        res.WriteJSON(payload)
    End Sub

    Private Class DependencyInfo
        Public Property id As String
        Public Property range As String
    End Class

    Private Shared Function parseDependencies(text As String) As List(Of DependencyInfo)
        Dim list As New List(Of DependencyInfo)

        If String.IsNullOrEmpty(text) Then
            Return list
        End If

        For Each part As String In text.Split(";"c)
            If String.IsNullOrEmpty(part) Then
                Continue For
            End If

            Dim index As Integer = part.IndexOf("|"c)
            If index < 0 Then
                list.Add(New DependencyInfo With {.id = part, .range = ""})
            Else
                list.Add(New DependencyInfo With {
                    .id = part.Substring(0, index),
                    .range = part.Substring(index + 1)
                })
            End If
        Next

        Return list
    End Function

#End Region
End Class
