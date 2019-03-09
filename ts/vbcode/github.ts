namespace vscode.github {

    /**
     * Github 源文件请求帮助模块
    */
    export class raw {

        // https://raw.githubusercontent.com/xieguigang/sciBASIC/stable-2019-start/Microsoft.VisualBasic.Core/CommandLine/CommandLine.vb
        public username: string;
        public repo: string;
        /**
         * 代码库的版本编号
        */
        public commit: string = "master";

        public constructor(user: string, repo: string, commit: string = "master") {
            this.username = user;
            this.repo = repo;
            this.commit = commit;
        }

        /**
         * 构建生成目标源文件在github上面的位置链接url
        */
        public fileURL(path: string): string {
            return `https://raw.githubusercontent.com/${this.username}/${this.repo}/${this.commit}/${path}`
        }

        public highlightCode(fileName: string, display: string | IHTMLElement, style: CSS = vscode.VisualStudio) {
            vscode.highlightGithub(this, fileName, display, style);
        }
    }
}