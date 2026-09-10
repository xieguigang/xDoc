Imports System.Security.Cryptography
Imports System.Text

''' <summary>
''' the experimental TOTP based authentication of the nuget server.
''' </summary>
''' <remarks>
''' a new user is registered by its email only. the server generates a unique
''' 128 characters random salt, derives a per user TOTP secret from the email
''' and the salt, and returns the base32 encoded secret to the client which
''' stores it locally. every later upload must present a valid TOTP code
''' generated from that secret, so the server never stores or transmits a
''' password.
''' </remarks>
Public Class TotpAuth

    ''' <summary>
    ''' the length of the per user random salt string.
    ''' </summary>
    Public Const SaltLength As Integer = 128

    Private Const SaltAlphabet As String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    Private ReadOnly store As NugetStore

    Public Sub New(store As NugetStore)
        Me.store = store
    End Sub

    ''' <summary>
    ''' register the given email. when the email is already registered the
    ''' existing record (and secret) is returned, so the operation is idempotent.
    ''' </summary>
    ''' <param name="email">the user email address.</param>
    ''' <returns>the registered user record.</returns>
    Public Function Register(email As String) As UserRecord
        If String.IsNullOrEmpty(email) Then
            Return Nothing
        End If

        email = email.Trim()

        Dim existing As UserRecord = store.GetUser(email)
        If existing IsNot Nothing Then
            Return existing
        End If

        Dim salt As String = GenerateSalt(SaltLength)
        Dim secret As String = TotpModule.Base32Encode(DeriveSecret(email, salt))

        Return store.CreateUser(email, salt, secret)
    End Function

    ''' <summary>
    ''' verify the given TOTP code against the secret derived from the stored
    ''' salt of the given email.
    ''' </summary>
    ''' <param name="email">the user email address.</param>
    ''' <param name="code">the six digits TOTP code.</param>
    ''' <returns><c>True</c> when the code is valid.</returns>
    Public Function Authenticate(email As String, code As String) As Boolean
        If String.IsNullOrEmpty(email) OrElse String.IsNullOrEmpty(code) Then
            Return False
        End If

        Dim user As UserRecord = store.GetUser(email)
        If user Is Nothing OrElse String.IsNullOrEmpty(user.salt) Then
            Return False
        End If

        Dim secret As Byte() = DeriveSecret(email.Trim(), user.salt)

        Return TotpModule.VerifyTotp(secret, code.Trim())
    End Function

    ''' <summary>
    ''' generate a cryptographically secure random salt string.
    ''' </summary>
    ''' <param name="length">the requested salt length in characters.</param>
    ''' <returns>the random salt string.</returns>
    Public Shared Function GenerateSalt(length As Integer) As String
        Dim buffer(length - 1) As Byte

        Using rng As RandomNumberGenerator = RandomNumberGenerator.Create()
            rng.GetBytes(buffer)
        End Using

        Dim sb As New StringBuilder(length)
        For i As Integer = 0 To length - 1
            sb.Append(SaltAlphabet(buffer(i) Mod SaltAlphabet.Length))
        Next

        Return sb.ToString()
    End Function

    ''' <summary>
    ''' deterministically derive the TOTP secret (20 bytes, the RFC 4226
    ''' recommended length) from the email and the per user salt, so that the
    ''' server can recompute it at verification time without storing the secret
    ''' in plain text.
    ''' </summary>
    ''' <param name="email">the user email address.</param>
    ''' <param name="salt">the per user random salt.</param>
    ''' <returns>the derived secret key bytes.</returns>
    Public Shared Function DeriveSecret(email As String, salt As String) As Byte()
        Using hmac As New HMACSHA256(Encoding.UTF8.GetBytes(salt))
            Dim hash As Byte() = hmac.ComputeHash(Encoding.UTF8.GetBytes(email.Trim().ToLowerInvariant()))
            Dim secret(19) As Byte

            Array.Copy(hash, secret, secret.Length)

            Return secret
        End Using
    End Function
End Class
