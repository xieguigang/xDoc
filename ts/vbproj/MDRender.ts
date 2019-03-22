module CodeEditor {

    export class MDRender extends htmlRenderer {

        public image(href: string, title: string, text: string): string {
            href = helpers.cleanUrl(this.options.sanitize, this.options.baseUrl, href);

            if (href === null) {
                return text;
            } else if (htmlRenderer.hrefSolver && htmlRenderer.hrefSolver != undefined) {
                href = htmlRenderer.hrefSolver(href);
            }

            var out = '<img style="max-width: 65%;" src="' + href + '" alt="' + text + '"';
            if (title) {
                out += ' title="' + title + '"';
            }
            out += this.options.xhtml ? '/>' : '>';
            return out;
        }
    }
}