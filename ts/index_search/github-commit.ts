// https://stackoverflow.com/questions/17604071/parse-xml-using-javascript

class author {

    avatar: string;
    name: string;
    url: string;

    constructor(name: string, url: string, avatar: string) {
        this.avatar = avatar;
        this.name = name;
        this.url = url;
    }
}

class commit {

    id: string;
    link: string;
    title: string;
    updated: Date;
    author: author;

    constructor(id: string, link: string, title: string, updated: Date, author: author) {
        this.id = id;
        this.link = link;
        this.title = title;
        this.updated = updated;
        this.author = author;
    }
}

/* By default is the github master branch
 *
 * @param git: username/repo
 */
function getCommits(git: string, branch: string = "master") {

    var url = `https://github.com/${git}/commits/${branch}.atom`;
    var xhr = createCORSRequest(url);

    if (!xhr) {
        throw new Error('CORS not supported');
    } else {
        // Response handlers.
        xhr.onload = function () {
            var xml = xhr.responseText;
            console.log(xml);
        };

        xhr.onreadystatechange = function () {            
                var xml = xhr.responseText;
                console.log(xml);            
        };

        xhr.onerror = function () {
            var xml = xhr.responseText;
            console.log(xml);
        };

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(null);
    }
}

function createCORSRequest(url: string, method: string = "GET") {
    var xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

        console.log("withCredentials");

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

        console.log("XDomainRequest");

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }

    return xhr;
}

// test
getCommits("xieguigang/sciBASIC");