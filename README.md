# Malaysia Trip · 马来西亚五天四夜行程手册

手机旅行手册式静态网页（2026.10.02 – 10.06 吉隆坡 × 马六甲）。
设计参考 priz0424/StopoverTrip 的布局、信息层级与交互方式（不复制其文字 / 照片 / 素材）。

**线上地址（HTTPS，手机可直接打开）**：<https://q1198626414.github.io/malaysia-trip/>

## 功能

- **顶部标签**：行程 / 地图，切换不刷新，localStorage 记忆上次标签
- **Hero**：KL 天际线 SVG + 深色渐变，`2026.10.02 – 2026.10.06` / `Malaysia Trip` / `马来西亚五天四夜`
- **5 天行程**：大号低饱和日期数字 + 主题句；时间线卡片含 MUST / OPTIONAL / PASS-BY / REST / TRANSPORT 优先级、预计耗时与地点导航
- **Checkbox**：每项可勾选，localStorage 持久化；已完成降透明度 + 删除线
- **交通卡（深蓝黑 `#1e272e`）**：KLIA Ekspres / 长途巴士 / MRT / Grab；不编造班次，只给"约"级耗时；Ekspres 与巴士不画驾车路线
- **精选实景图**：两家酒店、双子塔、国家动物园、马六甲河游船使用已核实来源的本地 WebP；不再为每个步骤重复塞通用图或依赖境外图片 CDN
- **地图（Leaflet）**：按 D1–D5 筛选、编号与可选景点开关；仅步行（虚线绿）/ Grab（实线琥珀）路线，公共交通只显示分段说明；D3 不生成整天驾车路线
- **底部导航**：D1–D5 黑色胶囊，当前日暖金高亮，Safe Area 适配，平滑滚动
- **PWA**：manifest + service worker（预缓存 + OSM 瓦片缓存），离线可完整打开

## 2026-09-15 可用性修复

- 页面与代码资源改为网络优先、离线回退，Service Worker 使用独立版本缓存并只触发一次更新刷新；解决电脑普通打开长期停留旧版的问题。
- 移除「在线 / 详细 / 下载离线行程 / 分享」顶部控制区，保留每个地点自己的详情展开。
- 地图、地图标记和每日完整路线只包含马来西亚坐标；杭州机场仍保留在航班行程文字中。
- 所有核心 HTML、CSS、JavaScript、Leaflet 和精选照片均为同源本地资源；地图瓦片不可用时可展开文字路线。Google Maps 仅用于用户主动点击导航。
- D2 已改为 Batu Caves → National Museum → Chinatown → MOV 休息 → Aquaria KLCC → KLCC Park → Petronas 外观；双子塔只看 Ground View，不登塔、不需要票。
- D3 公共交通与 Grab 分段显示，并提供 Normal Route / Late-night fallback；D4 只保留 Zoo Negara → Lexis Hibiscus。
- 新增紧凑的「预订 / 准备」区域、Plan B 提示和地图「显示可选景点」开关。
- 中国大陆网络兼容范围：前端不依赖 Google、Wikimedia、Unsplash 才能打开；但 GitHub Pages 域名本身在不同地区和运营商下可能不稳定，若要保证可达需另配中国大陆可用的静态托管或自有域名。

## 结构

```
index.html          全部内容（5 天 + 地图 tab）
css/style.css       样式（米白 #fdfaf6 / 深灰 #2c3e50 / 暖金 #d4a373）
js/app.js           标签 / Checkbox / 轮播 / 滚动观察 / SW 注册
js/map.js           Leaflet 地图（惰性初始化）
vendor/leaflet/     本地化 Leaflet 1.9.4（离线可用）
sw.js               Service Worker
manifest.webmanifest
icons/              PWA 图标（PIL 生成：双子塔剪影）
outputs/deploy-20260915/  交付截图 + 验证记录
```

## 本地开发

```bash
cd 30_Experiments/malaysia-trip
python -m http.server 8420
# http://127.0.0.1:8420
```

## 部署说明（重要）

本机网络 **github.com:443 不通**（api.github.com 可达），`git push` 无法直连。
当前远端 `main` 由 **GitHub Git Data API**（blobs → tree → commit → ref，curl 走 api.github.com）
推送。后续改动如需更新线上：重跑 `outputs` 同款 API 推送脚本，或修复网络后
`git push --force-with-lease origin main`（本地与远端历史不同源，首推需 force）。

- 远端：<https://github.com/q1198626414/malaysia-trip>（gh 账户 q1198626414）
- Pages：main 分支根目录，构建即生效

## 修订（2026-09-16：最终旅行方案内容重构）

- 行程数据单一来源 `js/data.js`：主清单 / 地点概览 / 地图标记 / 预订中心同源渲染
- Day1=抵达 + Bukit Bintang + Jalan Alor；Day2=黑风洞 + 国家博物馆 + Chinatown + Aquaria + KLCC Park + Petronas 外观；Day3=公共交通前往马六甲、老城步行、回程正常路线/深夜备用；Day4=Zoo Negara→Lexis Hibiscus；Day5=酒店→机场
- 每站新增 📍Google Maps（经纬度）与「前往下一站」（步行=walking，Grab=起终点导航+建议文案，公共交通=纯文字说明）
- 每日进度 `n / N` + 确认式重置；地图加 D1–D5 筛选 + 自动缩放 + 编号标记 + 交通节点；SW 缓存 v2
- 验证全绿：JS 语法、12 项静态断言、行程结构与图片引用检查；地图 D3 不生成整天驾车路线，所有核心内容仍支持离线文字回退。

## 验证记录（2026-09-15）

- 横向滚动审计：360×800 / 390×844 / 430×932 三档均无溢出
- Console 错误：0（本地 + 线上）
- Checkbox 持久化：勾选 → 刷新 → 状态保留（`mt_checked`）
- 离线测试：SW active → 断网 reload → 5 天 + CSS + Leaflet + 地图瓦片全部可用
- 线上 SW：HTTPS 下 active
- 交付截图：`outputs/deploy-20260915/`（首页 / Day1 / Day4 / 地图 / 三宽度）
