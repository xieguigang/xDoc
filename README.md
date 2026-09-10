# xDoc · 实验性 NuGet 程序包服务器（VB.NET）

一个用 VisualBasic.NET（`net10.0`）编写的实验性 NuGet v3 程序包服务器：匿名下载、TOTP 认证上传、JSql 作为元数据引擎，
并内置包浏览站点、标签/依赖可视化与「tag 矩阵 → UMAP 三维嵌入 → KMeans 聚类」的周期性数据分析管线。

- 服务端：`src/Nuget/Nuget.vbproj`（类库，由 Fluteway 反射加载运行）
- 客户端：`src/xGet/xGet.vbproj`（控制台，仅注册/上传）
- 站点：`dist/wwwroot`（静态页面 + ECharts / ECharts GL / marked）
- 存储：`JSql`（类 MySQL 语法的 JSON 表引擎），包文件落在数据目录的 flat container 布局中

---

## 1. 目录结构

```
g:/xDoc/
├── src/
│   ├── Nuget/                      # 服务端控制器类库
│   │   ├── Service.vb              # HTTP 控制器：NuGet v3 协议 + Web REST + 管理端点 + 周期任务
│   │   ├── NugetConfiguration.vb   # 运行配置解析（数据目录、聚类参数等）
│   │   ├── NugetStore.vb           # JSql 数据访问层（8 张表，Monitor 串行化）
│   │   ├── NugetStatistics.vb      # 标签分布 / 标签关系网络 / 依赖网络统计文档
│   │   ├── PackageClusterAnalysis.vb # tag 0/1 矩阵 → UMAP 3D → KMeans 聚类
│   │   ├── NupkgReader.vb          # nupkg 解析（nuspec 元数据、icon、readme 提取）
│   │   ├── TotpAuth.vb             # TOTP 注册与校验（每用户 128 字符盐）
│   │   └── TotpModule.vb           # RFC 6238 实现（生成/校验/otpauth URI/自检）
│   └── xGet/                       # 客户端控制台程序
│       ├── Program.vb              # register / upload / batch 子命令
│       ├── NugetApiClient.vb       # HTTP 客户端（注册、multipart 上传）
│       └── AccountStore.vb         # 本地 TOTP 密钥存储
├── test/                           # TOTP 算法自检（RFC 6238 附录 B 测试向量）
├── dist/
│   ├── bin/                        # 编译输出（Nuget.dll、Fluteway、xGet 等）
│   ├── wwwroot/                    # 前端站点（页面 + assets）
│   ├── run.cmd / run.sh            # 启动脚本
│   └── data/                       # 运行时数据（JSql 库 + 包文件），首次启动按 --data 自动创建
├── docs/build.txt                  # 原始需求与命令行示例
└── xGet.slnx                       # 解决方案（含引用的外部工程）
```

---

## 2. 构建

```bash
# 服务端类库（输出 dist/bin/Nuget.dll，并生成 Nuget.<version>.nupkg）
dotnet build src/Nuget/Nuget.vbproj

# 客户端
dotnet build src/xGet/xGet.vbproj

# TOTP 自检
dotnet run --project test/test.vbproj
```

外部依赖（通过 `ProjectReference` 引用，需存在对应代码库）：

| 依赖 | 用途 |
| --- | --- |
| `GCModeller/src/runtime/httpd/src/HTTP_SERVER/Fluteway.vbproj` | HTTP 服务器宿主（`/run` 反射加载控制器） |
| `GCModeller/src/runtime/httpd/src/Flute/Flute.NET5.vbproj` | HTTP 内核（`HttpRouter`、`HttpPOSTRequest` 等） |
| `JSql/src/JSql/JSql.vbproj` | 数据库引擎 |
| `.../DataMining/UMAP/UMAP.NET5.vbproj` | UMAP 降维（级联带入 DataMining = KMeans、Math、Graph、Randomizer） |
| `.../Microsoft.VisualBasic.Core/src/Core.vbproj` | 基础运行时 |

---

## 3. 运行

在 `dist/` 目录下执行（`--data` 必须指向可写目录，Linux/Docker 场景下不要放在程序目录内）：

```bash
# Windows
bin\Fluteway.exe /run --app ./bin/Nuget.dll --listen 80 --wwwroot ./wwwroot --data ./data/ --max-post-size 1073741824 --base-url http://nuget.scibasic.net/

# Linux
dotnet ./bin/Fluteway.dll /run --app ./bin/Nuget.dll --listen 80 --wwwroot ./wwwroot --data ./data/ --max-post-size 1073741824 --base-url http://nuget.scibasic.net/
```

最小形式：

