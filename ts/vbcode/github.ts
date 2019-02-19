namespace vscode.github {

    export class raw {

        // https://raw.githubusercontent.com/xieguigang/sciBASIC/stable-2019-start/Microsoft.VisualBasic.Core/CommandLine/CommandLine.vb
        public username: string;
        public repo: string;
        public commit: string = "master";

        public constructor(user: string, repo: string, commit: string = "master") {
            this.username = user;
            this.repo = repo;
            this.commit = commit;
        }

        public fileURL(path: string): string {
            return `https://raw.githubusercontent.com/${this.username}/${this.repo}/${this.commit}/${path}`
        }

        public highlightCode(fileName: string, display: string | IHTMLElement, style: CSS = vscode.VisualStudio) {
            vscode.highlightGithub(this, fileName, display, style);
        }
    }
}