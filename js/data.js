/* ===== Malaysia Trip — 最终定稿（第六轮） ===== */
const TRIP = {
  meta: {
    title: 'Malaysia Trip',
    subtitle: '马来西亚五天四夜',
    dates: '2026.10.02 – 2026.10.06',
    travelers: 2,
    durationDays: 5,
    durationNights: 4,
    originCity: '杭州',
    destinationCity: 'Kuala Lumpur',
    heroImageAlt: 'Petronas Twin Towers, Kuala Lumpur',
    heroImageCredit: 'Petronas Twin Towers official website'
  },
  stays: [
    {
      id: 'mov', name: 'MOV Hotel Kuala Lumpur', zhName: 'MOV Hotel 吉隆坡',
      dates: 'Oct 2 – 5', nights: 3, status: 'confirmed',
      address: 'Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur',
      lat: 3.1462, lng: 101.7097,
      image: 'img/mov-hotel.webp', imageAlt: 'MOV Hotel room',
      imageCredit: 'MOV Hotel official website', imageSource: 'https://movhotel.com/gallery/',
      checkIn: '15:00', checkOut: '12:00',
      nearestMRT: 'Bukit Bintang MRT / Monorail Station',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=MOV+Hotel+Kuala+Lumpur'
    },
    {
      id: 'lexis', name: 'Lexis Hibiscus Port Dickson', zhName: '丽昇大红花海上度假村',
      dates: 'Oct 5 – 6', nights: 1, status: 'confirmed',
      address: '12th Mile, Jalan Pantai, 71250 Pasir Panjang, Negeri Sembilan',
      lat: 2.5167, lng: 101.8000,
      image: 'img/lexis-hibiscus.webp', imageAlt: 'Lexis Hibiscus Port Dickson aerial view',
      imageCredit: 'Lexis Hibiscus official website', imageSource: 'https://www.lexishibiscuspd.com/gallery/photo-gallery',
      checkIn: '15:00', checkOut: '11:00',
      nearestMRT: '—',
      airportTransfer: '酒店提供收费机场接送，需提前联系礼宾部预约',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lexis+Hibiscus+Port+Dickson'
    }
  ],
  flights: {
    outbound: { from: 'HGH', to: 'KUL', date: '2026-10-02', dep: '08:55', arr: '14:20', note: '已购票' },
    inbound: { from: 'KUL', to: 'HGH', date: '2026-10-06', dep: '15:20', arr: '20:30', note: '已购票' }
  },
  days: [
    {
      id: 1, num: '02', date: '02 October', weekday: 'Friday',
      title: '抵达吉隆坡', theme: '抵达 × 入住 × 夜市', intensity: 2,
      summary: { spots: 5, walks: '约 2 km', grabs: 1, budget: 'RM 40–70 / 人' },
      transport: {
        mode: '🚄 KLIA Ekspres + Grab', tag: '机场交通',
        from: { code: 'KUL T1', sub: '吉隆坡机场第一航站楼' },
        mid: { icon: '🚄', dur: '约 28 分钟' },
        to: { code: 'KL Sentral', sub: '换乘 Grab 进市区' },
        note: 'KLIA Ekspres 至 KL Sentral（约 28 分钟），再换 Grab 前往酒店（约 15–25 分钟）。'
      },
      spots: [
        { time: '08:55', type: 'transit', emoji: '🛫', zh: '杭州萧山机场 HGH', en: 'Hangzhou Xiaoshan Airport',
          mapVisible: false, note: '起飞', lat: 30.2294, lng: 120.4343,
          address: '杭州萧山国际机场', duration: '—', openingHours: '—', ticket: '已购票',
          tips: ['提前值机','国际航班建议提前 2 小时到达'],
          next: { mode: 'transit', text: '飞行至吉隆坡（约 5.5 小时）' }
        },
        { time: '14:20', type: 'transit', emoji: '🛬', zh: '吉隆坡国际机场 T1', en: 'Kuala Lumpur International Airport T1',
          note: '抵达，入境 + 取行李 + ATM/换马币', lat: 2.7456, lng: 101.7099,
          address: '64000 Sepang, Selangor',
          duration: '约 1–1.5 小时', openingHours: '24 小时', ticket: '无',
          tips: ['提前填好马来西亚入境卡（MDAC）','不要按"14:20落地14:30出机场"理想状态排'],
          next: { mode: 'transit', text: 'KLIA Ekspres 至 KL Sentral（约 28 分钟），再换 Grab 至酒店' }
        },
        { time: '16:45', type: 'hotel', emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur',
          note: 'Check-in / 洗澡 / 充电 / 休息', lat: 3.1462, lng: 101.7097,
          address: 'Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur',
          duration: '约 1.25 小时', openingHours: '入住 15:00 / 退房 12:00', ticket: '无',
          tips: ['第一天轻松适应','酒店位于 Bukit Bintang 核心区'],
          next: { mode: 'walk', text: '步行至 Pavilion（约 5 分钟）' }
        },
        { time: '18:15', type: 'shopping', emoji: '🛍️', zh: 'Pavilion 吉隆坡', en: 'Pavilion Kuala Lumpur',
          note: '轻松走走，熟悉环境', lat: 3.1486, lng: 101.7136,
          address: '168, Jalan Bukit Bintang, 55100 Kuala Lumpur',
          duration: '约 45 分钟', openingHours: '10:00 – 22:00', ticket: '无',
          tips: ['第一天只轻松走走','不安排购物任务'],
          next: { mode: 'walk', text: '19:00 左右步行至阿罗街（约 10 分钟）' }
        },
        { time: '19:00', type: 'food', emoji: '🍜', zh: '阿罗街', en: 'Jalan Alor Food Street',
          note: '夜市晚餐', lat: 3.1434, lng: 101.7080,
          address: 'Jalan Alor, Bukit Bintang, 50200 Kuala Lumpur',
          duration: '约 1.5 小时', openingHours: '约 17:00 – 次日 01:00', ticket: '无',
          tips: ['推荐：福建面、沙爹、炒粿条、果汁','两人约 RM40–70','现金为主'],
          next: { mode: 'walk', text: '20:30 水果/榴莲 → 21:00 可选按摩 → 22:15 左右步行回 MOV（约 8 分钟）' }
        }
      ],
      restaurants: [
        { meal: 'dinner', time: '约 19:20',
          name: 'Jalan Alor 街头美食', zhName: '阿罗街夜市',
          cuisine: '马来西亚中式街头美食', tags: ['Chinese', 'Street Food', 'Cash Only'],
          recommendedDishes: ['福建面','沙爹','炒粿条','果汁'],
          pricePerPerson: 'RM 20–35', openingHours: '约 17:00 – 01:00',
          distanceFromPrev: '步行 10 分钟（从 Pavilion）',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jalan+Alor+Kuala+Lumpur',
          backup: { name: 'Lot 10 Hutong Food Court', zhName: '十号胡同', note: '室内空调，雨天备用' }
        }
      ]
    },
    {
      id: 2, num: '03', date: '03 October', weekday: 'Saturday',
      title: '历史与都市', theme: '马来西亚历史 → 华人老城 → 独立历史 → 现代吉隆坡', intensity: 4,
      summary: { spots: 10, walks: '约 4 km', grabs: 3, budget: 'RM 60–100 / 人' },
      transport: {
        mode: '🚇 MRT / LRT + 步行', tag: '市区移动',
        from: { code: 'MOV Hotel', sub: '先前往黑风洞' },
        mid: { icon: '🚇', dur: '视路段' },
        to: { code: 'KLCC', sub: '双子塔一带' },
        note: '早上 MOV → 黑风洞建议 Grab；黑风洞 → 国家博物馆建议 Grab。老城区内部步行，独立广场 → MOV 用 Grab，休息后再乘 MRT/Grab 去 KLCC。'
      },
      spots: [
        { time: '07:00', type: 'hotel', emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur',
          note: '早餐：咖椰吐司 + 半熟蛋 + 白咖啡', lat: 3.1462, lng: 101.7097,
          address: 'Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur',
          duration: '约 1 小时', openingHours: '—', ticket: '无',
          tips: [],
          next: { mode: 'grab', text: 'Grab 前往黑风洞（约 30–40 分钟）' }
        },
        { time: '08:30', type: 'attraction', emoji: '🛕', zh: '黑风洞', en: 'Batu Caves',
          note: '彩虹阶梯 + 印度教圣地；建议控制在约 70 分钟', lat: 3.2374, lng: 101.6839,
          address: 'Gombak, 68100 Batu Caves, Selangor',
          duration: '约 70 分钟', openingHours: '约 06:00 – 21:00', ticket: '无',
          tips: ['272 级彩虹阶梯','猴子会抢食物','穿长裤/长裙','下雨台阶滑'],
          next: { mode: 'grab', text: 'Grab 前往国家博物馆（约 30–40 分钟）' }
        },
        { time: '10:15', type: 'attraction', emoji: '🏛️', zh: '马来西亚国家博物馆', en: 'Muzium Negara',
          note: '确定保留的博物馆', lat: 3.1383, lng: 101.6865,
          address: 'Jalan Damansara, Perdana Botanical Gardens, 50566 Kuala Lumpur',
          duration: '约 2 小时', openingHours: '09:00 – 18:00', ticket: 'RM 5',
          tips: ['重点：马来半岛早期历史、马六甲苏丹国、殖民史、华人印度人迁移、独立','优先中文自助导览','为明天马六甲做准备'],
          next: { mode: 'transit', text: 'MRT 前往 Pasar Seni（约 10 分钟）' }
        },
        { time: '12:15', type: 'food', emoji: '🍚', zh: '午餐：海南鸡饭', en: 'Hainanese Chicken Rice',
          note: 'Pasar Seni 附近', lat: 3.1450, lng: 101.6960,
          address: 'Pasar Seni 附近',
          duration: '约 50 分钟', openingHours: '—', ticket: '约 RM 25–40 / 两人',
          tips: ['午餐后前往茨厂街'],
          next: { mode: 'walk', text: '步行至茨厂街' }
        },
        { time: '13:00', type: 'attraction', emoji: '🏮', zh: '茨厂街', en: 'Petaling Street / Chinatown',
          note: '唐人街街区', lat: 3.1440, lng: 101.6970,
          address: 'Jalan Petaling, City Centre, 50000 Kuala Lumpur',
          duration: '约 35 分钟', openingHours: '约 08:00 – 22:00', ticket: '无',
          tips: ['著名牌坊和遮阳棚'],
          next: { mode: 'walk', text: '步行（约 3 分钟）' }
        },
        { time: '13:30', type: 'attraction', emoji: '🏮', zh: '鬼仔巷', en: 'Kwai Chai Hong',
          note: '壁画与老街空间', lat: 3.1446, lng: 101.6982,
          address: 'Lorong Panggung, City Centre, 50000 Kuala Lumpur',
          duration: '约 30 分钟', openingHours: '全天', ticket: '无',
          tips: ['多幅创意壁画适合拍照'],
          next: { mode: 'walk', text: '步行至中央艺术坊（约 5 分钟）' }
        },
        { time: '13:55', type: 'attraction', emoji: '🎨', zh: '中央艺术坊', en: 'Central Market Kuala Lumpur',
          note: '天热/下雨时的室内缓冲', lat: 3.1468, lng: 101.6957,
          address: 'Jalan Hang Kasturi, City Centre, 50050 Kuala Lumpur',
          duration: '约 45 分钟', openingHours: '10:00 – 21:30', ticket: '无',
          tips: ['二楼 Precious Old China 是知名娘惹餐厅','适合买手信'],
          next: { mode: 'walk', text: '步行至独立广场（约 8 分钟）' }
        },
        { time: '14:40', type: 'attraction', emoji: '🏛️', zh: '独立广场', en: 'Merdeka Square',
          note: '独立历史地标', lat: 3.1478, lng: 101.6932,
          address: 'Jalan Raja, City Centre, 50050 Kuala Lumpur',
          duration: '约 40 分钟', openingHours: '全天', ticket: '无',
          tips: ['世界最高旗杆（95 米）','对面是苏丹阿都沙末大厦'],
          next: { mode: 'grab', text: 'Grab 返回 MOV 休息（约 15 分钟）' }
        },
        { time: '15:40', type: 'hotel', emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur',
          note: '酒店休息 / 洗澡 / 换衣 / 空调 / 补水（必须保留）', lat: 3.1462, lng: 101.7097,
          address: 'Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur',
          duration: '约 1.5 小时', openingHours: '—', ticket: '无',
          tips: ['避开正午高温','休整后再出发'],
          next: { mode: 'transit', text: 'MRT 至 KLCC（约 15 分钟）' }
        },
        { time: '18:30', type: 'attraction', emoji: '🌉', zh: '双子塔 KLCC', en: 'Petronas Twin Towers',
          image: 'img/petronas-towers.webp', imageAlt: 'Petronas Twin Towers skyline',
          imageCredit: 'Petronas Twin Towers official website', imageSource: 'https://www.petronastwintowers.com.my/',
          note: '观景台 + 夜景', lat: 3.1580, lng: 101.7116,
          address: 'Kuala Lumpur City Centre, 50088 Kuala Lumpur',
          duration: '约 1 小时', openingHours: '商场 10:00 – 22:00 / 空中走廊周二至日 09:00 – 17:00（周一关闭）', ticket: '空中走廊需预约购票',
          tips: ['建议提前订票','19:00–19:40 KLCC Park 拍外景','20:45–21:30 看夜景'],
          next: { mode: 'walk', text: '步行至 KLCC Park' }
        }
      ],
      restaurants: [
        { meal: 'breakfast', time: '约 08:15',
          name: '咖椰吐司 + 白咖啡', zhName: '咖椰吐司早餐',
          cuisine: '马来西亚 Kopitiam', tags: ['Local'],
          recommendedDishes: ['咖椰吐司','半熟蛋','白咖啡'],
          pricePerPerson: 'RM 8–15', openingHours: '—',
          distanceFromPrev: '酒店附近',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=kaya+toast+bukit+bintang',
          backup: { name: '酒店早餐', zhName: '酒店早餐', note: '如有包含' }
        },
        { meal: 'lunch', time: '约 12:00',
          name: '海南鸡饭', zhName: '海南鸡饭',
          cuisine: '马来西亚中式', tags: ['Chinese'],
          recommendedDishes: ['海南鸡饭'],
          pricePerPerson: 'RM 12–20', openingHours: '—',
          distanceFromPrev: 'Pasar Seni 附近',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hainanese+Chicken+Rice+Pasar+Seni',
          backup: { name: 'Central Market Food Court', zhName: '中央市场美食广场', note: '多种选择' }
        },
        { meal: 'dinner', time: '约 20:15',
          name: 'Suria KLCC / 阿罗街', zhName: 'Suria KLCC 或 阿罗街',
          cuisine: '商场美食 / 街头美食', tags: ['Mixed'],
          recommendedDishes: ['商场：各式档口','阿罗街：Satay、烤鸡翅、Cendol'],
          pricePerPerson: 'RM 25–50', openingHours: '商场 10:00–22:00 / 阿罗街 17:00–01:00',
          distanceFromPrev: 'KLCC 或返回 Bukit Bintang',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Suria+KLCC+Food+Court',
          backup: { name: 'Pavilion KL Food Republic', zhName: 'Pavilion 大食代', note: '室内空调，雨天备用' }
        }
      ]
    },
    {
      id: 3, num: '04', date: '04 October', weekday: 'Sunday',
      title: '马六甲', theme: '马六甲文化一日游（最累一天）', intensity: 5,
      summary: { spots: 9, walks: '约 3 km', grabs: 2, budget: 'RM 100–150 / 人（含巴士）', endTime: '约 23:30' },
      transport: {
        mode: '🚇 Monorail + LRT + 长途巴士', tag: '跨城交通',
        from: { code: 'MOV Hotel', sub: '步行至 Bukit Bintang 站' },
        mid: { icon: '🚌', dur: '约 2.5–3 小时' },
        to: { code: 'Melaka Sentral', sub: '马六甲中央车站' },
        note: '去程尽量不打车：Bukit Bintang → Monorail Hang Tuah → LRT Bandar Tasik Selatan，走连接通道到 TBS，再乘巴士到 Melaka Sentral。回程从 Melaka Sentral 回 TBS，再根据时间选择公共交通或直接 Grab 回 MOV。两段巴士都建议提前网上买票。'
      },
      spots: [
        { time: '06:30', type: 'hotel', emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur',
          note: '早餐：椰浆饭，行李寄存前台', lat: 3.1462, lng: 101.7097,
          address: 'Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur',
          duration: '—', openingHours: '—', ticket: '无',
          tips: ['行李寄存前台','轻装前往马六甲'],
          next: { mode: 'transit', text: '步行至 Bukit Bintang 站 → Monorail 至 Hang Tuah → 换 LRT 至 Bandar Tasik Selatan → 走连接通道进入 TBS' }
        },
        { time: '08:30', type: 'transit', emoji: '🚌', zh: 'TBS 南湖镇车站', en: 'Terminal Bersepadu Selatan',
          note: '搭乘提前购买的长途巴士前往马六甲', lat: 3.0750, lng: 101.7110,
          address: 'Bandar Tasik Selatan, 57100 Kuala Lumpur',
          duration: '约 2.5–3 小时', openingHours: '—', ticket: '提前购票',
          tips: ['建议至少提前 20–30 分钟到站','确认目的地为 Melaka Sentral'],
          next: { mode: 'transit', text: '长途巴士前往 Melaka Sentral（约 2.5–3 小时）' }
        },
        { time: '11:00', type: 'transit', emoji: '🚏', zh: 'Melaka Sentral 马六甲中央车站', en: 'Melaka Sentral',
          note: '到站后搭 Grab 进入 Dutch Square', lat: 2.2207, lng: 102.2507,
          address: 'Jalan Tun Abdul Razak, 75400 Melaka',
          duration: '约 15–20 分钟', openingHours: '—', ticket: '—',
          tips: ['回程也从这里搭巴士回 TBS','不要把车站和古城步行区混淆'],
          next: { mode: 'grab', text: 'Grab 前往 Dutch Square 红屋广场（约 15–20 分钟）' }
        },
        { time: '11:30', type: 'attraction', emoji: '🏛️', zh: '马六甲红屋', en: 'Dutch Square / The Stadthuys',
          note: '荷兰广场历史核心', lat: 2.1940, lng: 102.2490,
          address: 'Jalan Kota, Bandar Hilir, 75000 Malacca',
          duration: '约 40 分钟', openingHours: '约 09:00 – 17:30', ticket: '广场免费， Stadthuys 博物馆约 RM 10',
          tips: ['标志性红色建筑','广场中央有维多利亚女王喷泉'],
          next: { mode: 'walk', text: '步行（约 3 分钟）' }
        },
        { time: '13:00', type: 'attraction', emoji: '⛪', zh: '圣保罗山', en: "St. Paul's Hill Melaka",
          note: '俯瞰古城', lat: 2.1935, lng: 102.2495,
          address: 'Jalan Kota, Bandar Hilir, 75000 Malacca',
          duration: '约 40 分钟', openingHours: '全天', ticket: '无',
          tips: ['山顶可俯瞰马六甲全城','下山顺路看 A Famosa 遗门'],
          next: { mode: 'walk', text: '步行至峇峇娘惹祖屋（约 8 分钟）' }
        },
        { time: '13:50', type: 'attraction', emoji: '🏠', zh: '峇峇娘惹祖屋', en: 'Baba & Nyonya Heritage Museum',
          note: '可选/推荐（太累可删）', lat: 2.1956, lng: 102.2462,
          address: '48-50, Jalan Tun Tan Cheng Lock, 75200 Malacca',
          duration: '约 55 分钟', openingHours: '10:00 – 16:15（周一关闭）', ticket: '约 RM 18',
          tips: ['需跟随导览','内部禁止拍照','前一晚睡不好可现场删（已有国家博物馆）'],
          next: { mode: 'walk', text: '步行至 Cendol / 咖啡休息（约 5 分钟）' }
        },
        { time: '15:15', type: 'attraction', emoji: '🛕', zh: '青云亭', en: 'Cheng Hoon Teng Temple',
          note: '马来西亚最古老华人寺庙', lat: 2.1955, lng: 102.2464,
          address: '25, Jalan Tokong, 75200 Malacca',
          duration: '约 25 分钟', openingHours: '约 07:00 – 19:00', ticket: '无',
          tips: ['建筑精美，可静静参观'],
          next: { mode: 'walk', text: '步行至游船码头（约 5 分钟）' }
        },
        { time: '16:00', type: 'attraction', emoji: '🛶', zh: '马六甲河游船', en: 'Melaka River Cruise',
          image: 'img/melaka-river.webp', imageAlt: 'Melaka River Cruise at night',
          imageCredit: 'Melaka River Cruise official website', imageSource: 'https://melakarivercruise.my/',
          note: '傍晚场次光线较好', lat: 2.1944, lng: 102.2468,
          address: 'Jalan Persisiran Bunga Raya, 75100 Malacca',
          duration: '约 50 分钟', openingHours: '约 09:00 – 22:30', ticket: '约 RM 30（成人）',
          tips: ['沿河可看到彩色壁画建筑'],
          next: { mode: 'walk', text: '咖啡馆 / 休息（17:00–17:50）' }
        },
        { time: '18:00', type: 'food', emoji: '🏮', zh: '鸡场街夜市', en: 'Jonker Street Night Market',
          note: '周末夜市（今晚是周日，晚餐直接解决）', lat: 2.1967, lng: 102.2460,
          address: 'Jalan Hang Jebat, 75200 Malacca',
          duration: '约 1 小时 40 分钟', openingHours: '周五至周日 约 18:00 – 00:00', ticket: '无',
          tips: ['推荐：Laksa、鸡饭粒、沙爹、小吃、Cendol','今晚是全程最晚一天'],
          next: { mode: 'transit', text: '19:45 左右离开鸡场街 → Grab 到 Melaka Sentral（约 15–20 分钟）→ 20:30–21:00 搭提前买好的晚班巴士到 TBS（约 2–2.5 小时）→ 若公共交通仍运行，Bandar Tasik Selatan → Hang Tuah → Bukit Bintang；太晚则 TBS 直接 Grab 回 MOV，预计 23:30 左右到酒店' }
        }
      ],
      restaurants: [
        { meal: 'breakfast', time: '约 07:00',
          name: '椰浆饭', zhName: '椰浆饭',
          cuisine: '马来西亚', tags: ['Local'],
          recommendedDishes: ['Nasi Lemak'],
          pricePerPerson: 'RM 5–10', openingHours: '—',
          distanceFromPrev: '酒店附近',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=nasi+lemak+bukit+bintang',
          backup: { name: 'TBS 便利店', zhName: 'TBS 便利店', note: '上车前简单解决' }
        },
        { meal: 'lunch', time: '约 12:25',
          name: '娘惹菜午餐', zhName: '娘惹菜',
          cuisine: 'Nyonya / Peranakan', tags: ['Halal-friendly', 'Local'],
          recommendedDishes: ['Nyonya Laksa','Ayam Pongteh','Otak-otak'],
          pricePerPerson: 'RM 15–25', openingHours: '—',
          distanceFromPrev: '红屋附近',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nyonya+restaurant+Melaka',
          backup: { name: 'Peranakan Place', zhName: 'Peranakan Place', note: '空调座位' }
        },
        { meal: 'snack', time: '约 14:35',
          name: 'Cendol 甜品店', zhName: '煎蕊甜品',
          cuisine: '甜品', tags: ['Dessert'],
          recommendedDishes: ['Cendol Gula Melaka','Ais Kacang'],
          pricePerPerson: 'RM 5–8', openingHours: '—',
          distanceFromPrev: '圣保罗山附近',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=cendol+melaka',
          backup: { name: '任意 Cendol 摊位', zhName: '任意煎蕊摊', note: '街头随处可见' }
        },
        { meal: 'dinner', time: '约 18:00',
          name: '鸡场街夜市', zhName: '鸡场街夜市',
          cuisine: '街头美食', tags: ['Street Food', 'Weekend Only'],
          recommendedDishes: ['Laksa','鸡饭粒','沙爹','小吃','Cendol'],
          pricePerPerson: 'RM 15–30', openingHours: '周五至周日 约 18:00 – 00:00',
          distanceFromPrev: '步行过桥（从游船码头）',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jonker+Street+Night+Market+Melaka',
          backup: { name: 'Jonker Kitchen', zhName: 'Jonker Kitchen', note: '空调座位有限' }
        }
      ]
    },
    {
      id: 4, num: '05', date: '05 October', weekday: 'Monday',
      title: 'Zoo Negara × Lexis Hibiscus', theme: '动物园 → 波德申海边度假', intensity: 4,
      summary: { spots: 5, walks: '约 2 km', grabs: 1, budget: 'RM 180–260 / 人（含包车）' },
      transport: {
        mode: '🚗 Private Transfer / 包车', tag: '全天交通',
        from: { code: 'MOV Hotel', sub: '退房，行李放车上' },
        mid: { icon: '🚗', dur: '动物园约 30 分钟 / 波德申约 2–2.5 小时' },
        to: { code: 'Lexis Hibiscus', sub: '波德申海边度假村' },
        note: 'Day 4 建议包车：MOV 退房 → Zoo Negara → Lexis Hibiscus，行李全程放车上。这是用钱换舒适度的一天。黑风洞已安排在 Day 2，不再重复绕路。'
      },
      spots: [
        { time: '08:30', type: 'hotel', emoji: '🏨', zh: 'MOV Hotel', en: 'MOV Hotel Kuala Lumpur',
          note: '早餐 + 收行李 + 退房（行李放车上）', lat: 3.1462, lng: 101.7097,
          address: 'Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur',
          duration: '约 30 分钟', openingHours: '退房 12:00', ticket: '无',
          tips: ['08:15–08:30 起床；08:30–09:00 早餐；09:00–09:25 收拾行李；09:30 Check-out','行李放包车上'],
          next: { mode: 'grab', text: '包车前往 Zoo Negara（约 30 分钟）' }
        },
        { time: '10:00', type: 'attraction', emoji: '🦁', zh: 'Zoo Negara 国家动物园', en: 'Zoo Negara Malaysia',
          image: 'img/zoo-negara.webp', imageAlt: 'Malayan tiger at Zoo Negara',
          imageCredit: 'Zoo Negara official website', imageSource: 'https://www.zoonegara.my/',
          note: '重点看马来西亚本土动物', lat: 3.2106, lng: 101.7578,
          address: 'Jalan Ulu Kelang, Kemensah Heights, 68000 Ampang, Selangor',
          duration: '约 3 小时', openingHours: '09:00 – 17:00（16:00 最后入场）', ticket: '约 RM 45（成人）+ Tram 约 RM 14.90',
          tips: ['重点看马来虎、马来貘、马来熊、白手长臂猿、犀鸟','建议坐 Tram（RM14.90/人），不要全程纯走','动物园内简单午餐（13:00–13:30）','不用追求全园刷完'],
          next: { mode: 'grab', text: '包车前往 Lexis Hibiscus Port Dickson（约 2–2.5 小时）' }
        },
        { time: '15:30', type: 'hotel', emoji: '🏨', zh: 'Lexis Hibiscus Port Dickson', en: 'Lexis Hibiscus Port Dickson',
          note: 'Check-in / 放东西 / 洗脸 / 换衣 / 休息', lat: 2.5167, lng: 101.8000,
          address: '12th Mile, Jalan Pantai, 71250 Pasir Panjang, Negeri Sembilan',
          duration: '约 30 分钟', openingHours: '入住 15:00 / 退房 11:00', ticket: '无',
          tips: ['不要一到就冲出去','先洗澡、补水、休息'],
          next: { mode: 'walk', text: '步行至海边/水上别墅区' }
        },
        { time: '16:45', type: 'attraction', emoji: '🏖️', zh: 'Lexis Hibiscus 海边', en: 'Lexis Hibiscus Beach & Resort',
          note: '水上别墅区散步 / 海景 / 泳池 / 日落', lat: 2.5167, lng: 101.8000,
          address: 'Lexis Hibiscus Resort 内',
          duration: '约 2 小时', openingHours: '全天', ticket: '无',
          tips: ['水上别墅区散步','Hibiscus Walk','看日落（17:30–19:10）','拍照'],
          next: { mode: 'walk', text: '步行至酒店餐厅' }
        },
        { time: '19:30', type: 'food', emoji: '🍽️', zh: '酒店晚餐', en: 'Lexis Hibiscus Dinner',
          note: 'Wave Dining / Satellite Restaurant & Bar', lat: 2.5167, lng: 101.8000,
          address: 'Lexis Hibiscus Resort 内',
          duration: '约 1 小时 20 分钟', openingHours: '约 18:00 – 22:00', ticket: '约 RM 60–120 / 人',
          tips: ['第一晚好好享受酒店','如特别想吃本地海鲜可 Grab 出去'],
          next: { mode: 'walk', text: '海边夜间放松后回房' }
        }
      ],
      restaurants: [
        { meal: 'breakfast', time: '约 08:30',
          name: '酒店附近', zhName: '酒店附近',
          cuisine: '轻食', tags: ['Quick'],
          recommendedDishes: ['酒店早餐或附近 Kopitiam'],
          pricePerPerson: 'RM 8–15', openingHours: '—',
          distanceFromPrev: '酒店内或附近',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=breakfast+near+Bukit+Bintang',
          backup: { name: '便利店', zhName: '便利店', note: '7-Eleven / FamilyMart' }
        },
        { meal: 'lunch', time: '约 13:00',
          name: 'Zoo Negara 内餐厅', zhName: '动物园内餐厅',
          cuisine: '简餐', tags: ['Quick', 'In-park'],
          recommendedDishes: ['园内简餐'],
          pricePerPerson: 'RM 10–20', openingHours: '—',
          distanceFromPrev: '动物园内',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Zoo+Negara+restaurant',
          backup: { name: '园内便利店', zhName: '园内便利店', note: '简单解决' }
        },
        { meal: 'dinner', time: '约 19:30',
          name: 'Lexis Hibiscus Wave Dining', zhName: '丽昇酒店餐厅',
          cuisine: '国际/马来西亚', tags: ['Resort', 'Comfortable'],
          recommendedDishes: ['酒店自助/点餐'],
          pricePerPerson: 'RM 60–120', openingHours: '约 18:00 – 22:00',
          distanceFromPrev: '酒店内',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lexis+Hibiscus+Wave+Dining',
          backup: { name: 'Port Dickson 海鲜', zhName: '波德申海鲜', note: 'Grab 外出' }
        }
      ]
    },
    {
      id: 5, num: '06', date: '06 October', weekday: 'Tuesday',
      title: '海边返程', theme: '海边早餐 × 机场返程', intensity: 1,
      summary: { spots: 3, walks: '约 1 km', grabs: 0, budget: 'RM 30–50 / 人' },
      transport: {
        mode: '🚗 酒店机场接送', tag: '机场交通',
        from: { code: 'Lexis Hibiscus', sub: '波德申' },
        mid: { icon: '🚗', dur: '约 60–75 分钟' },
        to: { code: 'KUL T1', sub: '吉隆坡机场第一航站楼' },
        note: '酒店官方提供收费机场接送，需提前联系礼宾部预约。按 60–75 分钟保守规划（官方页面有 30 分钟和 1 小时两种说法，按保守算）。'
      },
      spots: [
        { time: '07:30', type: 'hotel', emoji: '🏨', zh: 'Lexis Hibiscus', en: 'Lexis Hibiscus Port Dickson',
          note: '07:30 起床；08:00–09:00 早餐；09:00–10:00 海边/泳池/Hibiscus Walk；10:00–10:30 洗澡；10:30–10:50 收行李；11:00 Check-out', lat: 2.5167, lng: 101.8000,
          address: '12th Mile, Jalan Pantai, 71250 Pasir Panjang, Negeri Sembilan',
          duration: '约 2 小时', openingHours: '退房 11:00', ticket: '无',
          tips: ['09:00–10:00 海边散步或泳池','10:00–10:30 洗澡','10:30–10:50 收行李','11:00 Check-out'],
          next: { mode: 'transit', text: '酒店机场接送至 KUL T1（约 60–75 分钟）' }
        },
        { time: '12:00', type: 'transit', emoji: '🚗', zh: '前往机场', en: 'To KUL T1',
          note: '酒店机场接送（提前礼宾部预约）', lat: 2.7456, lng: 101.7099,
          address: '64000 Sepang, Selangor',
          duration: '约 60–75 分钟', openingHours: '—', ticket: '酒店收费接送',
          tips: ['11:00 出发，12:00–12:15 到达','距离 15:20 起飞还有约 3 小时'],
          next: { mode: 'transit', text: '值机 / 安检 / 出境' }
        },
        { time: '12:15', type: 'transit', emoji: '🛫', zh: '吉隆坡国际机场 T1', en: 'Kuala Lumpur International Airport T1',
          note: '托运 / 安检 / 午餐 / 伴手礼 / 登机', lat: 2.7456, lng: 101.7099,
          address: '64000 Sepang, Selangor',
          duration: '约 3 小时', openingHours: '24 小时', ticket: '无',
          tips: ['15:20 起飞，20:30 抵达杭州','机场内解决午餐和伴手礼'],
          next: { mode: 'none', text: '' }
        }
      ],
      restaurants: [
        { meal: 'breakfast', time: '约 08:00',
          name: '酒店早餐', zhName: '丽昇酒店早餐',
          cuisine: '酒店自助', tags: ['Resort'],
          recommendedDishes: ['酒店自助早餐'],
          pricePerPerson: '含房费或约 RM 30–50', openingHours: '—',
          distanceFromPrev: '酒店内',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lexis+Hibiscus+breakfast',
          backup: { name: '酒店咖啡厅', zhName: '酒店咖啡厅', note: '简单解决' }
        },
        { meal: 'lunch', time: '约 12:15',
          name: 'KUL T1 机场', zhName: '吉隆坡机场 T1',
          cuisine: '机场美食', tags: ['Mixed'],
          recommendedDishes: ['机场 Food Court','Old Town White Coffee'],
          pricePerPerson: 'RM 20–40', openingHours: '约 06:00 – 23:00',
          distanceFromPrev: '机场内',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=food+court+KLIA+Terminal+1',
          backup: { name: '机场便利店', zhName: '机场便利店', note: '7-Eleven / Starbucks' }
        }
      ]
    }
  ],
  transitNodes: [
    { name: 'TBS 南湖镇车站', lat: 3.0750, lng: 101.7110, day: 3, type: 'transit' },
    { name: 'Melaka Sentral 马六甲中央车站', lat: 2.2207, lng: 102.2507, day: 3, type: 'transit' }
  ]
};

// Map views and route links share one scope; flight text stays in the itinerary.
TRIP.isMapLocation = function (place) {
  return place.mapVisible !== false && Number.isFinite(place.lat) && Number.isFinite(place.lng) &&
    place.lat >= 1 && place.lat <= 7.5 && place.lng >= 99 && place.lng <= 120;
};
