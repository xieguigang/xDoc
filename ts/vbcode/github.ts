namespace vscode.github {

    export class raw {
        
        // https://raw.githubusercontent.com/xieguigang/sciBASIC/stable-2019-start/Microsoft.VisualBasic.Core/CommandLine/CommandLine.vb
        public username: string;
        public repo: string;
        public commit: string = "master";

        public fileURL(path: string): string {
            return `https://raw.githubusercontent.com/${this.username}/${this.repo}/${this.commit}/${path}`
        }
    }
}