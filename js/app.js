/* ===== Malaysia Trip 交互逻辑（行程由 data.js 渲染） ===== */
(function () {
  'use strict';

  var TAB_KEY = 'mt_tab';
  var CHECKED_KEY = 'mt_checked';
  var NUMS = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];

  function mapsPlace(lat, lng) {
    return 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng;
  }
  function mapsDirTo(lat, lng) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function imgOnError() {
    return 'onerror="this.style.display=\'none\';this.parentElement.classList.add(\'img-fallback\')"';
  }

  /* ---------- 渲染酒店卡片 ---------- */
  function renderHotel() {
    var h = TRIP.hotel;
    return (
      '<article class="hotel-card" id="hotelCard">' +
        '<div class="hotel-img-wrap">' +
          '<img src="' + h.image + '" alt="' + esc(h.imageAlt) + '" loading="lazy" ' + imgOnError() + '>' +
        '</div>' +
        '<div class="hotel-body">' +
          '<h2 class="hotel-name">🏨 ' + esc(h.zhName) + '</h2>' +
          '<p class="hotel-addr">' + esc(h.address) + '</p>' +
          '<div class="hotel-meta">' +
            '<span>入住 ' + h.checkIn + '</span><span>退房 ' + h.checkOut + '</span>' +
            '<span>最近 MRT：' + h.nearestMRT + '</span>' +
          '</div>' +
          '<div class="hotel-btns">' +
            '<a class="mini-btn" target="_blank" rel="noopener" href="' + h.googleMapsUrl + '">📍 Google Maps</a>' +
            '<a class="mini-btn" target="_blank" rel="noopener" href="' + mapsDirTo(h.lat, h.lng) + '">🧭 导航回酒店</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* ---------- 时间分段 ---------- */
  function timeSegment(timeStr) {
    if (!timeStr) return '';
    var h = parseInt(timeStr.match(/(\d+)/)?.[1] || '0', 10);
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    return 'evening';
  }
  function segmentLabel(seg) {
    return { morning: '🌅 MORNING', afternoon: '☀️ AFTERNOON', evening: '🌙 EVENING' }[seg] || '';
  }

  /* ---------- 渲染每天 ---------- */
  function renderDay(day, idx) {
    var t = day.transport;
    var transportHtml =
      '<article class="transport-card">' +
        '<div class="transport-head"><span class="transport-mode">' + esc(t.mode) + '</span><span class="transport-tag">' + esc(t.tag) + '</span></div>' +
        '<div class="transport-route">' +
          '<div class="route-end"><span class="route-code">' + esc(t.from.code) + '</span><span class="route-sub">' + esc(t.from.sub) + '</span></div>' +
          '<div class="route-mid"><span class="route-icon">' + t.mid.icon + '</span><span class="route-dur">' + esc(t.mid.dur) + '</span></div>' +
          '<div class="route-end route-end--right"><span class="route-code">' + esc(t.to.code) + '</span><span class="route-sub">' + esc(t.to.sub) + '</span></div>' +
        '</div>' +
        '<div class="transport-note">' + esc(t.note) + '</div>' +
      '</article>';

    // 当天摘要
    var s = day.summary;
    var summaryHtml =
      '<div class="day-summary">' +
        '<span>📍 ' + s.spots + ' 个地点</span><span>🚶 ' + s.walks + '</span>' +
        '<span>🚗 ' + s.grabs + ' 次 Grab</span><span>💰 ' + s.budget + '</span>' +
      '</div>';

    // 时间分段渲染
    var listHtml = '';
    var lastSeg = '';
    day.spots.forEach(function (spot, i) {
      var seg = timeSegment(spot.time || (day.restaurants.find(function (r) { return r.meal === 'breakfast'; })?.time));
      // 简化：用 spot 在列表中的位置推断时间段（前2=早上，中间=下午，后2=晚上）
      if (i <= 1) seg = 'morning'; else if (i >= day.spots.length - 2) seg = 'evening'; else seg = 'afternoon';
      if (seg !== lastSeg) {
        listHtml += '<li class="time-seg">' + segmentLabel(seg) + '</li>';
        lastSeg = seg;
      }

      var next = spot.next || { mode: 'none', text: '' };
      var hasNext = next.mode && next.mode !== 'none' && i < day.spots.length - 1;
      var nextHtml = '';
      if (hasNext) {
        if (next.mode === 'transit') {
          nextHtml = '<div class="next-note">🚉 ' + esc(next.text) + '</div>';
        } else {
          var b = day.spots[i + 1];
          nextHtml = '<div class="next-row"><span class="next-text">' + (next.mode === 'grab' ? '🚗 建议 Grab · ' : '🚶 ') + esc(next.text) + '</span><a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&origin=' + spot.lat + ',' + spot.lng + '&destination=' + b.lat + ',' + b.lng + (next.mode === 'walk' ? '&travelmode=walking' : '') + '">查看路线</a></div>';
        }
      }

      // 图片
      var imgHtml = spot.image
        ? '<div class="spot-img-wrap"><img src="' + spot.image + '" alt="' + esc(spot.imageAlt || spot.zh) + '" loading="lazy" ' + imgOnError() + '></div>'
        : '';

      // 详情展开区
      var detailsHtml = '';
      if (spot.duration || spot.openingHours || spot.ticket || (spot.tips && spot.tips.length)) {
        detailsHtml = '<div class="spot-details">' +
          (spot.duration ? '<div>⏱️ 预计停留：' + esc(spot.duration) + '</div>' : '') +
          (spot.openingHours ? '<div>🕐 营业时间：' + esc(spot.openingHours) + '</div>' : '') +
          (spot.ticket ? '<div>🎫 门票：' + esc(spot.ticket) + '</div>' : '') +
          (spot.address ? '<div>📍 地址：' + esc(spot.address) + '</div>' : '') +
          (spot.tips && spot.tips.length ? '<div class="spot-tips">💡 ' + spot.tips.map(function(tip){ return esc(tip); }).join(' · ') + '</div>' : '') +
        '</div>';
      }

      listHtml +=
        '<li class="todo spot-item" id="d' + day.id + '-spot-' + i + '" data-spot="' + idx + '-' + i + '" data-lat="' + spot.lat + '" data-lng="' + spot.lng + '" data-day="' + day.id + '" data-index="' + i + '">' +
          '<label class="todo-check">' +
            '<input type="checkbox" data-persist="d' + day.id + '-' + (i + 1) + '">' +
            '<span class="todo-text">' +
              imgHtml +
              '<span class="spot-line"><span class="spot-num">' + NUMS[i] + '</span> ' + spot.emoji +
              ' <b class="spot-name">' + esc(spot.zh) + '</b>' + (spot.en ? ' · ' + esc(spot.en) : '') + '</span>' +
              '<span class="spot-note">' + esc(spot.note) + '</span>' +
              '<span class="spot-btns">' +
                '<a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + spot.lat + ',' + spot.lng + '">📍 地点</a>' +
                '<a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + spot.lat + ',' + spot.lng + '">🧭 导航</a>' +
                '<button type="button" class="mini-btn mini-btn--map" data-day="' + day.id + '" data-index="' + i + '">🗺️ 地图</button>' +
              '</span>' +
            '</span>' +
          '</label>' +
          detailsHtml +
          nextHtml +
        '</li>';
    });

    // 餐厅卡片
    var restaurantHtml = '';
    if (day.restaurants && day.restaurants.length) {
      restaurantHtml = '<article class="event-card restaurant-card"><h3 class="event-title">🍽️ 当日餐食</h3><div class="restaurant-list">';
      day.restaurants.forEach(function (r) {
        var mealEmoji = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' }[r.meal] || '🍽️';
        var tagsHtml = r.tags ? r.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') : '';
        restaurantHtml +=
          '<div class="restaurant-item">' +
            '<div class="restaurant-head">' +
              '<span class="restaurant-meal">' + mealEmoji + ' ' + esc(r.meal) + '</span>' +
              '<span class="restaurant-time">' + esc(r.time) + '</span>' +
            '</div>' +
            '<div class="restaurant-name">' + esc(r.zhName) + '</div>' +
            '<div class="restaurant-en">' + esc(r.name) + '</div>' +
            '<div class="restaurant-meta">' + esc(r.cuisine) + ' · ' + esc(r.pricePerPerson) + ' · ' + esc(r.openingHours) + '</div>' +
            '<div class="restaurant-dishes">推荐：' + r.recommendedDishes.map(function(d){ return esc(d); }).join(' · ') + '</div>' +
            '<div class="restaurant-distance">📍 ' + esc(r.distanceFromPrev) + '</div>' +
            '<div class="restaurant-tags">' + tagsHtml + '</div>' +
            '<div class="restaurant-btns">' +
              '<a class="mini-btn" target="_blank" rel="noopener" href="' + r.googleMapsUrl + '">📍 Google Maps</a>' +
              (r.backup ? '<span class="restaurant-backup">备用：' + esc(r.backup.zhName || r.backup.name) + ' — ' + esc(r.backup.note) + '</span>' : '') +
            '</div>' +
          '</div>';
      });
      restaurantHtml += '</div></article>';
    }

    // 当天多地点路线按钮
    var waypoints = day.spots.map(function (s) { return s.lat + ',' + s.lng; }).join('/');
    var dayRouteBtn = '<a class="mini-btn day-route-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/' + waypoints + '">📍 在 Google Maps 查看今日完整路线</a>';

    return (
      '<section class="day-section" id="d' + day.id + '">' +
        '<div class="day-header">' +
          '<div class="day-num">' + day.num + '</div>' +
          '<div class="day-info">' +
            '<span class="day-date">' + day.weekday + ' · ' + day.date + '</span>' +
            '<span class="day-title">｜' + esc(day.title) + '</span>' +
            '<span class="day-progress" id="progress-d' + day.id + '"></span>' +
          '</div>' +
        '</div>' +
        '<p class="day-theme">' + esc(day.theme) +
          '<button class="reset-day-btn" data-day="' + day.id + '" type="button">重置当天进度</button></p>' +
        summaryHtml +
        transportHtml +
        dayRouteBtn +
        '<article class="event-card"><h3 class="event-title">📅 Day ' + day.id + ' 行程</h3><ul class="trip-list">' + listHtml + '</ul></article>' +
        restaurantHtml +
      '</section>'
    );
  }

  // 渲染全部
  var itineraryContainer = document.getElementById('tabContentItinerary');
  itineraryContainer.innerHTML = renderHotel() + TRIP.days.map(renderDay).join('');

  /* ---------- 标签切换 ---------- */
  var tabItineraryBtn = document.getElementById('tabItinerary');
  var tabMapBtn = document.getElementById('tabMap');
  var tabContentItinerary = document.getElementById('tabContentItinerary');
  var tabContentMap = document.getElementById('tabContentMap');
  var bottomNav = document.getElementById('bottomNav');

  function setActiveTab(tab) {
    var isItinerary = tab === 'itinerary';
    tabItineraryBtn.classList.toggle('tab-btn--active', isItinerary);
    tabMapBtn.classList.toggle('tab-btn--active', !isItinerary);
    tabItineraryBtn.setAttribute('aria-selected', String(isItinerary));
    tabMapBtn.setAttribute('aria-selected', String(!isItinerary));
    tabContentItinerary.classList.toggle('active', isItinerary);
    tabContentMap.classList.toggle('active', !isItinerary);
    bottomNav.style.display = isItinerary ? 'flex' : 'none';
    if (!isItinerary && typeof window.ensureMap === 'function') window.ensureMap();
    try { localStorage.setItem(TAB_KEY, tab); } catch (e) {}
  }
  tabItineraryBtn.addEventListener('click', function () { setActiveTab('itinerary'); });
  tabMapBtn.addEventListener('click', function () { setActiveTab('map'); });

  /* ---------- Checkbox 持久化 + 进度 ---------- */
  function loadChecked() {
    try { var raw = localStorage.getItem(CHECKED_KEY); return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
  }
  function saveChecked(list) { try { localStorage.setItem(CHECKED_KEY, JSON.stringify(list)); } catch (e) {} }
  var checkedSet = {};
  loadChecked().forEach(function (id) { checkedSet[id] = true; });

  function updateProgress(dayId) {
    var total = document.querySelectorAll('input[data-persist^="d' + dayId + '-"]').length;
    var done = document.querySelectorAll('li.done[data-spot^="' + (dayId - 1) + '-"]').length;
    var el = document.getElementById('progress-d' + dayId);
    if (el) el.textContent = done + ' / ' + total;
  }

  document.querySelectorAll('input[data-persist]').forEach(function (input) {
    var id = input.getAttribute('data-persist');
    var li = input.closest('li');
    if (checkedSet[id]) { input.checked = true; li.classList.add('done'); }
    input.addEventListener('change', function () {
      if (input.checked) { checkedSet[id] = true; li.classList.add('done'); }
      else { delete checkedSet[id]; li.classList.remove('done'); }
      saveChecked(Object.keys(checkedSet));
      var dayNum = id.slice(1, id.indexOf('-', 1));
      updateProgress(dayNum);
    });
  });

  document.querySelectorAll('.reset-day-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dayId = btn.getAttribute('data-day');
      if (!window.confirm('确定重置 Day ' + dayId + ' 的全部进度？')) return;
      document.querySelectorAll('input[data-persist^="d' + dayId + '-"]').forEach(function (input) {
        input.checked = false; delete checkedSet[input.getAttribute('data-persist')];
        input.closest('li').classList.remove('done');
      });
      saveChecked(Object.keys(checkedSet)); updateProgress(dayId);
    });
  });

  TRIP.days.forEach(function (d) { updateProgress(d.id); });

  /* ---------- Timeline → 地图联动 ---------- */
  document.querySelectorAll('.mini-btn--map').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dayId = parseInt(btn.getAttribute('data-day'), 10);
      var spotIdx = parseInt(btn.getAttribute('data-index'), 10);
      setActiveTab('map');
      setTimeout(function () {
        if (typeof window.flyToSpot === 'function') window.flyToSpot(dayId, spotIdx);
      }, 300);
    });
  });

  // 点击 Timeline 整行也触发地图联动（可选）
  document.querySelectorAll('.spot-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('label') || e.target.closest('input')) return;
      var dayId = parseInt(item.getAttribute('data-day'), 10);
      var spotIdx = parseInt(item.getAttribute('data-index'), 10);
      setActiveTab('map');
      setTimeout(function () {
        if (typeof window.flyToSpot === 'function') window.flyToSpot(dayId, spotIdx);
      }, 300);
    });
  });

  /* ---------- 滚动观察 ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('.day-section'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.bottom-nav a'));
  var topbar = document.getElementById('topbar');

  function onScroll() {
    if (window.scrollY > 40) topbar.classList.add('topbar--scrolled');
    else topbar.classList.remove('topbar--scrolled');
    var current = '';
    sections.forEach(function (section) {
      if (window.pageYOffset >= (section.offsetTop - 170)) current = section.getAttribute('id');
    });
    if (!current) current = 'd1';
    var currentDay = current.replace('d', '');
    sections.forEach(function (section) {
      var header = section.querySelector('.day-header');
      if (header) header.classList.toggle('in-view', section.getAttribute('id') === current);
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-day') === currentDay);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- 初始化 ---------- */
  function tripDayForToday() {
    var start = new Date(2026, 9, 2), end = new Date(2026, 9, 6);
    var today = new Date(); today.setHours(0, 0, 0, 0);
    if (today < start || today > end) return null;
    return Math.floor((today - start) / 86400000) + 1;
  }
  function init() {
    var savedTab = null;
    try { savedTab = localStorage.getItem(TAB_KEY); } catch (e) {}
    setActiveTab(savedTab === 'map' ? 'map' : 'itinerary');
    var day = tripDayForToday();
    if (day && savedTab !== 'map') {
      var target = document.getElementById('d' + day);
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 250);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* ---------- Service Worker ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function () {});
    });
  }
})();
