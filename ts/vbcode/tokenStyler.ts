namespace vscode {

    export class tokenStyler {

        public comment(token: string): string {
            return `<span class="comment">${token}</span>`;
        }

        public string(token: string): string {
            return `<span class="string">${token}</span>`;
        }

        public keyword(token: string): string {
            return `<span class="keyword">${token}</span>`;
        }

        public attribute(token: string): string {
            return `<span class="attribute">${token}</span>`;
        }
    }
}