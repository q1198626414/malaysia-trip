# Malaysia Trip · 马来西亚五天四夜行程手册

手机旅行手册式静态网页（2026.10.02 – 10.06 吉隆坡 × 马六甲）。
设计参考 priz0424/StopoverTrip 的布局、信息层级与交互方式（不复制其文字 / 照片 / 素材）。

**线上地址（HTTPS，手机可直接打开）**：<https://q1198626414.github.io/malaysia-trip/>

## 功能

- **手机行程手册**：顶部仅显示日期与旅行名称；住宿和预订/准备各自折叠，预订事项按优先级排列，可设为未完成或已完成，并保存在当前浏览器。
- **一天一屏**：底部 D1–D5 切换当天行程；记住上次日期，首次打开显示 D1，`#d3` 可直达 D3。
- **简洁站点卡**：站点序号、图标、中文名、可复制英文名、Google Maps 导航、时间/时长和下一段交通；吃什么、可选点和补充说明默认折叠。
- **行程地图**：按日期筛选、编号标记；路线连线仅表示地点顺序，实际道路导航交给 Google Maps。D3 公共交通分段显示，不生成整天驾车路线；地图不可用时仍可展开文字路线。
- **本地照片**：酒店、双子塔、动物园和马六甲河游船使用仓库内 WebP 文件，避免依赖外部图片 CDN。
- **PWA / 离线**：manifest 与 Service Worker 缓存页面和本地资源；无网络时可查看文字行程。地图瓦片仍需联网加载。

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

## 修订（2026-09-28：每日手册与行程优化）

- 行程页改为一天显示一日，住宿、预订、用餐与补充说明默认收起；预订状态可编辑并保存在当前浏览器。
- D1 晚餐改为黄亚华；D2 保留黑风洞、国家博物馆和 Aquaria，并安排酒店休息；D3 以 Grab 往返 TBS、压缩鸡场街停留并恢复深夜返程说明。
- D4 调整为 Zoo Negara → Putra Mosque / Putrajaya → Lexis Hibiscus；若清真寺到达时间晚于 15:00，则继续前往酒店。D5 上午休息，约 11:00 出发去机场。
- D2 餐馆为南香午餐、Madam Kwan's 晚餐；D3 主路线用 Jonker 88，Nancy's Kitchen 作为需额外交通的备选。
- 预订清单按“高优先级 → 建议提前 → 到店办理 → 已完成”排序；删除无需办理的外观和清真寺预约项，新增国家博物馆普通话导览、马六甲博物馆/游船与 Lexis 日落游船；每项用一个圆形按钮切换未完成/已完成，兼容旧的待办/已办记录。
- 资源缓存版本更新为 `20260928-booking-03`。本轮自动检查覆盖预订优先级、圆形状态按钮、旧记录兼容和资源版本更新；未完成真实浏览器视觉检查。

## 验证记录（2026-09-15）

- 横向滚动审计：360×800 / 390×844 / 430×932 三档均无溢出
- Console 错误：0（本地 + 线上）
- Checkbox 持久化：勾选 → 刷新 → 状态保留（`mt_checked`）
- 离线测试：SW active → 断网 reload → 5 天 + CSS + Leaflet + 地图瓦片全部可用
- 线上 SW：HTTPS 下 active
- 交付截图：`outputs/deploy-20260915/`（首页 / Day1 / Day4 / 地图 / 三宽度）
