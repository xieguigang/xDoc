<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
<meta name="author" content="xie.guigang@gcmodeller.org">
<meta name="copyright" content="http://gcmodeller.org Copyright (c) 2018">
<meta name="keywords" content="GCModeller; Xanthomonas" />

<title>$title</title>

<script type="text/javascript">
    var DOCUMENTATION_OPTIONS = {
        URL_ROOT: './',
        VERSION: '1.6.6+',
        COLLAPSE_INDEX: false,
        FILE_SUFFIX: '.html',
        HAS_SOURCE: true,
        SOURCELINK_SUFFIX: '.txt'
    };
</script>
<script type="text/javascript" src="lib/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="lib/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="lib/underscore.js"></script>
<script type="text/javascript" src="lib/doctools.js"></script>

<script type="text/javascript">

    // intelligent scrolling of the sidebar content
    $(window).scroll(function () {
        var sb = $('.sphinxsidebarwrapper');
        var win = $(window);
        var sbh = sb.height();
        var offset = $('.sphinxsidebar').position()['top'];
        var wintop = win.scrollTop();
        var winbot = wintop + win.innerHeight();
        var curtop = sb.position()['top'];
        var curbot = curtop + sbh;
        // does sidebar fit in window?
        if (sbh < win.innerHeight()) {
            // yes: easy case -- always keep at the top
            sb.css('top', $u.min([$u.max([0, wintop - offset - 10]),
            $(document).height() - sbh - 200]));
        } else {
            // no: only scroll if top/bottom edge of sidebar is at
            // top/bottom edge of window
            if (curtop > wintop && curbot > winbot) {
                sb.css('top', $u.max([wintop - offset - 10, 0]));
            } else if (curtop < wintop && curbot < winbot) {
                sb.css('top', $u.min([winbot - sbh - offset - 20,
                $(document).height() - sbh - 200]));
            }
        }
    });
</script>

<link rel="search" type="application/opensearchdescription+xml" title="Search within Sphinx 1.6.6+ documentation" href="http://www.sphinx-doc.org/en/stable/_static/opensearch.xml">
<link rel="index" title="Index" href="http://www.sphinx-doc.org/en/stable/genindex.html">
<link rel="search" title="Search" href="http://www.sphinx-doc.org/en/stable/search.html">
<link rel="canonical" href="http://www.sphinx-doc.org/en/stable/">
<link rel="stylesheet" href="styles/sphinx13.css" type="text/css">
<link rel="stylesheet" href="styles/pygments.css" type="text/css">
<link rel="stylesheet" href="styles/badge_only.css" type="text/css">

<style type="text/css">

    table.right {
        float: right;
        margin-left: 20px;
    }

        table.right td {
            border: 1px solid #ccc;
        }

    .related {
        display: none;
    }
</style>