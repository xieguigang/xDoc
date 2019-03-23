namespace CodeEditor.Search {

    /**
     * 将结果显示到网页上面
    */
    export function makeSuggestions(terms: term[], div: string,
        click: (term: term) => void,
        top: number = 10,
        caseInsensitive: boolean = false): (input: string) => void {

        var suggestions: suggestion = new suggestion(terms);

        return (input: string) => {
            // console.log(input);
            showSuggestions(suggestions, input,
                div, click,
                top, caseInsensitive
            );
        };
    }

    export function showSuggestions(suggestion: suggestion,
        input: string,
        div: string,
        click: (term: term) => void,
        top: number = 10,
        caseInsensitive: boolean = false) {

        var node: HTMLElement = $ts(div);

        if (!node) {
            console.error(`Unable to find node which its id equals to: ${div}`);
            return;
        } else {
            node.innerHTML = "";
        }

        suggestion.populateSuggestion(input, top, caseInsensitive)
            .forEach(term => {
                node.appendChild(listItem(term, click));
            });
    }

    export function listItem(term: term, click: (term: term) => void): HTMLElement {       
        var a = $ts("<a>", {
            onclick: () => click(term),
            href: "#",
            text: term.term,
            title: term.term
        });

        return $ts("<div>").display(a);
    }
}