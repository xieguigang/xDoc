module Navigate {

    export function HashParser(hash: string = window.location.hash): Reference {
        if (Strings.Empty(hash, true)) {
            return null;
        } else {
            let tokens: string[] = hash.substr(1).split("#");
            let line: number = 1;

            if (tokens.length > 1) {
                line = parseInt(/\d+/.exec(tokens[1])[0]);
            }

            return <Reference>{
                fileName: tokens[0],
                line: line
            }
        }
    }

    export interface Reference {
        fileName: string;
        line: number;
    }
}