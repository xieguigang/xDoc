// https://stackoverflow.com/questions/17604071/parse-xml-using-javascript
var author = /** @class */ (function () {
    function author(name, url, avatar) {
        this.avatar = avatar;
        this.name = name;
        this.url = url;
    }
    return author;
}());
var commit = /** @class */ (function () {
    function commit(id, link, title, updated, author) {
        this.id = id;
        this.link = link;
        this.title = title;
        this.updated = updated;
        this.author = author;
    }
    return commit;
}());
/* By default is the github master branch
 *
 * @param git: username/repo
 */
function getCommits(git, branch) {
    if (branch === void 0) { branch = "master"; }
    var url = "https://github.com/" + git + "/commits/" + branch + ".atom";
    var xhr = createCORSRequest(url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }
    else {
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
        xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
        xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
        xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,pl;q=0.6");
        xhr.setRequestHeader("If-None-Match", "0a6b53add4a756cb982898c7c6b58632");
        xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");
        xhr.send(null);
    }
}
function createCORSRequest(url, method) {
    if (method === void 0) { method = "GET"; }
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);
        console.log("withCredentials");
    }
    else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);
        console.log("XDomainRequest");
    }
    else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;
    }
    return xhr;
}
// test
getCommits("xieguigang/sciBASIC");
//# sourceMappingURL=github-commit.js.map