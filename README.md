# Malaysia Trip · 马来西亚五天四夜行程手册

手机旅行手册式静态网页（2026.10.02 – 10.06 吉隆坡 × 马六甲）。
设计参考 priz0424/StopoverTrip 的布局、信息层级与交互方式（不复制其文字 / 照片 / 素材）。

**线上地址（HTTPS，手机可直接打开）**：<https://q1198626414.github.io/malaysia-trip/>

## 功能

- **顶部标签**：行程 / 地图，切换不刷新，localStorage 记忆上次标签
- **Hero**：KL 天际线 SVG + 深色渐变，`2026.10.02 – 2026.10.06` / `Malaysia Trip` / `马来西亚五天四夜`
- **5 天行程**：大号低饱和日期数字 + 主题句；时间线卡片含 Emoji、地点 Google Maps 链接
- **Checkbox**：每项可勾选，localStorage 持久化；已完成降透明度 + 删除线
- **交通卡（深蓝黑 `#1e272e`）**：KLIA Ekspres / 长途巴士 / MRT / Grab；不编造班次，只给"约"级耗时；Ekspres 与巴士不画驾车路线
- **照片轮播**：统一渐变地点封面（本机无法访问外网图源，全站零外部图片依赖），scroll-snap 滑动 + `1 / N` 计数
- **地图（Leaflet）**：22 地点标记 + 仅步行（虚线绿）/ Grab（实线琥珀）路线；KL Sentral–KUL、KL–Melaka 只用交通卡说明
- **底部导航**：D1–D5 黑色胶囊，当前日暖金高亮，Safe Area 适配，平滑滚动
- **PWA**：manifest + service worker（预缓存 + OSM 瓦片缓存），离线可完整打开

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

## 修订（2026-09-15 二轮：最终行程对齐）

- 行程数据单一来源 `js/data.js`：主清单 / 地点概览 / 地图标记同源渲染
- Day1=5 站（补武吉免登）；Day2=7 站（补 MOV/国家博物馆/鬼仔巷，删苏丹阿都沙末大厦与 KLCC Park 主清单项）；Day3=7 站（补峇峇娘惹祖屋/青云亭，河游船/夜市更名，A Famosa 降为路过注记）；Day4 舒服版无天后宫；Day5=MOV→KL Sentral→KUL T1
- 每站新增 📍Google Maps（经纬度）与「前往下一站」（步行=walking，Grab=起终点导航+建议文案，公共交通=纯文字说明）
- 每日进度 `n / N` + 确认式重置；地图加 D1–D5 筛选 + 自动缩放 + 编号标记 + 交通节点；SW 缓存 v2
- 验证全绿：三宽度+桌面无横向滚动、Hero 198px、链接 45 条（27 地点全经纬度 / 13 步行 / 5 Grab）、D3 筛选 9 标记、离线 27 项可读、console 0 错误；截图 `outputs/revise-20260915/`

## 验证记录（2026-09-15）

- 横向滚动审计：360×800 / 390×844 / 430×932 三档均无溢出
- Console 错误：0（本地 + 线上）
- Checkbox 持久化：勾选 → 刷新 → 状态保留（`mt_checked`）
- 离线测试：SW active → 断网 reload → 5 天 + CSS + Leaflet + 地图瓦片全部可用
- 线上 SW：HTTPS 下 active
- 交付截图：`outputs/deploy-20260915/`（首页 / Day1 / Day4 / 地图 / 三宽度）
