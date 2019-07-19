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

$(function() {
	var lines = document.getElementsByClassName("js-line-number");
	
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		var a = document.createElement("a");
		var num = line.getAttribute("data-line-number");
		var id = line.id;
		
		a.setAttribute("href", url_path + "#" + id);
		a.setAttribute("target", "_self");
		line.innerHTML = "";
		line.appendChild(a);
	}
});