```bash
Fluteway /run --app ./Nuget.dll --listen=80 --wwwroot="../wwwroot"
```

`/run` 参数：

| 参数 | 说明 |
| --- | --- |
| `--app <dll>` | 必填，待加载的控制器类库；反射扫描其中的 HTTP 控制器并注册路由 |
| `--listen <port>` | 监听端口，默认 80 |
| `--wwwroot <dir>` | 静态站点根目录 |
| `--data <dir>` | 数据目录（JSql 库 + 包文件），默认 `./data` |
| `--config <ini>` | 额外配置文件（见第 4 节），命令行参数优先级更高 |
| `--max-post-size <bytes>` | 请求体上限，默认 16 MB（大包推送建议放大） |
| `--base-url <url>` | 反向代理后的对外地址，用于生成绝对 URL |

启动时若 `{data}/packages` 存在，会被自动挂载为 `/packages/` 虚拟静态目录。

---

## 4. 配置键（`--config` ini 或配置字典）

```ini
; 路径
data=./data
packages=./data/packages
db=./data/db
wwwroot=./wwwroot
base-url=http://nuget.scibasic.net/

; 周期性聚类分析
cluster-enabled=true
cluster-k=6
cluster-interval=30          ; 分钟
cluster-min-samples=3        ; 带 tag 的包少于该值则跳过本次重建
cluster-neighbors=15         ; UMAP 邻居数（自动夹紧到 n-1）
```

配置文件为 `key=value` 形式，`#` / `;` 开头为注释；命令行参数覆盖同名配置。

---

## 5. 客户端 xGet

```bash
xGet register --server http://localhost:80 --email me@example.com
xGet upload   --server http://localhost:80 --email me@example.com --file ./My.Pkg.1.0.0.nupkg
xGet batch    --server http://localhost:80 --email me@example.com --dir ./packages [--recursive] [--symbols]
```

- `register`：向服务器注册邮箱，返回并保存该邮箱的 TOTP 密钥
  （Windows/Linux 保存在 `%APPDATA%/xGet/accounts.json` 对应位置）。
- `upload`：用本地密钥生成当前 6 位验证码，把 `email + 验证码 + 包文件` 以 multipart 方式推送。
- `batch`：扫描目录批量上传（默认跳过 `.snupkg`/符号包），**每个包重新生成验证码**，
  已存在（409）则跳过，认证失败立即中止。

认证机制（实验性质）：

1. 注册时服务端为邮箱生成 **128 字符随机盐**，用 `HMAC-SHA256(salt, lower(email))` 派生 20 字节密钥并 Base32 后返回；
2. 服务端只存盐（不存密钥明文），校验时按同样方式重新派生；
3. 验证码遵循 RFC 6238：SHA1、30 秒步长、6 位、前后各 1 个时间步容差。

---

## 6. HTTP 接口

### NuGet v3 协议（匿名）

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/v3/index.json` | 服务索引，列出各资源端点（VS NuGet 客户端入口） |
| GET | `/v3-flatcontainer/{id}/index.json` | 版本列表 |
| GET | `/v3-flatcontainer/{id}/{version}/{file}` | 下载 `.nupkg` / `.nuspec`（下载即计数） |
| GET | `/v3/registration/{id}/index.json` | 注册信息（含 catalogEntry） |
| GET | `/v3/registration/{id}/{version}.json` | 单版本注册叶子 |
| GET | `/v3/search?q=&skip=&take=` | 搜索 |
| GET | `/v3/autocomplete?q=&id=` | 自动补全 |

### 注册与上传

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/register` | 表单 `email`，返回 `{ok, email, secret, otpauth}` |
| POST | `/api/v2/package` | multipart：`email` + `code` + `file`（自定义端点） |
| PUT | `/api/v2/package` | 标准 push：请求头 `X-NuGet-ApiKey: {email}:{code}`，body 为包内容 |

### 站点 REST

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/packages?q=&skip=&take=` | 包列表（分组到最新版本） |
| GET | `/api/package/{id}` | 包详情（含版本列表、依赖、readme、聚类标签） |
| GET | `/api/package/{id}/{version}` | 指定版本详情 |
| GET | `/api/stats` | 总览统计 + Top 下载 + 最近发布 |
| GET | `/api/tag/{tag}?skip=&take=` | 按 tag 查包 |
| GET | `/api/icon/{id}` | 包内图标 |
| GET | `/api/readme/{id}`、`/api/readme/{id}/{version}` | README 原文（`text/markdown`） |
| GET | `/api/activity/package/{id}?days=30` | 该包每日下载/访问量（补零连续序列） |
| GET | `/api/activity/feed?days=30` | 全站每日下载/访问量 |
| GET | `/api/stats/tags` | 标签分布 |
| GET | `/api/stats/tag-network` | 共享标签关系网络 |
| GET | `/api/stats/dependency-network` | nuspec 依赖网络 |
| GET | `/api/stats/clusters` | UMAP + KMeans 聚类文档 |

### 管理（需 TOTP：`email` + `code`）

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/stats/clusters/rebuild` | 强制重建聚类，可传 `k` 覆盖配置 |
| POST | `/api/stats/rebuild` | 重建标签/关系/依赖统计文档 |

