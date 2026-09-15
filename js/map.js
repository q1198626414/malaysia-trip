/* ===== 地图（Leaflet）—— 仅连接步行 / Grab 路段；KLIA Ekspres 与长途巴士只显示标记，不画驾车路线 ===== */
(function () {
  const DAY_COLORS = {
    1: '#d4a373',
    2: '#8fa3b0',
    3: '#b0725a',
    4: '#6f8f6a',
    5: '#6a7ba0'
  };

  // 地点标记： [lat, lng, 名称, 天数]
  const MARKERS = [
    // Day 1
    [2.7558, 101.7053, '吉隆坡国际机场 KUL', 1],
    [3.1333, 101.6867, 'KL Sentral 中央车站', 1],
    [3.1458, 101.7090, 'MOV Hotel', 1],
    [3.1486, 101.7136, 'Pavilion Kuala Lumpur', 1],
    [3.1434, 101.7080, 'Jalan Alor 夜市', 1],
    // Day 2
    [3.1478, 101.6932, 'Merdeka Square 独立广场', 2],
    [3.1483, 101.6947, '苏丹阿都沙末大厦', 2],
    [3.1468, 101.6957, 'Central Market 中央市场', 2],
    [3.1440, 101.6970, 'Petaling Street 茨厂街', 2],
    [3.1580, 101.7116, 'Petronas Twin Towers 双子塔', 2],
    [3.1573, 101.7130, 'KLCC Park', 2],
    // Day 3
    [3.0750, 101.7110, 'TBS 南湖镇车站', 3],
    [2.2207, 102.2507, 'Melaka Sentral 马六甲中央车站', 3],
    [2.1940, 102.2490, 'Dutch Square 荷兰红屋', 3],
    [2.1935, 102.2495, 'St Paul\'s Church 圣保罗教堂', 3],
    [2.1917, 102.2495, 'A Famosa 爱化摩沙堡垒', 3],
    [2.1960, 102.2470, 'Malacca River 马六甲河', 3],
    [2.1967, 102.2460, 'Jonker Street 鸡场街', 3],
    // Day 4
    [3.2374, 101.6839, 'Batu Caves 黑风洞', 4],
    [3.1410, 101.7170, 'The Exchange TRX', 4],
    [3.1466, 101.7110, 'Bukit Bintang 武吉免登', 4],
    // Day 5
    [2.7558, 101.7053, '吉隆坡国际机场 KUL T1', 5]
  ];

  // 步行 / Grab 路段（绿 = 步行，琥珀 = Grab）
  const WALK = '#3f9e6b';
  const GRAB = '#e0a13c';
  const ROUTES = [
    // Day 1：KL Sentral → MOV Hotel（Grab），酒店 → Pavilion → Jalan Alor（步行）
    { pts: [[3.1333, 101.6867], [3.1458, 101.7090]], type: 'grab' },
    { pts: [[3.1458, 101.7090], [3.1486, 101.7136], [3.1434, 101.7080]], type: 'walk' },
    // Day 2：历史街区步行串联；双子塔 ↔ KLCC Park 步行（中间 MRT 不画）
    { pts: [[3.1478, 101.6932], [3.1483, 101.6947], [3.1468, 101.6957], [3.1440, 101.6970]], type: 'walk' },
    { pts: [[3.1580, 101.7116], [3.1573, 101.7130]], type: 'walk' },
    // Day 3：马六甲古城步行串联（跨城巴士不画）
    { pts: [[2.1940, 102.2490], [2.1935, 102.2495], [2.1917, 102.2495], [2.1960, 102.2470], [2.1967, 102.2460]], type: 'walk' },
    // Day 4：MOV → 黑风洞（Grab，往返），酒店 → TRX（Grab），TRX → 武吉免登（步行）
    { pts: [[3.1458, 101.7090], [3.2374, 101.6839]], type: 'grab' },
    { pts: [[3.2374, 101.6839], [3.1458, 101.7090]], type: 'grab' },
    { pts: [[3.1458, 101.7090], [3.1410, 101.7170]], type: 'grab' },
    { pts: [[3.1410, 101.7170], [3.1466, 101.7110]], type: 'walk' },
    // Day 5：酒店 → KL Sentral（Grab / MRT，画 Grab 段）；KL Sentral → KUL 为 KLIA Ekspres，不画
    { pts: [[3.1458, 101.7090], [3.1333, 101.6867]], type: 'grab' }
  ];

  let map = null;
  let mapReady = false;

  function markerIcon(day) {
    return L.divIcon({
      className: '',
      html: `<div class="map-marker" style="background:${DAY_COLORS[day]}">${day}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -14]
    });
  }

  function buildMap() {
    map = L.map('map', { scrollWheelZoom: false, tap: true })
      .setView([3.05, 101.7], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    MARKERS.forEach(([lat, lng, name, day]) => {
      L.marker([lat, lng], { icon: markerIcon(day) })
        .addTo(map)
        .bindPopup(`<div class="map-popup"><b>D${day}</b> · ${name}</div>`);
    });

    ROUTES.forEach((r) => {
      const color = r.type === 'walk' ? WALK : GRAB;
      L.polyline(r.pts, {
        color: color,
        weight: 3,
        opacity: 0.85,
        dashArray: r.type === 'walk' ? '6 7' : null,
        lineJoin: 'round'
      }).addTo(map);
    });
  }

  // 惰性初始化：地图 tab 首次显示时才建图，避免隐藏容器尺寸为 0
  function ensureMap() {
    if (!mapReady) {
      mapReady = true;
      buildMap();
      return;
    }
    if (map) {
      setTimeout(() => map.invalidateSize(), 40);
    }
  }

  window.ensureMap = ensureMap;
})();
