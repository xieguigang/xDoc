/* =====================================================================
   app.js — nuget server web front end
   a small dependency free client that renders the package list, the
   database statistics and a single package detail page from the
   experimental nuget server json api.
   ===================================================================== */

(function () {
    'use strict';

    var state = {
        q: '',
        skip: 0,
        take: 15,
        total: 0
    };

    /* ----------------------------- helpers ----------------------------- */

    function $(id) {
        return document.getElementById(id);
    }

    function esc(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatNumber(value) {
        var n = Number(value || 0);
        return n.toLocaleString('en-US');
    }

    function formatDate(value) {
        if (!value) {
            return '—';
        }
        var d = new Date(value);
        if (isNaN(d.getTime())) {
            return esc(value);
        }
        var pad = function (x) { return (x < 10 ? '0' : '') + x; };
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    function formatSize(bytes) {
        var n = Number(bytes || 0);
        if (n <= 0) {
            return '—';
        }
        if (n < 1024) {
            return n + ' B';
        }
        if (n < 1024 * 1024) {
            return (n / 1024).toFixed(1) + ' KB';
        }
        return (n / 1024 / 1024).toFixed(2) + ' MB';
    }

    function fetchJSON(url) {
        return fetch(url, { headers: { Accept: 'application/json' } }).then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.json();
        });
    }

    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(null, args); }, delay);
        };
    }

    function queryParam(name) {
        var params = new URLSearchParams(window.location.search);
        return params.get(name) || '';
    }

    /* ----------------------------- statistics ----------------------------- */

    function applyStats(stats) {
        if (!stats) {
            return;
        }
        setText('stat-packages', formatNumber(stats.packages));
        setText('stat-versions', formatNumber(stats.versions));
        setText('stat-downloads', formatNumber(stats.downloads));
        setText('stat-users', formatNumber(stats.users));
    }

    function setText(id, value) {
        var node = $(id);
        if (node) {
            node.textContent = value;
        }
    }

    function setLink(id, url, external) {
        var node = $(id);
        if (!node) {
            return;
        }
        if (!url) {
            node.textContent = '—';
            return;
        }
        node.innerHTML = '<a class="dl" href="' + esc(url) + '"' +
            (external ? ' target="_blank" rel="noopener"' : '') + '>' + esc(url) + '</a>';
    }

    function tagUrl(tag) {
        return 'tags.html?tag=' + encodeURIComponent(tag);
    }

    function renderTags(host, tags) {
        if (!host) {
            return;
        }
        var list = (tags || []);
        if (typeof list === 'string') {
            list = list.split(/[\s,;]+/);
        }
        list = list.filter(Boolean);

        if (!list.length) {
            host.innerHTML = '<span class="mono">—</span>';
            return;
        }
        host.innerHTML = list.map(function (t) {
            return '<a class="chip" href="' + tagUrl(t) + '">' + esc(t) + '</a>';
        }).join('');
    }

    function renderDependencies(host, dependencies) {
        if (!host) {
            return;
        }
        var list = dependencies || [];
        if (!list.length) {
            host.innerHTML = '<div class="empty">this package has no dependencies</div>';
            return;
        }

        var groups = {};
        list.forEach(function (d) {
            var key = d.targetFramework || '';
            (groups[key] = groups[key] || []).push(d);
        });

        var html = '';
        Object.keys(groups).forEach(function (framework) {
            html += '<div class="dep-group">';
            html += '<div class="dep-framework mono">' + esc(framework || 'any framework') + '</div>';
            html += '<ul class="dep-list">';
            groups[framework].forEach(function (d) {
                var href = d.hosted ? ('package.html?id=' + encodeURIComponent(d.id)) : d.url;
                var target = d.hosted ? '' : ' target="_blank" rel="noopener"';
                var badge = d.hosted
                    ? '<span class="dep-badge">local</span>'
                    : '<span class="dep-badge ext">nuget.org</span>';
                html += '<li><a class="dl" href="' + esc(href) + '"' + target + '>' + esc(d.id) + '</a>' +
                    (d.range ? ' <span class="mono">' + esc(d.range) + '</span>' : '') + ' ' + badge + '</li>';
            });
            html += '</ul></div>';
        });
        host.innerHTML = html;
    }

    /* ----------------------------- package list ----------------------------- */

    function loadPackages() {
        var host = $('package-list');
        if (!host) {
            return;
        }

        host.innerHTML = '<div class="loading"><span class="spinner"></span>loading packages…</div>';

        var url = '/api/packages?skip=' + state.skip + '&take=' + state.take +
            '&q=' + encodeURIComponent(state.q);

        fetchJSON(url).then(function (result) {
            state.total = result.total || 0;
            renderPackages(result.packages || []);
            renderPager();
        }).catch(function (error) {
            host.innerHTML = '<div class="empty">failed to load packages: ' + esc(error.message) + '</div>';
        });
    }

    function renderPackages(packages) {
        var host = $('package-list');
        if (!host) {
            return;
        }

        if (!packages.length) {
            host.innerHTML = '<div class="empty">no packages found</div>';
            return;
        }

        var rows = packages.map(function (pkg) {
            var id = pkg.id || '';
            var tags = (pkg.tags || '').split(/[\s,;]+/).filter(Boolean).slice(0, 4);
            var tagHtml = tags.map(function (t) {
                return '<span class="ver">' + esc(t) + '</span>';
            }).join(' ');

            return '<tr class="row-link" data-id="' + esc(encodeURIComponent(id)) + '">' +
                '<td><span class="pkg-name">' + esc(id) + '</span>' +
                '<span class="pkg-desc">' + esc(pkg.description || '—') + '</span></td>' +
                '<td><span class="ver">' + esc(pkg.latestVersion || '') + '</span></td>' +
                '<td class="num">' + formatNumber(pkg.totalDownloads) + '</td>' +
                '<td class="num">' + formatNumber(pkg.versions) + '</td>' +
                '<td class="mono">' + formatDate(pkg.published) + '</td>' +
                '<td>' + (tagHtml || '<span class="mono">—</span>') + '</td>' +
                '</tr>';
        }).join('');

        host.innerHTML = '<div class="tablewrap fade-in"><table>' +
            '<thead><tr>' +
            '<th>Package</th><th>Latest</th><th class="num">Downloads</th>' +
            '<th class="num">Versions</th><th>Published</th><th>Tags</th>' +
            '</tr></thead><tbody>' + rows + '</tbody></table></div>';

        Array.prototype.forEach.call(host.querySelectorAll('tr.row-link'), function (row) {
            row.addEventListener('click', function () {
                window.location.href = 'package.html?id=' + row.getAttribute('data-id');
            });
        });
    }

    function renderPager() {
        var info = $('page-info');
        var prev = $('page-prev');
        var next = $('page-next');
        if (!info) {
            return;
        }

        var from = state.total === 0 ? 0 : state.skip + 1;
        var to = Math.min(state.skip + state.take, state.total);
        info.textContent = from + '–' + to + ' of ' + state.total;

        if (prev) {
            prev.disabled = state.skip <= 0;
        }
        if (next) {
            next.disabled = state.skip + state.take >= state.total;
        }
    }

    /* ----------------------------- package detail ----------------------------- */

    function loadPackageDetail() {
        var host = $('package-detail');
        if (!host) {
            return;
        }

        var id = queryParam('id');
        if (!id) {
            host.innerHTML = '<div class="empty">missing package id in the url query string</div>';
            return;
        }

        host.innerHTML = '<div class="loading"><span class="spinner"></span>loading package…</div>';

        fetchJSON('/api/package/' + encodeURIComponent(id)).then(function (pkg) {
            renderPackageDetail(pkg);
        }).catch(function (error) {
            host.innerHTML = '<div class="empty">failed to load package "' + esc(id) + '": ' + esc(error.message) + '</div>';
        });
    }

    function renderPackageDetail(pkg) {
        document.title = (pkg.id || 'package') + ' · nuget';

        var placeholder = $('package-detail');
        if (placeholder) {
            placeholder.innerHTML = '';
            placeholder.style.display = 'none';
        }

        var headline = $('pkg-headline');
        if (headline) {
            headline.innerHTML = '<span class="u">' + esc(pkg.id) + '</span>';
        }

        var crumb = $('pkg-crumb');
        if (crumb) {
            crumb.textContent = pkg.id || '';
        }

        setText('pkg-latest', pkg.latestVersion || '');
        setText('pkg-downloads', formatNumber(pkg.totalDownloads));
        setText('pkg-versions', formatNumber((pkg.versions || []).length));
        setText('pkg-published', formatDate(pkg.published));

        var titleNode = $('pkg-headline');
        if (titleNode) {
            titleNode.innerHTML = '<span class="u">' + esc(pkg.title || pkg.id) + '</span>';
        }

        var iconNode = $('pkg-icon');
        if (iconNode) {
            if (pkg.iconUrl) {
                iconNode.src = pkg.iconUrl;
                iconNode.alt = (pkg.id || '') + ' icon';
                iconNode.style.display = '';
            } else {
                iconNode.style.display = 'none';
            }
        }

        var summaryNode = $('pkg-summary');
        if (summaryNode) {
            summaryNode.textContent = pkg.summary || '';
        }

        setLink('pkg-project', pkg.projectUrl, true);
        setLink('pkg-repository', pkg.repository, true);
        setLink('pkg-license-url', pkg.licenseUrl, true);

        setText('pkg-authors', pkg.authors || '—');
        setText('pkg-owners', pkg.owners || '—');
        setText('pkg-license', pkg.license || '—');
        setText('pkg-language', pkg.language || '—');
        setText('pkg-copyright', pkg.copyright || '—');
        setText('pkg-require-license', String(pkg.requireLicenseAcceptance || 'false'));

        renderTags($('pkg-tags'), pkg.tags);
        renderDependencies($('pkg-dependencies'), pkg.dependencies);

        var desc = $('pkg-description');
        if (desc) {
            desc.textContent = pkg.description || 'no description provided.';
        }

        var notes = $('pkg-release-notes');
        if (notes) {
            notes.textContent = pkg.releaseNotes || '—';
        }

        var nuspec = $('pkg-nuspec');
        if (nuspec) {
            nuspec.textContent = (pkg.metadata && pkg.metadata.nuspec) || 'not available';
        }

        var versionHost = $('version-list');
        if (versionHost) {
            var versions = pkg.versions || [];
            if (!versions.length) {
                versionHost.innerHTML = '<div class="empty">no published versions</div>';
            } else {
                var rows = versions.slice().reverse().map(function (v) {
                    return '<tr>' +
                        '<td><span class="ver">' + esc(v.version) + '</span></td>' +
                        '<td class="num">' + formatNumber(v.downloads) + '</td>' +
                        '<td class="num">' + formatSize(v.size) + '</td>' +
                        '<td class="mono">' + formatDate(v.published) + '</td>' +
                        '<td><a class="dl" href="' + esc(v.downloadUrl) + '">download</a></td>' +
                        '</tr>';
                }).join('');

                versionHost.innerHTML = '<div class="tablewrap fade-in"><table>' +
                    '<thead><tr><th>Version</th><th class="num">Downloads</th>' +
                    '<th class="num">Size</th><th>Published</th><th>Package</th></tr></thead>' +
                    '<tbody>' + rows + '</tbody></table></div>';
            }
        }
    }

    /* ----------------------------- about page ----------------------------- */

    function loadAbout() {
        var host = $('about-stats');
        if (!host) {
            return;
        }

        fetchJSON('/api/stats').then(function (result) {
            applyStats(result.stats);
            renderTop(result.topDownloads || []);
            renderRecent(result.recent || []);
            setText('about-generated', formatDate(result.generated));
        }).catch(function (error) {
            host.innerHTML = '<div class="empty">failed to load statistics: ' + esc(error.message) + '</div>';
        });
    }

    function renderTop(items) {
        var host = $('top-downloads');
        if (!host) {
            return;
        }
        if (!items.length) {
            host.innerHTML = '<div class="empty">no data yet</div>';
            return;
        }

        var rows = items.map(function (item) {
            return '<tr class="row-link" data-id="' + esc(encodeURIComponent(item.id)) + '">' +
                '<td><span class="pkg-name">' + esc(item.id) + '</span></td>' +
                '<td><span class="ver">' + esc(item.latestVersion) + '</span></td>' +
                '<td class="num">' + formatNumber(item.versions) + '</td>' +
                '<td class="num">' + formatNumber(item.downloads) + '</td>' +
                '</tr>';
        }).join('');

        host.innerHTML = '<div class="tablewrap"><table>' +
            '<thead><tr><th>Package</th><th>Latest</th><th class="num">Versions</th>' +
            '<th class="num">Downloads</th></tr></thead><tbody>' + rows + '</tbody></table></div>';

        Array.prototype.forEach.call(host.querySelectorAll('tr.row-link'), function (row) {
            row.addEventListener('click', function () {
                window.location.href = 'package.html?id=' + row.getAttribute('data-id');
            });
        });
    }

    function renderRecent(items) {
        var host = $('recent-packages');
        if (!host) {
            return;
        }
        if (!items.length) {
            host.innerHTML = '<div class="empty">no data yet</div>';
            return;
        }

        var rows = items.map(function (item) {
            return '<tr class="row-link" data-id="' + esc(encodeURIComponent(item.id)) + '">' +
                '<td><span class="pkg-name">' + esc(item.id) + '</span></td>' +
                '<td><span class="ver">' + esc(item.version) + '</span></td>' +
                '<td class="num">' + formatNumber(item.downloads) + '</td>' +
                '<td class="mono">' + formatDate(item.published) + '</td>' +
                '</tr>';
        }).join('');

        host.innerHTML = '<div class="tablewrap"><table>' +
            '<thead><tr><th>Package</th><th>Version</th><th class="num">Downloads</th>' +
            '<th>Published</th></tr></thead><tbody>' + rows + '</tbody></table></div>';

        Array.prototype.forEach.call(host.querySelectorAll('tr.row-link'), function (row) {
            row.addEventListener('click', function () {
                window.location.href = 'package.html?id=' + row.getAttribute('data-id');
            });
        });
    }

    /* ----------------------------- bootstrap ----------------------------- */

    function initIndex() {
        applyStats(null);

        fetchJSON('/api/stats').then(function (result) {
            applyStats(result.stats);
        }).catch(function () { });

        loadPackages();

        var search = $('search-input');
        if (search) {
            search.addEventListener('input', debounce(function () {
                state.q = search.value.trim();
                state.skip = 0;
                loadPackages();
            }, 260));
        }

        var prev = $('page-prev');
        if (prev) {
            prev.addEventListener('click', function () {
                state.skip = Math.max(0, state.skip - state.take);
                loadPackages();
            });
        }

        var next = $('page-next');
        if (next) {
            next.addEventListener('click', function () {
                if (state.skip + state.take < state.total) {
                    state.skip += state.take;
                    loadPackages();
                }
            });
        }
    }

    /* ----------------------------- tag query page ----------------------------- */

    var tagState = { tag: '', skip: 0, take: 20, total: 0 };

    function initTags() {
        tagState.tag = queryParam('tag');

        var label = $('tag-name');
        if (label) {
            label.textContent = tagState.tag || '(none)';
        }
        document.title = (tagState.tag || 'tag') + ' · nuget';

        loadTagPackages();

        var prev = $('page-prev');
        if (prev) {
            prev.addEventListener('click', function () {
                tagState.skip = Math.max(0, tagState.skip - tagState.take);
                loadTagPackages();
            });
        }

        var next = $('page-next');
        if (next) {
            next.addEventListener('click', function () {
                if (tagState.skip + tagState.take < tagState.total) {
                    tagState.skip += tagState.take;
                    loadTagPackages();
                }
            });
        }
    }

    function loadTagPackages() {
        var host = $('package-list');
        if (!host) {
            return;
        }
        if (!tagState.tag) {
            host.innerHTML = '<div class="empty">no tag was specified in the url query string</div>';
            return;
        }

        host.innerHTML = '<div class="loading"><span class="spinner"></span>loading packages…</div>';

        fetchJSON('/api/tag/' + encodeURIComponent(tagState.tag) + '?skip=' + tagState.skip + '&take=' + tagState.take)
            .then(function (result) {
                tagState.total = result.total || 0;
                renderPackages(result.packages || []);
                renderTagPager();
            })
            .catch(function (error) {
                host.innerHTML = '<div class="empty">failed to load the tag: ' + esc(error.message) + '</div>';
            });
    }

    function renderTagPager() {
        var info = $('page-info');
        var prev = $('page-prev');
        var next = $('page-next');
        if (!info) {
            return;
        }

        var from = tagState.total === 0 ? 0 : tagState.skip + 1;
        var to = Math.min(tagState.skip + tagState.take, tagState.total);
        info.textContent = from + '–' + to + ' of ' + tagState.total;

        if (prev) {
            prev.disabled = tagState.skip <= 0;
        }
        if (next) {
            next.disabled = tagState.skip + tagState.take >= tagState.total;
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var page = document.body.getAttribute('data-page');

        if (page === 'index') {
            initIndex();
        } else if (page === 'package') {
            loadPackageDetail();
        } else if (page === 'about') {
            loadAbout();
        } else if (page === 'tags') {
            initTags();
        }
    });
})();