---

## 7. 数据存储（JSql）

数据目录结构：

```
{data}/
├── db/nuget/*.json              # JSql 表（每次写入原子落盘）
└── packages/{id}/{version}/     # flat container：*.nupkg、*.nuspec、readme.md、icon.*
```

表：

| 表 | 内容 |
| --- | --- |
| `users` | 邮箱、128 字符盐、派生出的 Base32 密钥、创建时间 |
| `packages` | 每个版本一行：描述、作者、tag、依赖、下载数、大小、sha256、发布时间 |
| `package_tags` | tag 倒排索引 |
| `package_dependencies` | 依赖索引（含目标框架与版本区间） |
| `package_metadata` | 完整 nuspec 元数据（含 readme 文件名、图标文件名） |
| `package_activity` | 每日下载量与详情页访问量（UTC 日 `yyyy-MM-dd`） |
| `package_clusters` | UMAP 三维坐标 + KMeans 聚类标签 |
| `statistics` | 预计算统计文档：`tags`、`tag-network`、`dependency-network`、`package-clusters`、`cluster-state` |

> JSql 无参数化/事务/自增/BLOB，且非线程安全；本项目在 `NugetStore` 内用 `SyncLock` 串行化所有访问，并对字符串做手工转义。

---

## 8. 周期性聚类分析

服务端 `Mount` 时启动进程内定时器（默认首次 30 秒、之后每 30 分钟一次，可用 `cluster-*` 配置）：

1. 计算当前数据指纹（包 id + 版本 + 归一化 tag 集合的 SHA256 前 16 字节），与上次一致则跳过；
2. 取每个包的最新版本构建 **0/1 矩阵**：行为包、列为全部去重 tag（无 tag 的包不参与）；
3. `UMAP` 将矩阵嵌入到 3 维（Cosine 距离，邻居数自动夹紧），并做居中处理；
4. `KMeans` 将三维坐标聚为 `k` 类（默认 6，k 夹紧到 `[2, n-1]`）；
5. 结果写入 `package_clusters` 表与 `statistics` 文档；失败或样本不足时保留上一次结果并记录日志。

前端 `graph.html` 用 **ECharts GL** 绘制该三维散点（坐标轴 `UMAP1` / `UMAP2` / `UMAP3`），
点颜色映射聚类标签，底部图例为可点击链接：点击某个 cluster 会筛选该簇的包，
并把筛选结果的 tag 词云与 Top 25 柱状图刷新到页面顶部的两张图中（`All` 恢复全量）。

---

## 9. 前端页面

| 页面 | 内容 |
| --- | --- |
| `index.html` | 包列表（搜索、分页）+ 数据库统计卡片；版本号作为 Package 列第三行 |
| `package.html` | 包详情：manifest、tag、依赖、描述、发布说明、版本表、README（marked 渲染，禁用原始 HTML）、每日下载/访问曲线、聚类标签 |
| `graph.html` | 标签词云 + Top 25 柱状图、UMAP 三维散点（cluster 链接筛选）、依赖网络（默认隐藏标签，hover 显示目标与邻接节点名） |
| `about.html` | 统计总览（含累计浏览量）、Top 下载、最近发布、全站每日活动曲线 |
| `tags.html` | 按 tag 查询包列表 |

依赖库全部本地化于 `assets/vendor/`：`echarts`、`echarts-wordcloud`、`echarts-gl@2.0.9`、`marked@12.0.2`，
以及保留备用的 `3d-force-graph`、`three.min.js`。样式沿用 scibasic.net 的暗色风格（`assets/css/scibasic.css`）。

---

## 10. 已知限制

- JSql 面向小数据量：每次查询整表读入、每次写入整表写回，非线程安全（已在数据层加锁）。
- UMAP/KMeans 缺少固定随机种子，同一份数据每次重建的绝对坐标与簇编号可能不同。
- 通过静态直链（`/packages/...`）下载不会计入每日下载量，页面与 NuGet 客户端均走控制器路径。
- 上传认证为实验性 TOTP 方案，未实现用户管理、权限与审计等能力。

## 许可

见仓库根目录 `LICENSE`。
