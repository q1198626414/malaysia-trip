/* ===== 行程唯一数据源：主清单 / 地点概览 / 地图标记均由此渲染 =====
 * next: 到下一站的交通说明
 *   mode: 'walk'    步行 → 前往下一站按钮 travelmode=walking
 *         'grab'    建议 Grab → 按钮打开起终点导航（不指定模式），文案写明建议 Grab
 *         'transit' 公共交通（MRT/LRT/Ekspres/巴士）→ 不生成驾车/步行导航链接，只显示文字说明
 *         'none'    当天最后一站
 */
const TRIP = {
  startDate: '2026-10-02',
  endDate: '2026-10-06',
  days: [
    {
      id: 1, num: '02', date: '02 October', title: '抵达吉隆坡', theme: '抵达 × 入住 × 夜市',
      transport: {
        mode: '🚄 KLIA Ekspres + Grab', tag: '机场交通',
        from: { code: 'KUL T1', sub: '吉隆坡机场第一航站楼' },
        mid: { icon: '🚄', dur: '约 33 分钟' },
        to: { code: 'KL Sentral', sub: '换乘 Grab 进市区' },
        note: '机场进城建议 KLIA Ekspres 至 KL Sentral（约 33 分钟，约 15–20 分钟一班，以现场为准），再换 Grab 前往酒店。'
      },
      spots: [
        { emoji: '🛬', zh: '吉隆坡国际机场 T1', en: 'Kuala Lumpur International Airport T1', note: '入境 + 提取行李', lat: 2.7456, lng: 101.7099,
          next: { mode: 'transit', text: 'KLIA Ekspres 至 KL Sentral（约 33 分钟），再换 Grab 至酒店' } },
        { emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur', note: '入住及放行李', lat: 3.1462, lng: 101.7097,
          next: { mode: 'walk', text: '步行至武吉免登商圈' } },
        { emoji: '🌃', zh: '武吉免登', en: 'Bukit Bintang', note: '商圈主干道，熟悉环境', lat: 3.1459, lng: 101.7117,
          next: { mode: 'walk', text: '步行至 Pavilion' } },
        { emoji: '🛍️', zh: 'Pavilion 吉隆坡', en: 'Pavilion Kuala Lumpur', note: '商场及晚餐', lat: 3.1486, lng: 101.7136,
          next: { mode: 'walk', text: '步行至阿罗街（约 10 分钟）' } },
        { emoji: '🍜', zh: '阿罗街', en: 'Jalan Alor Food Street', note: '夜市晚餐', lat: 3.1434, lng: 101.7080,
          next: { mode: 'walk', text: '步行返回酒店' } }
      ]
    },
    {
      id: 2, num: '03', date: '03 October', title: '吉隆坡市区', theme: '历史街区 × 城市地标',
      transport: {
        mode: '🚇 MRT / LRT + 步行', tag: '市区移动',
        from: { code: '历史街区', sub: '茨厂街一带' },
        mid: { icon: '🚇', dur: '视路段' },
        to: { code: 'KLCC', sub: '双子塔一带' },
        note: '市区以步行 + MRT/LRT 为主。国家博物馆 → 茨厂街可乘 Grab 或公共交通；独立广场 → KLCC 建议 MRT/LRT 或 Grab，不安排驾车。'
      },
      spots: [
        { emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur', note: '早餐后出发', lat: 3.1462, lng: 101.7097,
          next: { mode: 'grab', text: '建议 Grab 前往国家博物馆' } },
        { emoji: '🏛️', zh: '国家博物馆', en: 'National Museum of Malaysia (Muzium Negara)', note: '马来西亚历史概览', lat: 3.1383, lng: 101.6865,
          next: { mode: 'grab', text: '建议 Grab 或公共交通前往茨厂街' } },
        { emoji: '🏮', zh: '茨厂街', en: 'Petaling Street / Chinatown', note: '唐人街街区', lat: 3.1440, lng: 101.6970,
          next: { mode: 'walk', text: '步行（相邻街区）' } },
        { emoji: '🏮', zh: '鬼仔巷', en: 'Kwai Chai Hong', note: '壁画与老街空间', lat: 3.1446, lng: 101.6982,
          next: { mode: 'walk', text: '步行至中央艺术坊（约 5 分钟）' } },
        { emoji: '🎨', zh: '中央艺术坊', en: 'Central Market Kuala Lumpur', note: '工艺品与本地文化', lat: 3.1468, lng: 101.6957,
          next: { mode: 'walk', text: '步行至独立广场（约 8 分钟）' } },
        { emoji: '🏛️', zh: '独立广场', en: 'Merdeka Square', note: '历史地标（沿途可见苏丹阿都沙末大厦）', lat: 3.1478, lng: 101.6932,
          next: { mode: 'transit', text: '建议 MRT/LRT 或 Grab 前往 KLCC，不驾车' } },
        { emoji: '🌉', zh: '双子塔 KLCC', en: 'Petronas Twin Towers', note: '城市地标收尾', lat: 3.1580, lng: 101.7116,
          next: { mode: 'transit', text: 'MRT 或 Grab 返回酒店' } }
      ]
    },
    {
      id: 3, num: '04', date: '04 October', title: '马六甲', theme: '马六甲文化一日游',
      transport: {
        mode: '🚌 长途巴士', tag: '跨城交通',
        from: { code: 'TBS', sub: '吉隆坡南湖镇车站' },
        mid: { icon: '🚌', dur: '约 2–2.5 小时' },
        to: { code: 'Melaka Sentral', sub: '马六甲中央车站' },
        note: '吉隆坡—马六甲仅以长途巴士接驳（不驾车、不 Grab）。TBS 与 Melaka Sentral 为交通节点，不入正式行程；班次以现场为准。市区景点间步行串联。'
      },
      spots: [
        { emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur', note: '早餐后出发，行李寄存前台', lat: 3.1462, lng: 101.7097,
          next: { mode: 'transit', text: 'Grab/地铁至 TBS → 长途巴士（约 2–2.5 小时）→ Melaka Sentral → Grab 进古城' } },
        { emoji: '🏛️', zh: '马六甲红屋', en: 'Dutch Square / The Stadthuys', note: '荷兰广场历史核心', lat: 2.1940, lng: 102.2490,
          next: { mode: 'walk', text: '步行（相邻街区）' } },
        { emoji: '🏠', zh: '峇峇娘惹祖屋', en: 'Baba & Nyonya Heritage Museum', note: '土生华人宅邸博物馆', lat: 2.1956, lng: 102.2462,
          next: { mode: 'walk', text: '步行至圣保罗山' } },
        { emoji: '⛪', zh: '圣保罗山', en: "St. Paul's Hill Melaka", note: '俯瞰古城（山下可顺路看 A Famosa 遗门）', lat: 2.1935, lng: 102.2495,
          next: { mode: 'walk', text: '步行至青云亭' } },
        { emoji: '🛕', zh: '青云亭', en: 'Cheng Hoon Teng Temple', note: '马来西亚最古老华人寺庙', lat: 2.1955, lng: 102.2464,
          next: { mode: 'walk', text: '步行至游船码头' } },
        { emoji: '🛶', zh: '马六甲河游船', en: 'Melaka River Cruise', note: '傍晚场次光线较好', lat: 2.1944, lng: 102.2468,
          next: { mode: 'walk', text: '步行过桥即鸡场街' } },
        { emoji: '🏮', zh: '鸡场街夜市', en: 'Jonker Street Night Market', note: '老街夜市（周五至周日晚）', lat: 2.1967, lng: 102.2460,
          next: { mode: 'transit', text: '夜市后 Grab 至 Melaka Sentral → 长途巴士返吉隆坡' } }
      ]
    },
    {
      id: 4, num: '05', date: '05 October', title: '黑风洞 × TRX', theme: '舒服优先 × 黑风洞 × 购物',
      transport: {
        mode: '🚗 Grab（叫车）', tag: '往返黑风洞',
        from: { code: 'MOV Hotel', sub: '武吉免登' },
        mid: { icon: '🚗', dur: '约 20–30 分钟' },
        to: { code: 'Batu Caves', sub: '黑风洞' },
        note: '黑风洞往返建议 Grab（备选：KTM Komuter 至 Batu Caves 站，仅作参考）。约 20–30 分钟，视路况。'
      },
      spots: [
        { emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur', note: '早餐后出发', lat: 3.1462, lng: 101.7097,
          next: { mode: 'grab', text: '建议 Grab 前往黑风洞（约 20–30 分钟）' } },
        { emoji: '🛕', zh: '黑风洞', en: 'Batu Caves', note: '彩虹阶梯 + 印度教圣地，留意猴子', lat: 3.2374, lng: 101.6839,
          next: { mode: 'grab', text: '建议 Grab 返回酒店' } },
        { emoji: '🍽️', zh: '午餐并返回酒店休息', en: 'Lunch & Rest at MOV Hotel', note: '舒服优先，午后避暑', lat: 3.1462, lng: 101.7097,
          next: { mode: 'walk', text: '步行/短程 Grab 至 TRX' } },
        { emoji: '🏙️', zh: 'The Exchange TRX', en: 'The Exchange TRX', note: '新兴商圈 + 空中花园', lat: 3.1410, lng: 101.7170,
          next: { mode: 'walk', text: '步行经连接通道至武吉免登' } },
        { emoji: '🌃', zh: '武吉免登', en: 'Bukit Bintang', note: '购物与晚餐收尾', lat: 3.1459, lng: 101.7117,
          next: { mode: 'walk', text: '步行返回酒店' } }
      ]
    },
    {
      id: 5, num: '06', date: '06 October', title: '返程', theme: '退房 × 机场返程',
      transport: {
        mode: '🚄 KLIA Ekspres', tag: '机场交通',
        from: { code: 'KL Sentral', sub: '中央车站' },
        mid: { icon: '🚄', dur: '约 33 分钟' },
        to: { code: 'KUL T1', sub: '吉隆坡机场第一航站楼' },
        note: 'KL Sentral — KUL T1 搭乘 KLIA Ekspres（不驾车）。约 33 分钟，约 15–20 分钟一班，以现场为准。'
      },
      spots: [
        { emoji: '🧳', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur', note: '退房，行李随身', lat: 3.1462, lng: 101.7097,
          next: { mode: 'grab', text: '建议 Grab 或公共交通前往 KL Sentral' } },
        { emoji: '🚆', zh: 'KL Sentral', en: 'KL Sentral', note: '中央车站，换乘 KLIA Ekspres', lat: 3.1333, lng: 101.6867,
          next: { mode: 'transit', text: 'KLIA Ekspres 至 KUL T1（约 33 分钟）' } },
        { emoji: '🛫', zh: '吉隆坡国际机场 T1', en: 'Kuala Lumpur International Airport T1', note: '办理登机，返程', lat: 2.7456, lng: 101.7099,
          next: { mode: 'none', text: '' } }
      ]
    }
  ],
  // 仅地图使用的交通节点（不进入正式行程）
  transitNodes: [
    { name: 'TBS 南湖镇车站', lat: 3.0750, lng: 101.7110, day: 3 },
    { name: 'Melaka Sentral 马六甲中央车站', lat: 2.2207, lng: 102.2507, day: 3 }
  ]
};
