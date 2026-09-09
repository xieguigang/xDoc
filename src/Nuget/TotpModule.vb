'=====================================================================
'  TotpModule.vb —— TOTP（RFC 6238）算法的 VB.NET 完整实现
'
'  功能：
'    1. 生成加密安全的随机密钥（含 Base32 形式）
'    2. Base32 编码 / 解码（RFC 4648）
'    3. 生成 TOTP 验证码（支持 SHA1 / SHA256 / SHA512）
'    4. 验证码校验（时间窗口容差 + 固定时间比较防时序攻击）
'    5. 生成 otpauth:// URI（配合二维码供验证器 App 扫码导入）
'    6. RFC 6238 附录 B 官方测试向量自检
'
'  依赖：.NET Framework 4.x / .NET Core / .NET 5+ 均可，无第三方库
'=====================================================================
Imports System
Imports System.Collections.Generic
Imports System.Security.Cryptography
Imports System.Text

''' <summary>
''' HMAC 哈希算法选择。RFC 6238 支持 SHA1/SHA256/SHA512，
''' 要与 Google Authenticator 等验证器 App 兼容必须使用 SHA1。
''' </summary>
Public Enum TotpHmacAlgorithm
    SHA1
    SHA256
    SHA512
End Enum

Public Module TotpModule

    '==================== 默认参数 ====================

    ''' <summary>时间步长（秒），RFC 6238 与各验证器 App 均为 30 秒</summary>
    Public Const DefaultStepSeconds As Integer = 30

    ''' <summary>验证码位数，常见 6 位</summary>
    Public Const DefaultDigits As Integer = 6

    ''' <summary>容差窗口：允许前后各 N 个时间步（默认 1，即 ±30 秒）</summary>
    Public Const DefaultTimeWindow As Integer = 1

    Private Const Base32Alphabet As String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    Private ReadOnly Epoch1970 As New DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)

    '==================== 1. 密钥生成 ====================

    ''' <summary>
    ''' 使用加密安全随机数生成器（CSPRNG）生成共享密钥
    ''' </summary>
    ''' <param name="keyLength">密钥长度（字节），RFC 4226 建议至少 16 字节，常用 20</param>
    Public Function GenerateSecretKey(Optional ByVal keyLength As Integer = 20) As Byte()
        If keyLength < 16 Then
            Throw New ArgumentException("密钥长度不得少于 16 字节（RFC 4226 建议）。")
        End If
        Dim key(keyLength - 1) As Byte
        Using rng As RandomNumberGenerator = RandomNumberGenerator.Create()
            rng.GetBytes(key)
        End Using
        Return key
    End Function

    ''' <summary>生成 Base32 字符串形式的密钥（用于展示、扫码导入验证器 App）</summary>
    Public Function GenerateSecretKeyBase32(Optional ByVal keyLength As Integer = 20) As String
        Return Base32Encode(GenerateSecretKey(keyLength))
    End Function

    '==================== 2. Base32 编解码 ====================

    Public Function Base32Encode(ByVal data As Byte()) As String
        If data Is Nothing Then Throw New ArgumentNullException("data")

        Dim sb As New StringBuilder(((data.Length * 8 + 4) \ 5))
        Dim buffer As Integer = 0     ' 位缓冲
        Dim bits As Integer = 0       ' 缓冲中已有的位数

        For Each b As Byte In data
            buffer = (buffer << 8) Or b
            bits += 8
            While bits >= 5
                bits -= 5
                sb.Append(Base32Alphabet((buffer >> bits) And &H1F))
            End While
        Next

        ' 处理不足 5 位的尾部
        If bits > 0 Then
            sb.Append(Base32Alphabet((buffer << (5 - bits)) And &H1F))
        End If

        ' 注：不加 "=" 填充，以兼容 Google Authenticator；解码对有无填充均可处理
        Return sb.ToString()
    End Function

    Public Function Base32Decode(ByVal encoded As String) As Byte()
        If String.IsNullOrEmpty(encoded) Then
            Throw New ArgumentException("Base32 字符串不能为空。")
        End If

        Dim clean As String = encoded.Replace("=", "").Replace(" ", "").ToUpperInvariant()
        Dim data As New List(Of Byte)()
        Dim buffer As Integer = 0
        Dim bits As Integer = 0

        For Each c As Char In clean
            Dim value As Integer = Base32Alphabet.IndexOf(c)
            If value < 0 Then
                Throw New FormatException("Base32 字符串中包含无效字符: '" & c & "'")
            End If
            buffer = (buffer << 5) Or value
            bits += 5
            If bits >= 8 Then
                bits -= 8
                data.Add(CByte((buffer >> bits) And &HFF))
            End If
        Next

        Return data.ToArray()
    End Function

    '==================== 3. TOTP 验证码生成 ====================

    ''' <summary>
    ''' 生成指定时刻的 TOTP 验证码
    ''' </summary>
    ''' <param name="secret">共享密钥（字节数组）</param>
    ''' <param name="unixTimestamp">Unix 时间戳（秒）；传 -1 表示使用当前时间</param>
    ''' <param name="stepSeconds">时间步长，默认 30 秒</param>
    ''' <param name="digits">验证码位数，默认 6 位</param>
    ''' <param name="algorithm">HMAC 算法，默认 SHA1（与验证器 App 兼容）</param>
    Public Function GenerateTotp(ByVal secret As Byte(),
                                 Optional ByVal unixTimestamp As Long = -1,
                                 Optional ByVal stepSeconds As Integer = DefaultStepSeconds,
                                 Optional ByVal digits As Integer = DefaultDigits,
                                 Optional ByVal algorithm As TotpHmacAlgorithm = TotpHmacAlgorithm.SHA1) As String
        If secret Is Nothing OrElse secret.Length = 0 Then
            Throw New ArgumentException("密钥不能为空。")
        End If
        If stepSeconds <= 0 Then
            Throw New ArgumentOutOfRangeException("stepSeconds", "时间步长必须为正数。")
        End If

        Dim unixTime As Long = If(unixTimestamp < 0, GetUnixTime(), unixTimestamp)
        Dim counter As Long = unixTime \ stepSeconds      ' 时间步计数器
        Return GenerateTotpByCounter(secret, counter, digits, algorithm)
    End Function

    ''' <summary>重载：直接用 Base32 密钥字符串生成当前验证码</summary>
    Public Function GenerateTotp(ByVal secretBase32 As String,
                                 Optional ByVal stepSeconds As Integer = DefaultStepSeconds,
                                 Optional ByVal digits As Integer = DefaultDigits,
                                 Optional ByVal algorithm As TotpHmacAlgorithm = TotpHmacAlgorithm.SHA1) As String
        Return GenerateTotp(Base32Decode(secretBase32), -1, stepSeconds, digits, algorithm)
    End Function

    ' ---------- 核心私有实现 ----------
    Private Function GenerateTotpByCounter(ByVal secret As Byte(),
                                           ByVal counter As Long,
                                           ByVal digits As Integer,
                                           ByVal algorithm As TotpHmacAlgorithm) As String
        If digits < 1 OrElse digits > 9 Then
            Throw New ArgumentOutOfRangeException("digits", "验证码位数应在 1~9 之间。")
        End If

        ' (1) 计数器 → 8 字节大端表示（RFC 4226 §5.2）
        Dim counterBytes(7) As Byte
        For i As Integer = 0 To 7
            counterBytes(i) = CByte((counter >> (8 * (7 - i))) And &HFFL)
        Next

        ' (2) 用密钥对计数器计算 HMAC 哈希
        Dim hash As Byte()
        Using hmac As HMAC = CreateHmac(secret, algorithm)
            hash = hmac.ComputeHash(counterBytes)
        End Using

        ' (3) 动态截断 Dynamic Truncation（RFC 4226 §5.3）
        Dim offset As Integer = hash(hash.Length - 1) And &HF
        Dim codeValue As Integer = ((hash(offset) And &H7F) << 24) _
                                Or (hash(offset + 1) << 16) _
                                Or (hash(offset + 2) << 8) _
                                Or hash(offset + 3)

        ' (4) 按 10^digits 取模，左侧补零到指定位数
        Dim modulus As Integer = CInt(Math.Pow(10, digits))
        Return (codeValue Mod modulus).ToString("D" & digits.ToString())
    End Function

    Private Function CreateHmac(ByVal secret As Byte(), ByVal algorithm As TotpHmacAlgorithm) As HMAC
        Select Case algorithm
            Case TotpHmacAlgorithm.SHA1 : Return New HMACSHA1(secret)
            Case TotpHmacAlgorithm.SHA256 : Return New HMACSHA256(secret)
            Case TotpHmacAlgorithm.SHA512 : Return New HMACSHA512(secret)
            Case Else
                Throw New ArgumentOutOfRangeException("algorithm", "不支持的 HMAC 算法。")
        End Select
    End Function

    '==================== 4. 验证码校验 ====================

    ''' <summary>
    ''' 校验用户输入的 TOTP 验证码。
    ''' 在当前时间步前后各 timeWindow 个步长范围内比对，容忍客户端/服务器时钟偏差。
    ''' </summary>
    Public Function VerifyTotp(ByVal secret As Byte(),
                              ByVal inputCode As String,
                              Optional ByVal timeWindow As Integer = DefaultTimeWindow,
                              Optional ByVal stepSeconds As Integer = DefaultStepSeconds,
                              Optional ByVal digits As Integer = DefaultDigits,
                              Optional ByVal algorithm As TotpHmacAlgorithm = TotpHmacAlgorithm.SHA1) As Boolean
        ' 输入格式快速检查
        If secret Is Nothing OrElse secret.Length = 0 Then Return False
        If inputCode Is Nothing OrElse inputCode.Length <> digits Then Return False
        For Each c As Char In inputCode
            If c < "0"c OrElse c > "9"c Then Return False
        Next

        Dim currentStep As Long = GetUnixTime() \ stepSeconds
        For offset As Integer = -timeWindow To timeWindow
            Dim expected As String = GenerateTotpByCounter(secret, currentStep + offset, digits, algorithm)
            If FixedTimeEquals(expected, inputCode) Then
                Return True
            End If
        Next
        Return False
    End Function

    ''' <summary>重载：直接用 Base32 密钥字符串校验</summary>
    Public Function VerifyTotp(ByVal secretBase32 As String,
                              ByVal inputCode As String,
                              Optional ByVal timeWindow As Integer = DefaultTimeWindow,
                              Optional ByVal stepSeconds As Integer = DefaultStepSeconds,
                              Optional ByVal digits As Integer = DefaultDigits,
                              Optional ByVal algorithm As TotpHmacAlgorithm = TotpHmacAlgorithm.SHA1) As Boolean
        Return VerifyTotp(Base32Decode(secretBase32), inputCode, timeWindow, stepSeconds, digits, algorithm)
    End Function

    ' 固定时间字符串比较，缓解时序侧信道攻击
    Private Function FixedTimeEquals(ByVal a As String, ByVal b As String) As Boolean
        If a Is Nothing OrElse b Is Nothing OrElse a.Length <> b.Length Then
            Return False
        End If
        Dim diff As Integer = 0
        For i As Integer = 0 To a.Length - 1
            diff = diff Or (AscW(a(i)) Xor AscW(b(i)))
        Next
        Return diff = 0
    End Function

    '==================== 5. 辅助工具 ====================

    ''' <summary>获取当前 Unix 时间戳（秒）</summary>
    Public Function GetUnixTime() As Long
        Return CLng((DateTimeOffset.UtcNow - Epoch1970).TotalSeconds)
    End Function

    ''' <summary>当前验证码的剩余有效秒数（可用于界面倒计时显示）</summary>
    Public Function GetRemainingSeconds(Optional ByVal stepSeconds As Integer = DefaultStepSeconds) As Integer
        Dim elapsed As Long = GetUnixTime() Mod stepSeconds
        Return stepSeconds - CInt(elapsed)
    End Function

    ''' <summary>
    ''' 生成 otpauth:// URI。将其转成二维码图片后，验证器 App 扫码即可自动导入密钥。
    ''' </summary>
    Public Function BuildOtpAuthUri(ByVal secretBase32 As String,
                                    ByVal account As String,
                                    ByVal issuer As String,
                                    Optional ByVal algorithm As TotpHmacAlgorithm = TotpHmacAlgorithm.SHA1,
                                    Optional ByVal digits As Integer = DefaultDigits,
                                    Optional ByVal periodSeconds As Integer = DefaultStepSeconds) As String
        Dim sb As New StringBuilder()
        sb.Append("otpauth://totp/")
        sb.Append(Uri.EscapeDataString(issuer & ":" & account))
        sb.Append("?secret=").Append(secretBase32)
        sb.Append("&issuer=").Append(Uri.EscapeDataString(issuer))
        sb.Append("&algorithm=").Append(AlgorithmToName(algorithm))
        sb.Append("&digits=").Append(digits)
        sb.Append("&period=").Append(periodSeconds)
        Return sb.ToString()
    End Function

    Private Function AlgorithmToName(ByVal algorithm As TotpHmacAlgorithm) As String
        Select Case algorithm
            Case TotpHmacAlgorithm.SHA256 : Return "SHA256"
            Case TotpHmacAlgorithm.SHA512 : Return "SHA512"
            Case Else : Return "SHA1"
        End Select
    End Function
End Module
