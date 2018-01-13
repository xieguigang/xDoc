// module parsing the GET query parameters and then search the index.json by using binary tree method.

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
    getURL() {

    }
}

class tree {

    root: node;

    // search this binary tree and then returns the node object, and finally using the returned node object build a result url and show the search result description.
    search(term: string) {

    }
}

