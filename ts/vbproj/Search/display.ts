﻿namespace CodeEditor.Search {

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

        var node = document.getElementById(div);

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
        var div = document.createElement("div");
        var a = document.createElement("a");

        a.onclick = function () {
            click(term);
        }
        a.href = "#";
        a.text = term.term;
        a.title = term.term;

        div.appendChild(a);

        return div;
    }
}