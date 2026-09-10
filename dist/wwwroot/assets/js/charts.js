/* =====================================================================
   charts.js — dark themed statistics visualisation of the nuget feed
   the page reads the precomputed statistics from the server json api and
   renders them with echarts (word cloud + bar + force graph) and
   3d-force-graph (three.js based) for the tag relation network.
   ===================================================================== */

(function () {
    'use strict';

    var TEXT = '#9a9a9a';
    var TEXT_STRONG = '#f2f2f2';
    var HAIRLINE = 'rgba(255,255,255,.16)';
    var ACCENT = '#3fae4a';
    var BG = '#030303';
    var PALETTE = ['#3fae4a', '#5cc46a', '#2e8b3a', '#6fa8dc', '#e0c24a', '#9a9a9a', '#1f6b2a', '#ff7a6e'];

    /* the cluster palette of the umap + kmeans scatter: the scibasic green and
       blue family extended with the hues needed by a custom k. */
    var CLUSTER_PALETTE = [
        '#3fae4a', '#6fa8dc', '#d9a94a', '#c07ad6', '#5cc46a', '#ff7a6e',
        '#4fb0c6', '#b8d94a', '#e08f4a', '#8f7ae0', '#4ad6a5', '#d9d24a'
    ];

    var echartsInstances = [];

    var tooltip = {
        backgroundColor: 'rgba(10,10,10,.94)',
        borderColor: HAIRLINE,
        borderWidth: 1,
        textStyle: { color: TEXT_STRONG, fontSize: 12 },
        extraCssText: 'backdrop-filter: blur(6px);'
    };

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
            .replace(/>/g, '&gt;');
    }

    function fetchJSON(url) {
        return fetch(url, { headers: { Accept: 'application/json' } }).then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.json();
        });
    }

    function showEmpty(id, message) {
        var host = $(id);
        if (host) {
            host.innerHTML = '<div class="empty">' + esc(message) + '</div>';
        }
    }

    function showLoading(id, message) {
        var host = $(id);
        if (host) {
            host.innerHTML = '<div class="loading"><span class="spinner"></span>' + esc(message) + '</div>';
        }
    }

    function setText(id, value) {
        var node = $(id);
        if (node) {
            node.textContent = value;
        }
    }

    function packageLink(id, hosted) {
        return hosted
            ? ('package.html?id=' + encodeURIComponent(id))
            : ('https://www.nuget.org/packages/' + encodeURIComponent(id));
    }

    function bindResize() {
        window.addEventListener('resize', function () {
            echartsInstances.forEach(function (chart) {
                if (chart && chart.resize) {
                    chart.resize();
                }
            });
        });
    }

    /* ------------------------------ word cloud ------------------------------ */

    function renderTagCloud(containerId, tags) {
        var host = $(containerId);
        if (!host) {
            return null;
        }
        host.innerHTML = '';

        var chart = echarts.init(host, null, { renderer: 'canvas' });
        echartsInstances.push(chart);

        chart.setOption({
            backgroundColor: 'transparent',
            tooltip: Object.assign({
                formatter: function (p) {
                    return esc(p.name) + ' · <b>' + p.value + '</b> package(s)';
                }
            }, tooltip),
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                left: 'center',
                top: 'center',
                width: '92%',
                height: '90%',
                sizeRange: [14, 62],
                rotationRange: [-45, 45],
                rotationStep: 15,
                gridSize: 10,
                drawOutOfBound: false,
                textStyle: {
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 500,
                    color: function () {
                        return PALETTE[Math.floor(Math.random() * PALETTE.length)];
                    }
                },
                emphasis: {
                    textStyle: {
                        textShadowBlur: 14,
                        textShadowColor: 'rgba(63,174,74,.65)'
                    }
                },
                data: tags.map(function (t) {
                    return { name: t.name, value: t.count };
                })
            }]
        });

        chart.on('click', function (params) {
            if (params && params.name) {
                window.location.href = 'tags.html?tag=' + encodeURIComponent(params.name);
            }
        });

        return chart;
    }

    /* ------------------------------ bar chart ------------------------------ */

    function renderTagBar(containerId, tags) {
        var host = $(containerId);
        if (!host) {
            return null;
        }
        host.innerHTML = '';

        var top = tags.slice(0, 25).slice().reverse();
        var chart = echarts.init(host, null, { renderer: 'canvas' });
        echartsInstances.push(chart);

        chart.setOption({
            backgroundColor: 'transparent',
            grid: { left: 8, right: 40, top: 12, bottom: 8, containLabel: true },
            tooltip: Object.assign({
                trigger: 'axis',
                axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,.04)' } },
                formatter: function (params) {
                    var p = params[0];
                    return esc(p.name) + ' · <b>' + p.value + '</b> package(s)';
                }
            }, tooltip),
            xAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: HAIRLINE } },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } },
                axisLabel: { color: TEXT, fontSize: 11 }
            },
            yAxis: {
                type: 'category',
                data: top.map(function (t) { return t.name; }),
                axisLine: { lineStyle: { color: HAIRLINE } },
                axisTick: { show: false },
                axisLabel: { color: TEXT, fontSize: 11 }
            },
            series: [{
                type: 'bar',
                data: top.map(function (t) { return t.count; }),
                barWidth: '62%',
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#1f6b2a' },
                        { offset: 1, color: '#3fae4a' }
                    ])
                },
                emphasis: {
                    itemStyle: { color: '#5cc46a' }
                },
                label: {
                    show: true,
                    position: 'right',
                    color: TEXT,
                    fontSize: 10.5,
                    fontFamily: 'Inter, system-ui, sans-serif'
                }
            }]
        });

        chart.on('click', function (params) {
            if (params && params.name) {
                window.location.href = 'tags.html?tag=' + encodeURIComponent(params.name);
            }
        });

        return chart;
    }

    /* --------------------- tag relation network (3d) --------------------- */

    function renderTagNetwork(containerId, graph) {
        var host = $(containerId);
        if (!host) {
            return null;
        }
        host.innerHTML = '';

        if (!graph || !graph.nodes || graph.nodes.length === 0) {
            showEmpty(containerId, 'no tag relation data yet');
            return null;
        }

        var nodes = graph.nodes.map(function (n) {
            return {
                id: n.id,
                name: n.name,
                tags: n.tags || [],
                value: n.value || (n.tags ? n.tags.length : 1)
            };
        });
        var maxValue = nodes.reduce(function (a, n) { return Math.max(a, n.value); }, 1);

        var graph3d = ForceGraph3D({
            controlType: 'orbit',
            rendererConfig: { antialias: true, alpha: false, preserveDrawingBuffer: true }
        })(host)
            .backgroundColor(BG)
            .showNavInfo(false)
            .nodeId('id')
            .nodeLabel(function (n) {
                return '<div style="color:#f2f2f2;font:12px Inter,sans-serif">'
                    + '<b>' + esc(n.name) + '</b><br/>'
                    + '<span style="color:#9a9a9a">' + esc((n.tags || []).join(', ')) + '</span></div>';
            })
            .nodeVal(function (n) { return 1 + 6 * (n.value / maxValue); })
            .nodeColor(function (n) {
                var ratio = n.value / maxValue;
                return ratio > 0.66 ? '#5cc46a' : (ratio > 0.33 ? '#3fae4a' : '#2e8b3a');
            })
            .nodeOpacity(0.92)
            .nodeResolution(12)
            .linkWidth(function (l) { return Math.min(4, 0.4 + (l.weight || 1) * 0.5); })
            .linkColor(function (l) {
                return 'rgba(63,174,74,' + Math.min(0.75, 0.15 + (l.weight || 1) * 0.12) + ')';
            })
            .linkDirectionalParticles(0)
            .warmupTicks(40)
            .cooldownTicks(120)
            .graphData({
                nodes: nodes,
                links: graph.links.map(function (l) {
                    return { source: l.source, target: l.target, weight: l.weight || 1 };
                })
            })
            .onNodeClick(function (node) {
                // every node of the tag relation network is a package hosted in
                // this feed, so it always links to the local detail page.
                window.location.href = packageLink(node.id, true);
            });

        // gently auto rotate for a lively 3d feel
        var angle = 0;
        var controls = graph3d.controls();
        if (controls && controls.autoRotate !== undefined) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.6;
        }

        return graph3d;
    }

    /* --------------------- package clusters (umap + kmeans) --------------------- */

    function clusterColor(label) {
        var index = (Number(label) - 1) % CLUSTER_PALETTE.length;
        if (index < 0) {
            index += CLUSTER_PALETTE.length;
        }
        return CLUSTER_PALETTE[index];
    }

    function renderClusterLegend(clusters) {
        var host = $('cluster-legend');
        if (!host) {
            return;
        }

        var list = clusters || [];
        if (!list.length) {
            host.innerHTML = '';
            return;
        }

        host.innerHTML = list.map(function (c) {
            return '<span class="legend-item"><span class="dot" style="background:' +
                clusterColor(c.label) + '"></span>cluster ' + esc(c.label) +
                ' · ' + esc(c.size) + '</span>';
        }).join('');
    }

    function renderPackageClusters(containerId, doc) {
        var host = $(containerId);
        if (!host) {
            return null;
        }
        host.innerHTML = '';
        renderClusterLegend(doc && doc.clusters);

        var points = (doc && doc.points) || [];
        if (!points.length) {
            showEmpty(containerId, (doc && doc.message) || 'the cluster analysis has not been built yet');
            return null;
        }

        var sizes = {};
        (doc.clusters || []).forEach(function (c) { sizes[c.label] = c.size; });

        var maxSize = 1;
        Object.keys(sizes).forEach(function (label) {
            maxSize = Math.max(maxSize, Number(sizes[label]) || 1);
        });

        var nodes = points.map(function (p) {
            /* the vendored 3d-force-graph build has no nodeX/nodeY/nodeZ
               accessors, so the umap coordinates are provided as the node
               positions themselves. fx/fy/fz pin them in the d3 force
               simulation, which turns the force layout into a static scatter
               and keeps the distance semantics of the embedding. */
            var x = Number(p.x) || 0;
            var y = Number(p.y) || 0;
            var z = Number(p.z) || 0;

            return {
                id: p.id,
                name: p.name || p.id,
                x: x,
                y: y,
                z: z,
                fx: x,
                fy: y,
                fz: z,
                cluster: Number(p.cluster) || 0,
                tags: p.tags || [],
                value: Number(sizes[p.cluster]) || 1
            };
        });

        /* the umap embedding may sit far away from the origin and span only a
           few units, while the default camera distance of 3d-force-graph is
           1000, so both the camera and the point size are derived from the
           (robust) extent of the embedding. */
        var centroid = { x: 0, y: 0, z: 0 };

        nodes.forEach(function (n) {
            centroid.x += n.x;
            centroid.y += n.y;
            centroid.z += n.z;
        });

        centroid.x /= nodes.length;
        centroid.y /= nodes.length;
        centroid.z /= nodes.length;

        var radii = nodes.map(function (n) {
            var dx = n.x - centroid.x;
            var dy = n.y - centroid.y;
            var dz = n.z - centroid.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }).sort(function (a, b) { return a - b; });

        /* the 90th percentile keeps a few outliers from squashing the view */
        var spread = radii.length ? radii[Math.floor(radii.length * 0.9)] : 1;
        var distance = Math.max(2, spread * 2.8);
        var nodeSize = Math.max(0.06, spread * 0.05);

        var graph3d = ForceGraph3D({
            controlType: 'orbit',
            rendererConfig: { antialias: true, alpha: false, preserveDrawingBuffer: true }
        })(host)
            .backgroundColor(BG)
            .showNavInfo(false)
            .nodeId('id')
            .nodeLabel(function (n) {
                return '<div style="color:#f2f2f2;font:12px Inter,sans-serif">'
                    + '<b>' + esc(n.name) + '</b><br/>'
                    + '<span style="color:#9a9a9a">cluster ' + esc(n.cluster)
                    + ' · ' + esc((n.tags || []).join(', ')) + '</span></div>';
            })
            .nodeVal(function (n) { return 0.8 + 0.5 * (n.value / maxSize); })
            .nodeRelSize(nodeSize)
            .nodeColor(function (n) { return clusterColor(n.cluster); })
            .nodeOpacity(0.9)
            .nodeResolution(16)
            .enableNodeDrag(false)
            .warmupTicks(0)
            .cooldownTicks(0)
            .graphData({ nodes: nodes, links: [] })
            .onNodeClick(function (node) {
                window.location.href = packageLink(node.id, true);
            });

        var controls = graph3d.controls();
        if (controls && controls.target) {
            controls.target.set(centroid.x, centroid.y, centroid.z);
        }

        graph3d.cameraPosition({ x: centroid.x, y: centroid.y, z: centroid.z + distance });

        // gently auto rotate for a lively 3d feel
        if (controls && controls.autoRotate !== undefined) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
        }

        /* the instance is published for debugging and for external tooling
           (for example resolving a node coordinate to a screen position). */
        window.__packageClusterGraph = graph3d;

        return graph3d;
    }

    /* ----------------------- dependency network ----------------------- */

    function renderDependencyNetwork(containerId, graph) {
        var host = $(containerId);
        if (!host) {
            return null;
        }
        host.innerHTML = '';

        if (!graph || !graph.nodes || graph.nodes.length === 0) {
            showEmpty(containerId, 'no dependency data yet');
            return null;
        }

        var degree = {};
        (graph.links || []).forEach(function (l) {
            degree[l.source] = (degree[l.source] || 0) + 1;
            degree[l.target] = (degree[l.target] || 0) + 1;
        });

        var nodes = graph.nodes.map(function (n) {
            var external = n.external === true;
            var d = degree[n.id] || 1;
            return {
                id: n.id,
                name: n.name,
                external: external,
                category: external ? 1 : 0,
                value: d,
                symbolSize: Math.min(34, 7 + Math.sqrt(d) * 5),
                itemStyle: {
                    color: external ? '#6fa8dc' : ACCENT,
                    borderColor: 'rgba(3,3,3,.8)',
                    borderWidth: 1
                }
            };
        });

        var links = (graph.links || []).map(function (l) {
            return { source: l.source, target: l.target };
        });

        var chart = echarts.init(host, null, { renderer: 'canvas' });
        echartsInstances.push(chart);

        chart.setOption({
            backgroundColor: 'transparent',
            tooltip: Object.assign({
                formatter: function (p) {
                    if (p.dataType === 'edge') {
                        return esc(p.data.source) + ' → ' + esc(p.data.target);
                    }
                    return '<b>' + esc(p.data.name) + '</b><br/>'
                        + (p.data.external ? 'external dependency' : 'hosted package')
                        + '<br/>dependencies: ' + p.data.value;
                }
            }, tooltip),
            legend: [{
                data: ['hosted', 'external'],
                textStyle: { color: TEXT, fontSize: 11 },
                top: 4,
                right: 8,
                itemWidth: 10,
                itemHeight: 10,
                inactiveColor: '#4a4a4a'
            }],
            series: [{
                type: 'graph',
                layout: 'force',
                roam: true,
                draggable: true,
                focusNodeAdjacency: true,
                categories: [
                    { name: 'hosted', itemStyle: { color: ACCENT } },
                    { name: 'external', itemStyle: { color: '#6fa8dc' } }
                ],
                label: {
                    show: true,
                    position: 'right',
                    color: TEXT,
                    fontSize: 10,
                    formatter: function (p) {
                        return p.data.value >= 3 ? p.data.name : '';
                    }
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [0, 5],
                lineStyle: {
                    color: 'rgba(255,255,255,.16)',
                    width: 1,
                    curveness: 0.08
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: { color: ACCENT, opacity: 1 }
                },
                force: {
                    repulsion: 160,
                    gravity: 0.06,
                    edgeLength: [50, 140],
                    friction: 0.2
                },
                data: nodes,
                links: links
            }]
        });

        chart.on('click', function (params) {
            if (params && params.dataType === 'node' && params.data) {
                window.location.href = packageLink(params.data.id, params.data.external !== true);
            }
        });

        return chart;
    }

    /* ------------------------------ bootstrap ------------------------------ */

    function initGraph() {
        fetchJSON('/api/stats/tags').then(function (tags) {
            var list = (tags && tags.tags) || [];
            setText('stat-graph-packages', tags && tags.totalPackages ? tags.totalPackages : 0);
            setText('stat-graph-tags', (tags && tags.totalTags) || list.length);

            if (!list.length) {
                showEmpty('chart-tag-cloud', 'no tags found');
                showEmpty('chart-tag-bar', 'no tags found');
            } else {
                renderTagCloud('chart-tag-cloud', list);
                renderTagBar('chart-tag-bar', list);
            }
        }).catch(function (error) {
            showEmpty('chart-tag-cloud', 'failed to load tags: ' + error.message);
            showEmpty('chart-tag-bar', 'failed to load tags: ' + error.message);
        });

        showLoading('chart-package-clusters', 'loading cluster scatter…');
        fetchJSON('/api/stats/clusters').then(function (doc) {
            setText('stat-graph-clusters', (doc && doc.k) || 0);
            renderPackageClusters('chart-package-clusters', doc);
        }).catch(function (error) {
            showEmpty('chart-package-clusters', 'failed to load the clusters: ' + error.message);
        });

        showLoading('chart-dependency-graph', 'loading dependency network…');
        fetchJSON('/api/stats/dependency-network').then(function (graph) {
            setText('stat-graph-dep-edges', (graph && graph.links ? graph.links.length : 0));
            renderDependencyNetwork('chart-dependency-graph', graph);
        }).catch(function (error) {
            showEmpty('chart-dependency-graph', 'failed to load dependency network: ' + error.message);
        });

        bindResize();
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (document.body.getAttribute('data-page') === 'graph') {
            initGraph();
        }
    });
})();
