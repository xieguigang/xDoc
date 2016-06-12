
# Terminal
_namespace: [Microsoft.VisualBasic.Terminal](N-Microsoft.VisualBasic.Terminal.md)_

Represents the standard input, output, and error streams for console applications. 交互式的命令行终端

### Methods

#### Beep
Plays the sound of a beep of a specified frequency and duration through the console speaker.
#### Clear
Clears the console buffer and corresponding console window of display information.
#### MoveBufferArea
Copies a specified source area of the screen buffer to a specified destination area.
#### OpenStandardError
Acquires the standard error stream, which is set to a specified buffer size.
_returns: The standard error stream._
#### OpenStandardInput
Acquires the standard input stream, which is set to a specified buffer size.
_returns: The standard input stream._
#### OpenStandardOutput
Acquires the standard output stream, which is set to a specified buffer size.
_returns: The standard output stream._
#### Read
Reads the next character from the standard input stream.
_returns: The next character from the input stream, or negative one (-1) if there are currently no more characters to be read._
#### ReadKey
Obtains the next character or function key pressed by the user. The pressed key is optionally displayed in the console window.
_returns: A System.ConsoleKeyInfo object that describes the System.ConsoleKey constant and Unicode character, if any, that correspond to the pressed console key. The System.ConsoleKeyInfo object also describes, in a bitwise combination of System.ConsoleModifiers values, whether one or more Shift, Alt, or Ctrl modifier keys was pressed simultaneously with the console key._
#### ReadLine
Reads the next line of characters from the standard input stream.
_returns: The next line of characters from the input stream, or null if no more lines are available._
#### ResetColor
Sets the foreground and background console colors to their defaults.
#### SetBufferSize
Sets the height and width of the screen buffer area to the specified values.
#### SetCursorPosition
Sets the position of the cursor.
#### SetError
Sets the System.Console.Error property to the specified System.IO.TextWriter object.
#### SetIn
Sets the System.Console.In property to the specified System.IO.TextReader object.
#### SetOut
Sets the System.Console.Out property to the specified System.IO.TextWriter object.
#### SetWindowPosition
Sets the position of the console window relative to the screen buffer.
#### SetWindowSize
Sets the height and width of the console window to the specified values.
#### Write
Writes the text representation of the specified 64-bit unsigned integer value to the standard output stream.
#### WriteLine
Writes the text representation of the specified 64-bit unsigned integer value, followed by the current line terminator, to the standard output stream.


### Properties

#### BackgroundColor
Gets or sets the background color of the console.
#### BufferHeight
Gets or sets the height of the buffer area.
#### BufferWidth
Gets or sets the width of the buffer area.
#### CapsLock
Gets a value indicating whether the CAPS LOCK keyboard toggle is turned on or turned off.
#### CursorLeft
Gets or sets the column position of the cursor within the buffer area.
#### CursorSize
Gets or sets the height of the cursor within a character cell.
#### CursorTop
Gets or sets the row position of the cursor within the buffer area.
#### CursorVisible
Gets or sets a value indicating whether the cursor is visible.
#### Error
Gets the standard error output stream.
#### ForegroundColor
Gets or sets the foreground color of the console.
#### In
Gets the standard input stream.
#### InputEncoding
Gets or sets the encoding the console uses to read input.
#### IsErrorRedirected
Gets a value that indicates whether the error output stream has been redirected from the standard error stream.
#### IsInputRedirected
Gets a value that indicates whether input has been redirected from the standard input stream.
#### IsOutputRedirected
Gets a value that indicates whether output has been redirected from the standard output stream.
#### KeyAvailable
Gets a value indicating whether a key press is available in the input stream.
#### LargestWindowHeight
Gets the largest possible number of console window rows, based on the current font and screen resolution.
#### LargestWindowWidth
Gets the largest possible number of console window columns, based on the current font and screen resolution.
#### NumberLock
Gets a value indicating whether the NUM LOCK keyboard toggle is turned on or turned off.
#### Out
Gets the standard output stream.
#### OutputEncoding
Gets or sets the encoding the console uses to write output.
#### Title
Gets or sets the title to display in the console title bar.
#### TreatControlCAsInput
Gets or sets a value indicating whether the combination of the System.ConsoleModifiers.Control modifier key and System.ConsoleKey.C console key (Ctrl+C) is treated as ordinary input or as an interruption that is handled by the operating system.
#### WindowHeight
Gets or sets the height of the console window area.
#### WindowLeft
Gets or sets the leftmost position of the console window area relative to the screen buffer.
#### WindowTop
Gets or sets the top position of the console window area relative to the screen buffer.
#### WindowWidth
Gets or sets the width of the console window.

