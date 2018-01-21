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

    var url = `https://github.com/${git}/commits/${branch}`;

    $.get(url, {}, function (html) {
        console.log(html);
    }, "html");

}

// test
getCommits("xieguigang/sciBASIC");