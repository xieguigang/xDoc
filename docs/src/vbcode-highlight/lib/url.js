function getUrl(id) {
    var path = nodePath[id];

    if (!path || !(path.endsWith('.vb'))) {
        return null;
    }

    path = path.replace(/\.vb/, ".html");

    return path;
}

function openinnewTab(url) {
    if (url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
}