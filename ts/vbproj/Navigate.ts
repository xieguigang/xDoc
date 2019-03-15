﻿module Navigate {

    export function HashParser(hash: string = window.location.hash): Reference {
        if (Strings.Empty(hash, true)) {
            return null;
        } else {
            let tokens: string[] = hash.substr(1).split("#");
            let line: number = 1;
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

    export function Do(): void {
        let input = Navigate.HashParser();

        if (!isNullOrUndefined(input)) {
            highLightVBfile(input.fileName);
        }
    }
}