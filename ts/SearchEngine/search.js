"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module parsing the GET query parameters and then search the index.json by using binary tree method.
const jquery_1 = require("jquery");
class node {
    constructor(name, description, left, right) {
        this.name = name;
        this.description = description;
        this.left = left;
        this.right = right;
    }
    /*
     * Get page url based on the @resource string.
     */
    getURL() {
        var url = "/" + this.resource
            .replace("[\\]", "/")
            .replace("\.[mM][dD]", ".html");
        return url;
    }
}
// The binary tree search engine.
class tree {
    constructor(tree) {
        this.root = tree;
    }
    // search this binary tree and then returns the node object, 
    // and finally using the returned node object build a result 
    // url and show the search result description.
    search(term) {
        var np = this.root;
        var cmp = 0;
        while (np) {
            cmp = term.localeCompare(np.name);
            if (cmp == 0) {
                // found target
                return np;
            }
            if (cmp < 0) {
                np = np.left;
            }
            else {
                np = np.right;
            }
        }
        // found nothing, target term is not exists.
        return null;
    }
}
// Get the query parameters and then reutrns the term key for the search input
function getTerm() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var key = url.searchParams.get("query");
    return key;
}
function getSearchResult() {
    var key = getTerm();
    // index is the tree root node.
    // index.json database file is located at wwwroot
    jquery_1.default.get("/index.json", function (index) {
        var searchEngine = new tree(index);
        var term = searchEngine.search(key);
        var url = term.getURL();
        var title = `<h2><a href='${url}'>${key}</a></h2>`;
        var description = `<p>${term.description}</p>`;
        jquery_1.default("#search-result").html(title + description);
    });
}
//# sourceMappingURL=search.js.map