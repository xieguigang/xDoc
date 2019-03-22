module CodeEditor {

    export class MDRender extends markedjs.htmlRenderer {

        public image(href: string, title: string, text: string): string {
            href = markedjs.helpers.cleanUrl(this.options.sanitize, this.options.baseUrl, href);

            if (href === null) {
                return text;
            } else {
                href = githubImageURL(href);
            }

            var out = '<img style="max-width: 65%;" src="' + href + '" alt="' + text + '"';

            if (title) {
                out += ' title="' + title + '"';
            }

            out += this.options.xhtml ? '/>' : '>';
            // out = `<div style="width: 100%; text-align: center;">${out}</div>`;

            return out;
        }
    }
}