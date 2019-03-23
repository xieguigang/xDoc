module CodeEditor.Navigate {

    export interface IJsTreeTerm {
        icon: string;
        id: string;
        parent: string;
        text: string;
        type: string;
    }

    export function HashParser(hash: string = window.location.hash): Reference {
        if (Strings.Empty(hash, true)) {
            return null;
        } else {
            let tokens: string[] = hash.substr(1).split("#");
            let line: number = -1;
            let path: string = tokens[0];

            if (tokens.length > 1) {
                line = parseInt(/\d+/.exec(tokens[1])[0]);
            }
            if (path.charAt(0) == "/") {
                path = path.substr(1);
            }

            return <Reference>{ fileName: path, line: line }
        }
    }

    export interface Reference {
        fileName: string;
        line: number;
    }

    export function Do(callback: Delegate.Sub = null): void {
        let input = Navigate.HashParser();

        if (!isNullOrUndefined(input)) {
            CodeEditor.highLightVBfile(input.fileName, function () {
                if (input.line > 0) {
                    $ts.location.hash(false, `#/${input.fileName}#L${input.line}`);
                    JumpToLine(input.line);
                }

                if (callback) {
                    callback();
                }
            });
        }
    }

    export function JumpToLine(line: number) {
        window.scrollTo(0, 16 * line);
    }
}