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
    var url = "https://github.com/" + git + "/commits/" + branch;
    $.get(url, {}, function (html) {
        console.log(html);
    }, "html");
}
// test
getCommits("xieguigang/sciBASIC");
//# sourceMappingURL=github-commit.js.map