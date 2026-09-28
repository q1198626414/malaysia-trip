/* Malaysia Trip — single itinerary source */
const TRIP = {
  "meta": {
    "title": "Malaysia Trip",
    "subtitle": "马来西亚五天四夜",
    "dates": "2026.10.02 – 2026.10.06",
    "travelers": 2,
    "durationDays": 5,
    "durationNights": 4,
    "originCity": "杭州",
    "destinationCity": "Kuala Lumpur",
    "heroImageAlt": "Petronas Twin Towers, Kuala Lumpur",
    "heroImageCredit": "Petronas Twin Towers official website"
  },
  "stays": [
    {
      "id": "mov",
      "name": "MOV Hotel Kuala Lumpur",
      "zhName": "MOV Hotel 吉隆坡",
      "dates": "Oct 2 – 5",
      "nights": 3,
      "status": "confirmed",
      "address": "Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur",
      "lat": 3.1462,
      "lng": 101.7097,
      "image": "img/mov-hotel.webp",
      "imageAlt": "MOV Hotel room",
      "imageCredit": "MOV Hotel official website",
      "imageSource": "https://movhotel.com/gallery/",
      "checkIn": "15:00",
      "checkOut": "12:00",
      "nearestMRT": "Bukit Bintang MRT / Monorail Station",
      "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=MOV+Hotel+Kuala+Lumpur"
    },
    {
      "id": "lexis",
      "name": "Lexis Hibiscus Port Dickson",
      "zhName": "丽昇大红花海上度假村",
      "dates": "Oct 5 – 6",
      "nights": 1,
      "status": "confirmed",
      "address": "12th Mile, Jalan Pantai, 71250 Pasir Panjang, Negeri Sembilan",
      "lat": 2.5167,
      "lng": 101.8,
      "image": "img/lexis-hibiscus.webp",
      "imageAlt": "Lexis Hibiscus Port Dickson aerial view",
      "imageCredit": "Lexis Hibiscus official website",
      "imageSource": "https://www.lexishibiscuspd.com/gallery/photo-gallery",
      "checkIn": "15:00",
      "checkOut": "11:00",
      "nearestMRT": "—",
      "airportTransfer": "酒店提供收费机场接送，需提前联系礼宾部预约",
      "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Lexis+Hibiscus+Port+Dickson"
    }
  ],
  "flights": {
    "outbound": {
      "from": "HGH",
      "to": "KUL",
      "date": "2026-10-02",
      "dep": "08:55",
      "arr": "14:20",
      "note": "已购票"
    },
    "inbound": {
      "from": "KUL",
      "to": "HGH",
      "date": "2026-10-06",
      "dep": "15:20",
      "arr": "20:30",
      "note": "已购票"
    }
  },
  "bookings": [
    {
      "name": "Lexis Hibiscus",
      "status": "BOOKED",
      "note": "10/5–10/6，已预订"
    },
    {
      "name": "Petronas Towers 外观",
      "status": "NOT REQUIRED",
      "note": "Ground View / Exterior，免费，不登塔"
    },
    {
      "name": "Melaka Bus",
      "status": "TO BOOK",
      "note": "D3建议去程09:00、返程20:00左右；以实际购票为准"
    },
    {
      "name": "Aquaria KLCC",
      "status": "TO BOOK",
      "note": "10/3 下午，票价与入场规则出发前确认"
    },
    {
      "name": "Zoo Negara",
      "status": "TO BOOK",
      "note": "10/5 上午，票价与开放安排出发前确认"
    },
    {
      "name": "Putra Mosque",
      "status": "NOT REQUIRED",
      "note": "D4计划14:15–15:00；内部开放以现场安排为准"
    },
    {
      "name": "D4 Private Transfer",
      "status": "TO BOOK",
      "note": "MOV → Zoo Negara → Putra Mosque → Lexis Hibiscus"
    },
    {
      "name": "D5 Airport Transfer",
      "status": "TO BOOK",
      "note": "Lexis Hibiscus → KUL T1，提前预约"
    }
  ],
  "days": [
    {
      "id": 1,
      "num": "02",
      "date": "02 October",
      "weekday": "Friday",
      "title": "抵达吉隆坡",
      "theme": "抵达 × 入住 × 夜市",
      "spots": [
        {
          "time": "08:55",
          "type": "transit",
          "emoji": "🛫",
          "zh": "杭州萧山机场 HGH",
          "en": "Hangzhou Xiaoshan Airport",
          "mapVisible": false,
          "note": "起飞",
          "lat": 30.2294,
          "lng": 120.4343,
          "address": "杭州萧山国际机场",
          "duration": "",
          "openingHours": "—",
          "ticket": "已购票",
          "tips": [
            "提前值机",
            "国际航班建议提前 2 小时到达"
          ],
          "next": {
            "mode": "transit",
            "text": "飞行至吉隆坡（约 5.5 小时）"
          },
          "priority": "TRANSPORT",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "14:20–15:30",
          "type": "transit",
          "emoji": "🛬",
          "zh": "吉隆坡国际机场 T1",
          "en": "Kuala Lumpur International Airport T1",
          "note": "抵达，入境 + 取行李 + ATM/换马币",
          "lat": 2.7456,
          "lng": 101.7099,
          "address": "64000 Sepang, Selangor",
          "duration": "约 1–1.5 小时",
          "openingHours": "24 小时",
          "ticket": "无",
          "tips": [
            "提前填好马来西亚入境卡（MDAC）",
            "不要按\"14:20落地14:30出机场\"理想状态排"
          ],
          "next": {
            "mode": "transit",
            "text": "KLIA Ekspres 至 KL Sentral（约 28 分钟），再换 Grab 至酒店"
          },
          "priority": "TRANSPORT",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "16:45–18:00",
          "type": "hotel",
          "emoji": "🏨",
          "zh": "MOV Hotel",
          "en": "MOV Hotel Kuala Lumpur",
          "note": "Check-in / 洗澡 / 充电 / 休息",
          "lat": 3.1462,
          "lng": 101.7097,
          "address": "Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur",
          "duration": "约 1.25 小时",
          "openingHours": "入住 15:00 / 退房 12:00",
          "ticket": "无",
          "tips": [
            "第一天轻松适应",
            "酒店位于 Bukit Bintang 核心区"
          ],
          "next": {
            "mode": "walk",
            "text": "阿罗街晚餐；有余力可先逛 Pavilion"
          },
          "priority": "REST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "18:15–19:00",
          "type": "shopping",
          "emoji": "🛍️",
          "zh": "Pavilion 吉隆坡",
          "en": "Pavilion Kuala Lumpur",
          "note": "轻松走走，熟悉环境",
          "lat": 3.1486,
          "lng": 101.7136,
          "address": "168, Jalan Bukit Bintang, 55100 Kuala Lumpur",
          "duration": "约 45 分钟",
          "openingHours": "10:00 – 22:00",
          "ticket": "无",
          "tips": [
            "第一天只轻松走走",
            "不安排购物任务"
          ],
          "next": {
            "mode": "walk",
            "text": "19:00 左右步行至阿罗街（约 10 分钟）"
          },
          "priority": "OPTIONAL",
          "optional": true,
          "weatherSensitive": false
        },
        {
          "time": "19:00–20:30",
          "type": "food",
          "emoji": "🍜",
          "zh": "阿罗街 · 黄亚华晚餐",
          "en": "Wong Ah Wah Restaurant, Jalan Alor",
          "note": "夜市晚餐",
          "lat": 3.1434,
          "lng": 101.708,
          "address": "Jalan Alor, Bukit Bintang, 50200 Kuala Lumpur",
          "duration": "约 1.5 小时",
          "openingHours": "约 17:00 – 次日 01:00",
          "ticket": "无",
          "tips": [
            "推荐：福建面、沙爹、炒粿条、果汁",
            "两人约 RM40–70",
            "现金为主"
          ],
          "next": {
            "mode": "walk",
            "text": "21:30–22:00 回 MOV；步行约10分钟"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false,
          "navigationName": "Wong Ah Wah Restaurant, Jalan Alor, Kuala Lumpur"
        }
      ],
      "restaurants": [
        {
          "name": "Wong Ah Wah Restaurant",
          "zhName": "黄亚华",
          "recommendedDishes": [
            "烧鸡翅",
            "福建面"
          ],
          "pricePerPerson": "预估 RM30–50 / 人",
          "note": "",
          "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Wong%20Ah%20Wah%20Restaurant%20Jalan%20Alor%20Kuala%20Lumpur"
        }
      ],
      "planB": "Pavilion、榴莲、按摩都可跳过；第一晚优先休息。"
    },
    {
      "id": 2,
      "num": "03",
      "date": "03 October",
      "weekday": "Saturday",
      "title": "吉隆坡",
      "theme": "马来西亚历史 → 华人老城 → 独立历史 → 现代吉隆坡",
      "spots": [
        {
          "time": "07:00–08:00",
          "type": "hotel",
          "emoji": "🏨",
          "zh": "MOV Hotel",
          "en": "MOV Hotel Kuala Lumpur",
          "note": "早餐：咖椰吐司 + 半熟蛋 + 白咖啡",
          "lat": 3.1462,
          "lng": 101.7097,
          "address": "Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur",
          "duration": "约 1 小时",
          "openingHours": "—",
          "ticket": "无",
          "tips": [],
          "next": {
            "mode": "grab",
            "text": "Grab 前往黑风洞（约 30–40 分钟）"
          },
          "priority": "REST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "08:30–09:40",
          "type": "attraction",
          "emoji": "🛕",
          "zh": "黑风洞",
          "en": "Batu Caves",
          "note": "彩虹阶梯 + 印度教圣地；建议控制在约 70 分钟",
          "lat": 3.2374,
          "lng": 101.6839,
          "address": "Gombak, 68100 Batu Caves, Selangor",
          "duration": "约 70 分钟",
          "openingHours": "约 06:00 – 21:00",
          "ticket": "无",
          "tips": [
            "272 级彩虹阶梯",
            "猴子会抢食物",
            "穿长裤/长裙",
            "下雨台阶滑"
          ],
          "next": {
            "mode": "grab",
            "text": "国家博物馆，预留40分钟"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "10:20–11:50",
          "type": "attraction",
          "emoji": "🏛️",
          "zh": "马来西亚国家博物馆",
          "en": "Muzium Negara",
          "note": "确定保留的博物馆",
          "lat": 3.1383,
          "lng": 101.6865,
          "address": "Jalan Damansara, Perdana Botanical Gardens, 50566 Kuala Lumpur",
          "duration": "90分钟",
          "openingHours": "开放时间出发前确认",
          "ticket": "票价出发前确认",
          "tips": [
            "重点：马来半岛早期历史、马六甲苏丹国、殖民史、华人印度人迁移、独立",
            "优先中文自助导览",
            "为明天马六甲做准备"
          ],
          "next": {
            "mode": "transit",
            "text": "MRT → Pasar Seni；含步行候车预留25分钟"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "12:15–13:00",
          "type": "food",
          "emoji": "🍚",
          "zh": "南香鸡饭午餐",
          "en": "Nam Heong Chicken Rice, Jalan Sultan",
          "note": "Pasar Seni 附近",
          "lat": 3.145,
          "lng": 101.696,
          "address": "Pasar Seni 附近",
          "duration": "45分钟",
          "openingHours": "—",
          "ticket": "约 RM 25–40 / 两人",
          "tips": [
            "午餐后前往茨厂街"
          ],
          "next": {
            "mode": "walk",
            "text": "步行至茨厂街"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false,
          "navigationName": "Nam Heong Chicken Rice 56 Jalan Sultan Kuala Lumpur"
        },
        {
          "time": "13:00–13:20",
          "type": "attraction",
          "emoji": "🏮",
          "zh": "茨厂街",
          "en": "Petaling Street / Chinatown",
          "note": "唐人街街区",
          "lat": 3.144,
          "lng": 101.697,
          "address": "Jalan Petaling, City Centre, 50000 Kuala Lumpur",
          "duration": "20分钟",
          "openingHours": "约 08:00 – 22:00",
          "ticket": "无",
          "tips": [
            "著名牌坊和遮阳棚"
          ],
          "next": {
            "mode": "walk",
            "text": "步行（约 3 分钟）"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "13:25–13:35",
          "type": "attraction",
          "emoji": "🏮",
          "zh": "鬼仔巷",
          "en": "Kwai Chai Hong",
          "note": "壁画与老街空间",
          "lat": 3.1446,
          "lng": 101.6982,
          "address": "Lorong Panggung, City Centre, 50000 Kuala Lumpur",
          "duration": "10分钟",
          "openingHours": "全天",
          "ticket": "无",
          "tips": [
            "多幅创意壁画适合拍照"
          ],
          "next": {
            "mode": "walk",
            "text": "步行至中央艺术坊（约 5 分钟）"
          },
          "priority": "PASS-BY / QUICK STOP",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "13:45–14:10",
          "type": "attraction",
          "emoji": "🎨",
          "zh": "中央艺术坊",
          "en": "Central Market Kuala Lumpur",
          "note": "天热/下雨时的室内缓冲",
          "lat": 3.1468,
          "lng": 101.6957,
          "address": "Jalan Hang Kasturi, City Centre, 50050 Kuala Lumpur",
          "duration": "25分钟",
          "openingHours": "10:00 – 21:30",
          "ticket": "无",
          "tips": [
            "二楼 Precious Old China 是知名娘惹餐厅",
            "适合买手信"
          ],
          "next": {
            "mode": "walk",
            "text": "步行至独立广场（约 8 分钟）"
          },
          "priority": "PASS-BY / QUICK STOP",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "14:20–14:40",
          "type": "attraction",
          "emoji": "🏛️",
          "zh": "独立广场",
          "en": "Merdeka Square",
          "note": "独立历史地标",
          "lat": 3.1478,
          "lng": 101.6932,
          "address": "Jalan Raja, City Centre, 50050 Kuala Lumpur",
          "duration": "20分钟",
          "openingHours": "全天",
          "ticket": "无",
          "tips": [
            "世界最高旗杆（95 米）",
            "对面是苏丹阿都沙末大厦"
          ],
          "next": {
            "mode": "grab",
            "text": "MOV，预留20分钟"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "15:00–16:15",
          "type": "hotel",
          "emoji": "🏨",
          "zh": "MOV Hotel",
          "en": "MOV Hotel Kuala Lumpur",
          "note": "酒店休息 / 洗澡 / 换衣 / 空调 / 补水（必须保留）",
          "lat": 3.1462,
          "lng": 101.7097,
          "address": "Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur",
          "duration": "75分钟",
          "openingHours": "—",
          "ticket": "无",
          "tips": [
            "避开正午高温",
            "休整后再出发"
          ],
          "next": {
            "mode": "grab",
            "text": "Aquaria KLCC 入口，预留45分钟"
          },
          "priority": "REST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "17:00–18:30",
          "type": "attraction",
          "emoji": "🐠",
          "zh": "Aquaria KLCC 水族馆",
          "en": "Aquaria KLCC",
          "note": "马来西亚 / 东南亚水生生态系统；重点看绿海龟、大石斑鱼、海鳗、竹鲨、鲎、射水鱼、弹涂鱼与水下隧道",
          "lat": 3.1534,
          "lng": 101.7133,
          "address": "Kuala Lumpur Convention Centre, Jalan Pinang, 50088 Kuala Lumpur",
          "duration": "90分钟",
          "openingHours": "10:00–20:00（最后入场时间出发前确认）",
          "ticket": "需购票，价格与规则出发前确认",
          "tips": [
            "室内景点，天气不好时作为 D2 核心活动",
            "重点看 underwater tunnel 与 Malaysian / Southeast Asian aquatic ecosystem"
          ],
          "next": {
            "mode": "walk",
            "text": "步行至 KLCC Park（约 5 分钟）"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "18:35–19:00",
          "type": "attraction",
          "emoji": "🌳",
          "zh": "KLCC Park",
          "en": "KLCC Park",
          "note": "短暂散步与休息",
          "lat": 3.1548,
          "lng": 101.712,
          "address": "Kuala Lumpur City Centre, 50088 Kuala Lumpur",
          "duration": "25分钟",
          "openingHours": "—",
          "ticket": "免费",
          "tips": [
            "不安排额外路线",
            "天气不好可缩短停留"
          ],
          "next": {
            "mode": "walk",
            "text": "步行至双子塔外部拍照点（约 5 分钟）"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "19:05–19:30",
          "type": "attraction",
          "emoji": "🌉",
          "zh": "双子塔外观",
          "en": "Petronas Twin Towers Exterior",
          "image": "img/petronas-towers.webp",
          "imageAlt": "Petronas Twin Towers skyline",
          "imageCredit": "Petronas Twin Towers official website",
          "imageSource": "https://www.petronastwintowers.com.my/",
          "note": "Ground View / Exterior 外部拍照；不登塔、不需要门票",
          "lat": 3.158,
          "lng": 101.7116,
          "address": "Kuala Lumpur City Centre, 50088 Kuala Lumpur",
          "duration": "25分钟",
          "openingHours": "外部全天可见",
          "ticket": "FREE / 不需要票",
          "tips": [
            "只拍外观",
            "Ground View 免费停留即可"
          ],
          "next": {
            "mode": "walk",
            "text": "Suria KLCC 晚餐；21:00–21:30 回 MOV（Grab）"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        }
      ],
      "restaurants": [
        {
          "name": "Nam Heong Chicken Rice, Jalan Sultan",
          "zhName": "南香鸡饭",
          "recommendedDishes": [
            "海南鸡饭",
            "芽菜"
          ],
          "pricePerPerson": "预估 RM20–35 / 人",
          "note": "",
          "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Nam%20Heong%20Chicken%20Rice%2056%20Jalan%20Sultan%20Kuala%20Lumpur"
        },
        {
          "name": "Madam Kwan’s, Suria KLCC",
          "zhName": "Madam Kwan’s KLCC",
          "recommendedDishes": [
            "椰浆饭",
            "Nasi Bojari"
          ],
          "pricePerPerson": "预估 RM40–65 / 人",
          "note": "",
          "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Madam%20Kwans%20Suria%20KLCC"
        }
      ],
      "planB": "优先保留酒店休息；老城逛慢了可跳过鬼仔巷。水族馆以实际票面时段为准。"
    },
    {
      "id": 3,
      "num": "04",
      "date": "04 October",
      "weekday": "Sunday",
      "title": "马六甲",
      "theme": "马六甲文化一日游（最累一天）",
      "spots": [
        {
          "time": "06:30–07:30",
          "type": "hotel",
          "emoji": "🏨",
          "zh": "MOV Hotel",
          "en": "MOV Hotel Kuala Lumpur",
          "note": "早餐：椰浆饭，行李寄存前台",
          "lat": 3.1462,
          "lng": 101.7097,
          "address": "Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur",
          "duration": "60分钟",
          "openingHours": "—",
          "ticket": "无",
          "tips": [
            "行李寄存前台",
            "轻装前往马六甲"
          ],
          "next": {
            "mode": "grab",
            "text": "TBS，预留45分钟；至少提前30分钟到站"
          },
          "priority": "REST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "09:00",
          "type": "transit",
          "emoji": "🚌",
          "zh": "TBS 南湖镇车站",
          "en": "Terminal Bersepadu Selatan",
          "note": "建议班次，待订票确认",
          "lat": 3.075,
          "lng": 101.711,
          "address": "Bandar Tasik Selatan, 57100 Kuala Lumpur",
          "duration": "",
          "openingHours": "—",
          "ticket": "提前购票",
          "tips": [
            "建议至少提前 20–30 分钟到站",
            "确认目的地为 Melaka Sentral"
          ],
          "next": {
            "mode": "transit",
            "text": "巴士 → Melaka Sentral，预估2.5–3小时"
          },
          "priority": "TRANSPORT",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "11:30–12:00",
          "type": "transit",
          "emoji": "🚏",
          "zh": "Melaka Sentral 马六甲中央车站",
          "en": "Melaka Sentral",
          "note": "到站后搭 Grab 进入 Dutch Square",
          "lat": 2.2207,
          "lng": 102.2507,
          "address": "Jalan Tun Abdul Razak, 75400 Melaka",
          "duration": "",
          "openingHours": "—",
          "ticket": "—",
          "tips": [
            "回程也从这里搭巴士回 TBS",
            "不要把车站和古城步行区混淆"
          ],
          "next": {
            "mode": "grab",
            "text": "红屋广场，预留30分钟"
          },
          "priority": "TRANSPORT",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "12:30–13:00",
          "type": "attraction",
          "emoji": "🏛️",
          "zh": "马六甲红屋",
          "en": "Dutch Square / The Stadthuys",
          "note": "荷兰广场历史核心",
          "lat": 2.194,
          "lng": 102.249,
          "address": "Jalan Kota, Bandar Hilir, 75000 Malacca",
          "duration": "30分钟",
          "openingHours": "约 09:00 – 17:30",
          "ticket": "广场免费， Stadthuys 博物馆约 RM 10",
          "tips": [
            "标志性红色建筑",
            "广场中央有维多利亚女王喷泉"
          ],
          "next": {
            "mode": "walk",
            "text": "附近午餐；14:00前往圣保罗山"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "14:00–14:30",
          "type": "attraction",
          "emoji": "⛪",
          "zh": "圣保罗山",
          "en": "St. Paul's Hill Melaka",
          "note": "俯瞰古城",
          "lat": 2.1935,
          "lng": 102.2495,
          "address": "Jalan Kota, Bandar Hilir, 75000 Malacca",
          "duration": "30分钟",
          "openingHours": "全天",
          "ticket": "无",
          "tips": [
            "山顶可俯瞰马六甲全城",
            "下山顺路看 A Famosa 遗门"
          ],
          "next": {
            "mode": "walk",
            "text": "峇峇娘惹祖屋，预留15分钟"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "14:45–15:30",
          "type": "attraction",
          "emoji": "🏠",
          "zh": "峇峇娘惹祖屋",
          "en": "Baba & Nyonya Heritage Museum",
          "note": "可选/推荐（太累可删）",
          "lat": 2.1956,
          "lng": 102.2462,
          "address": "48-50, Jalan Tun Tan Cheng Lock, 75200 Malacca",
          "duration": "45分钟",
          "openingHours": "开放时间与导览场次出发前确认",
          "ticket": "票价出发前确认",
          "tips": [
            "需跟随导览",
            "内部禁止拍照",
            "前一晚睡不好可现场删（已有国家博物馆）"
          ],
          "next": {
            "mode": "walk",
            "text": "Jonker 88 甜品 / 休息，预留45分钟"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "16:15–16:40",
          "type": "attraction",
          "emoji": "🛕",
          "zh": "青云亭",
          "en": "Cheng Hoon Teng Temple",
          "note": "马来西亚最古老华人寺庙",
          "lat": 2.1955,
          "lng": 102.2464,
          "address": "25, Jalan Tokong, 75200 Malacca",
          "duration": "25分钟",
          "openingHours": "约 07:00 – 19:00",
          "ticket": "无",
          "tips": [
            "建筑精美，可静静参观"
          ],
          "next": {
            "mode": "walk",
            "text": "自由休息；18:00 鸡场街夜市"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "有余力再去",
          "type": "attraction",
          "emoji": "🛶",
          "zh": "马六甲河游船",
          "en": "Melaka River Cruise",
          "image": "img/melaka-river.webp",
          "imageAlt": "Melaka River Cruise at night",
          "imageCredit": "Melaka River Cruise official website",
          "imageSource": "https://melakarivercruise.my/",
          "note": "傍晚场次光线较好",
          "lat": 2.1944,
          "lng": 102.2468,
          "address": "Jalan Persisiran Bunga Raya, 75100 Malacca",
          "duration": "约50分钟",
          "openingHours": "场次与开放时间出发前确认",
          "ticket": "票价出发前确认",
          "tips": [
            "沿河可看到彩色壁画建筑"
          ],
          "next": {
            "mode": "none",
            "text": ""
          },
          "priority": "OPTIONAL",
          "optional": true,
          "weatherSensitive": false
        },
        {
          "time": "18:00–19:00",
          "type": "food",
          "emoji": "🏮",
          "zh": "鸡场街夜市",
          "en": "Jonker Street Night Market",
          "note": "周末夜市（今晚是周日，晚餐直接解决）",
          "lat": 2.1967,
          "lng": 102.246,
          "address": "Jalan Hang Jebat, 75200 Malacca",
          "duration": "60分钟",
          "openingHours": "周末夜市时间出发前确认",
          "ticket": "无",
          "tips": [
            "推荐：Laksa、鸡饭粒、沙爹、小吃、Cendol",
            "今晚是全程最晚一天"
          ],
          "next": {
            "mode": "grab",
            "text": "19:00 → Melaka Sentral，预留30分钟；提前30分钟候车"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "20:00 左右",
          "type": "transit",
          "emoji": "🚏",
          "zh": "马六甲返程巴士",
          "en": "Melaka Sentral",
          "note": "建议班次，待订票确认",
          "lat": 2.2207,
          "lng": 102.2507,
          "address": "Jalan Tun Abdul Razak, 75400 Melaka",
          "duration": "",
          "openingHours": "—",
          "ticket": "—",
          "tips": [
            "回程也从这里搭巴士回 TBS",
            "不要把车站和古城步行区混淆"
          ],
          "next": {
            "mode": "transit",
            "text": "巴士 → TBS；下车后 Grab → MOV，预计23:00–00:00到酒店（视路况）"
          },
          "priority": "TRANSPORT",
          "optional": false,
          "weatherSensitive": false
        }
      ],
      "restaurants": [
        {
          "name": "Jonker 88",
          "zhName": "Jonker 88",
          "recommendedDishes": [
            "Cendol 煎蕊",
            "Nyonya Laksa"
          ],
          "pricePerPerson": "预估 RM10–25 / 人",
          "note": "顺路甜品；排队超过20分钟换附近店。",
          "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Jonker%2088%20Melaka"
        },
        {
          "name": "Nancy’s Kitchen",
          "zhName": "Nancy’s Kitchen（备选）",
          "recommendedDishes": [
            "Ayam Pongteh",
            "Popiah"
          ],
          "pricePerPerson": "预估 RM40–70 / 人",
          "note": "需额外打车；选择它就压缩下午景点。",
          "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Nancys%20Kitchen%20Jalan%20KL%203%2F8%20Melaka"
        }
      ],
      "planB": "巴士以实际订票为准。晚点则缩短老城停留、跳过游船；回程时间不保证，TBS 下车直接 Grab。",
      "returnPlans": []
    },
    {
      "id": 4,
      "num": "05",
      "date": "05 October",
      "weekday": "Monday",
      "title": "动物园 · 布城 · 海边",
      "theme": "动物园 → 粉红清真寺 → 波德申海边度假",
      "spots": [
        {
          "time": "08:15–09:30",
          "type": "hotel",
          "emoji": "🏨",
          "zh": "MOV Hotel",
          "en": "MOV Hotel Kuala Lumpur",
          "note": "早餐 + 收行李 + 退房（行李放车上）",
          "lat": 3.1462,
          "lng": 101.7097,
          "address": "Jalan Berangan, Bukit Bintang, 50200 Kuala Lumpur",
          "duration": "75分钟",
          "openingHours": "退房 12:00",
          "ticket": "无",
          "tips": [
            "08:15–08:30 起床；08:30–09:00 早餐；09:00–09:25 收拾行李；09:30 Check-out",
            "行李放包车上"
          ],
          "next": {
            "mode": "grab",
            "text": "09:30包车出发 → Zoo Negara，预留45分钟"
          },
          "priority": "REST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "10:15–12:45",
          "type": "attraction",
          "emoji": "🦁",
          "zh": "Zoo Negara 国家动物园",
          "en": "Zoo Negara Malaysia",
          "image": "img/zoo-negara.webp",
          "imageAlt": "Malayan tiger at Zoo Negara",
          "imageCredit": "Zoo Negara official website",
          "imageSource": "https://www.zoonegara.my/",
          "note": "重点看马来西亚本土动物",
          "lat": 3.2106,
          "lng": 101.7578,
          "address": "Jalan Ulu Kelang, Kemensah Heights, 68000 Ampang, Selangor",
          "duration": "150分钟",
          "openingHours": "开放时间与最后入场出发前确认",
          "ticket": "门票与 Tram 规则出发前确认",
          "tips": [
            "重点看马来虎、马来貘、马来熊、白手长臂猿、犀鸟",
            "建议坐 Tram（RM14.90/人），不要全程纯走",
            "动物园内简单午餐（13:00–13:30）",
            "不用追求全园刷完"
          ],
          "next": {
            "mode": "grab",
            "text": "12:45午餐；13:15出发 → 粉红清真寺，预留60分钟"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": true
        },
        {
          "time": "14:15–15:00",
          "type": "attraction",
          "emoji": "🕌",
          "zh": "粉红清真寺",
          "en": "Putra Mosque, Putrajaya",
          "note": "粉红清真寺 + 布特拉广场，短暂停留拍照",
          "lat": 2.9366,
          "lng": 101.6917,
          "address": "Putrajaya, Malaysia",
          "duration": "45分钟",
          "openingHours": "出发前确认游客开放时间",
          "ticket": "免费",
          "tips": [
            "只看粉红清真寺与布特拉广场，不扩展布城路线",
            "进入清真寺按现场服装要求执行"
          ],
          "next": {
            "mode": "grab",
            "text": "Lexis Hibiscus，预留90–120分钟；若到清真寺已晚于15:00则跳过"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "16:30–17:00 抵达",
          "type": "hotel",
          "emoji": "🏨",
          "zh": "Lexis Hibiscus Port Dickson",
          "en": "Lexis Hibiscus Port Dickson",
          "note": "Check-in / 放东西 / 洗脸 / 换衣 / 休息",
          "lat": 2.5167,
          "lng": 101.8,
          "address": "12th Mile, Jalan Pantai, 71250 Pasir Panjang, Negeri Sembilan",
          "duration": "",
          "openingHours": "入住 15:00 / 退房 11:00",
          "ticket": "无",
          "tips": [
            "不要一到就冲出去",
            "先洗澡、补水、休息"
          ],
          "next": {
            "mode": "walk",
            "text": "入住、休息后在度假村自由活动"
          },
          "priority": "REST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "17:30–19:00",
          "type": "attraction",
          "emoji": "🏖️",
          "zh": "Lexis Hibiscus 海边",
          "en": "Lexis Hibiscus Beach & Resort",
          "note": "水上别墅区散步 / 海景 / 泳池 / 日落",
          "lat": 2.5167,
          "lng": 101.8,
          "address": "Lexis Hibiscus Resort 内",
          "duration": "90分钟",
          "openingHours": "全天",
          "ticket": "无",
          "tips": [
            "水上别墅区散步",
            "Hibiscus Walk",
            "看日落（17:30–19:10）",
            "拍照"
          ],
          "next": {
            "mode": "walk",
            "text": "步行至酒店餐厅"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "19:30–20:45",
          "type": "food",
          "emoji": "🍽️",
          "zh": "酒店晚餐",
          "en": "Lexis Hibiscus Dinner",
          "note": "Wave Dining / Satellite Restaurant & Bar",
          "lat": 2.5167,
          "lng": 101.8,
          "address": "Lexis Hibiscus Resort 内",
          "duration": "75分钟",
          "openingHours": "约 18:00 – 22:00",
          "ticket": "约 RM 60–120 / 人",
          "tips": [
            "第一晚好好享受酒店",
            "如特别想吃本地海鲜可 Grab 出去"
          ],
          "next": {
            "mode": "walk",
            "text": "回房休息"
          },
          "priority": "MUST",
          "optional": false,
          "weatherSensitive": false
        }
      ],
      "restaurants": [
        {
          "name": "Roselle Coffee House, Lexis Hibiscus",
          "zhName": "酒店餐厅",
          "recommendedDishes": [
            "当地菜肴",
            "当日自助或点餐"
          ],
          "pricePerPerson": "预算 RM60–120 / 人",
          "note": "菜单、餐厅营业与餐费以酒店当天为准。",
          "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Roselle%20Coffee%20House%20Lexis%20Hibiscus"
        }
      ],
      "planB": "所有车程为规划余量。清真寺内部以当天游客开放安排为准；暂停参观则看外观和广场。"
    },
    {
      "id": 5,
      "num": "06",
      "date": "06 October",
      "weekday": "Tuesday",
      "title": "酒店 · 机场",
      "theme": "海边早餐 × 机场返程",
      "spots": [
        {
          "time": "08:30–10:30",
          "type": "hotel",
          "emoji": "🏨",
          "zh": "Lexis Hibiscus",
          "en": "Lexis Hibiscus Port Dickson",
          "note": "早餐、休息、收行李；10:30准备退房",
          "lat": 2.5167,
          "lng": 101.8,
          "address": "12th Mile, Jalan Pantai, 71250 Pasir Panjang, Negeri Sembilan",
          "duration": "120分钟",
          "openingHours": "退房 11:00",
          "ticket": "无",
          "tips": [
            "10:30准备退房",
            "11:00机场接送"
          ],
          "next": {
            "mode": "walk",
            "text": "10:30退房准备；11:00酒店接送出发"
          },
          "priority": "REST",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "11:00–12:15",
          "type": "transit",
          "emoji": "🚗",
          "zh": "前往机场",
          "en": "To KUL T1",
          "note": "酒店机场接送（提前礼宾部预约）",
          "lat": 2.7456,
          "lng": 101.7099,
          "address": "64000 Sepang, Selangor",
          "duration": "约 60–75 分钟",
          "openingHours": "—",
          "ticket": "酒店收费接送",
          "tips": [
            "11:00 出发，12:00–12:15 到达",
            "距离 15:20 起飞还有约 3 小时"
          ],
          "next": {
            "mode": "transit",
            "text": "值机 / 安检 / 出境"
          },
          "priority": "TRANSPORT",
          "optional": false,
          "weatherSensitive": false
        },
        {
          "time": "12:15–15:20",
          "type": "transit",
          "emoji": "🛫",
          "zh": "吉隆坡国际机场 T1",
          "en": "Kuala Lumpur International Airport T1",
          "note": "托运 / 安检 / 午餐 / 伴手礼 / 登机",
          "lat": 2.7456,
          "lng": 101.7099,
          "address": "64000 Sepang, Selangor",
          "duration": "约 3 小时",
          "openingHours": "24 小时",
          "ticket": "无",
          "tips": [
            "15:20 起飞，20:30 抵达杭州",
            "机场内解决午餐和伴手礼"
          ],
          "next": {
            "mode": "none",
            "text": ""
          },
          "priority": "TRANSPORT",
          "optional": false,
          "weatherSensitive": false
        }
      ],
      "restaurants": [
        {
          "name": "Lexis Hibiscus Port Dickson",
          "zhName": "酒店早餐",
          "recommendedDishes": [
            "早餐自助",
            "咖啡 / 水果"
          ],
          "pricePerPerson": "以房价所含早餐为准",
          "note": "",
          "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Lexis%20Hibiscus%20Port%20Dickson"
        }
      ],
      "planB": "Lexis → KUL T1 必须提前预约酒店机场接送，不依赖当天临时 Grab。"
    }
  ],
  "transitNodes": [
    {
      "name": "TBS 南湖镇车站",
      "lat": 3.075,
      "lng": 101.711,
      "day": 3,
      "type": "transit"
    },
    {
      "name": "Melaka Sentral 马六甲中央车站",
      "lat": 2.2207,
      "lng": 102.2507,
      "day": 3,
      "type": "transit"
    }
  ]
};

// Map views and route links share one scope; flight text stays in the itinerary.
TRIP.isMapLocation = function (place) {
  return place.mapVisible !== false && Number.isFinite(place.lat) && Number.isFinite(place.lng) &&
    place.lat >= 1 && place.lat <= 7.5 && place.lng >= 99 && place.lng <= 120;
};
