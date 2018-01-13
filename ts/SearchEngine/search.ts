// module parsing the GET query parameters and then search the index.json by using binary tree method.
import $ from "jquery";

class node {

    /*
     * The term or key
     */ 
    name: string;
    /*
     * The short description about this term
     */ 
    description: string;
    /*
     * A url link to the target page from this search result will build based on this resources string. 
     */
    resource: string;

    // binary tree left & right
    left: node;
    right: node;

    constructor(name: string, description: string, left: node, right: node) {
        this.name = name;
        this.description = description;
        this.left = left;
        this.right = right;
    }

    /*
     * Get page url based on the @resource string.
     */
    getURL(): string {

    }
}

class tree {

    root: node;

    constructor(tree: node) {
        this.root = tree;
    }

    // search this binary tree and then returns the node object, and finally using the returned node object build a result url and show the search result description.
    search(term: string): node {

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
    $.get("./index.json", function (index) {

        var searchEngine = new tree(index);
        var term = searchEngine.search(key);
        var url = term.getURL();
        var title = `<h2><a href='${url}'>${key}</a></h2>`;
        var description = `<p>${term.description}</p>`;

        $("#search-result").html(title + description);

    });

}