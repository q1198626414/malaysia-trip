/* ===== Malaysia Trip — 第四+五轮整合：离线 + 折叠 + 简洁/详细 + 新行程 ===== */
(function () {
  'use strict';

  var TAB_KEY = 'mt_tab';
  var CHECKED_KEY = 'mt_checked';
  var COLLAPSE_KEY = 'mt_collapsed';
  var NUMS = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function mapsPlace(lat, lng) {
    return 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng;
  }
  function mapsDirTo(lat, lng) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng;
  }

  /* ---------- 状态 ---------- */
  var collapsed = {};
  try { collapsed = JSON.parse(localStorage.getItem(COLLAPSE_KEY) || '{}') || {}; } catch (e) {}
  var checkedSet = {};
  try { (JSON.parse(localStorage.getItem(CHECKED_KEY)) || []).forEach(function (id) { checkedSet[id] = true; }); } catch (e) {}

  function saveChecked() { try { localStorage.setItem(CHECKED_KEY, JSON.stringify(Object.keys(checkedSet))); } catch (e) {} }
  function saveCollapsed() { try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(collapsed)); } catch (e) {} }

  /* ---------- 本地照片；加载失败时收起图片区域 ---------- */
  function photo(item, className) {
    if (!item.image) return '';
    return '<figure class="place-photo ' + className + '"><img src="' + esc(item.image) + '" alt="' + esc(item.imageAlt || item.zh || item.zhName) + '" loading="lazy" decoding="async" width="800" height="450" onerror="this.closest(\'figure\').hidden=true">' +
      (item.imageSource ? '<figcaption><a href="' + esc(item.imageSource) + '" target="_blank" rel="noopener">' + esc(item.imageCredit || '照片来源') + '</a></figcaption>' : '') + '</figure>';
  }

  /* ---------- 渲染住宿 ---------- */
  function renderStays() {
    var html = '<div class="stays-section"><h2 class="stays-title">🏨 住宿</h2>';
    TRIP.stays.forEach(function (s) {
      var statusBadge = s.status === 'tentative' ? '<span class="stay-status stay-status--tentative">待确认</span>' : '<span class="stay-status stay-status--confirmed">已确认</span>';
      var candidatesHtml = s.candidates ? '<div class="stay-candidates">候选：' + s.candidates.map(function(c){ return esc(c); }).join(' / ') + '</div>' : '';
      html +=
        '<article class="stay-card">' +
          photo(s, 'stay-img-wrap') +
          '<div class="stay-body">' +
            '<div class="stay-head"><h3 class="stay-name">' + esc(s.zhName) + '</h3>' + statusBadge + '</div>' +
            '<p class="stay-dates">' + s.dates + ' · ' + s.nights + ' 晚</p>' +
            '<p class="stay-addr">' + esc(s.address) + '</p>' +
            '<div class="stay-meta"><span>入住 ' + s.checkIn + '</span><span>退房 ' + s.checkOut + '</span></div>' +
            candidatesHtml +
            '<div class="stay-btns">' +
              '<a class="mini-btn" target="_blank" rel="noopener" href="' + s.googleMapsUrl + '">📍 Google Maps</a>' +
              '<a class="mini-btn" target="_blank" rel="noopener" href="' + mapsDirTo(s.lat, s.lng) + '">🧭 导航</a>' +
            '</div>' +
          '</div>' +
        '</article>';
    });
    return html + '</div>';
  }

  /* ---------- 渲染地点卡片 ---------- */
  function renderSpot(day, spot, i, idx) {
    var next = spot.next || { mode: 'none', text: '' };
    var hasNext = next.mode && next.mode !== 'none' && i < day.spots.length - 1;
    var nextHtml = '';
    if (hasNext) {
      if (next.mode === 'transit') {
        nextHtml = '<div class="next-note">🚉 ' + esc(next.text) + '</div>';
      } else {
        var b = day.spots[i + 1];
        nextHtml = '<div class="next-row"><span class="next-text">' + (next.mode === 'grab' ? '🚗 ' : '🚶 ') + esc(next.text) + '</span><a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&origin=' + spot.lat + ',' + spot.lng + '&destination=' + b.lat + ',' + b.lng + (next.mode === 'walk' ? '&travelmode=walking' : '') + '">查看路线</a></div>';
      }
    }

    var imgHtml = photo(spot, 'spot-img-wrap');

    // 简洁模式：只显示时间、名称、图片、停留、下一段、导航
    var simpleHtml =
      '<div class="spot-simple">' +
        '<div class="spot-time">' + esc(spot.time || '') + '</div>' +
        imgHtml +
        '<div class="spot-quick-info">' +
          (spot.duration ? '<span>⏱️ ' + esc(spot.duration) + '</span>' : '') +
          (hasNext && next.mode === 'grab' ? '<span>🚗 Grab</span>' : '') +
          (hasNext && next.mode === 'walk' ? '<span>🚶 步行</span>' : '') +
          (hasNext && next.mode === 'transit' ? '<span>🚉 公共交通</span>' : '') +
        '</div>' +
        '<div class="spot-actions">' +
          '<a class="mini-btn" target="_blank" rel="noopener" href="' + mapsDirTo(spot.lat, spot.lng) + '">🧭 导航</a>' +
          (TRIP.isMapLocation(spot) ? '<button type="button" class="mini-btn mini-btn--map" data-day="' + day.id + '" data-index="' + i + '">🗺️ 地图</button>' : '') +
          '<button type="button" class="spot-toggle" data-target="spot-detail-' + day.id + '-' + i + '" aria-expanded="false">详情 ›</button>' +
        '</div>' +
      '</div>';

    // 详细模式：展开全部
    var detailHtml =
      '<div class="spot-detail" id="spot-detail-' + day.id + '-' + i + '" hidden>' +
        '<div class="spot-full-info">' +
          (spot.en ? '<div><b>' + esc(spot.en) + '</b></div>' : '') +
          '<div>' + esc(spot.note) + '</div>' +
          (spot.address ? '<div>📍 ' + esc(spot.address) + '</div>' : '') +
          (spot.openingHours ? '<div>🕐 ' + esc(spot.openingHours) + '</div>' : '') +
          (spot.ticket ? '<div>🎫 ' + esc(spot.ticket) + '</div>' : '') +
          (spot.duration ? '<div>⏱️ ' + esc(spot.duration) + '</div>' : '') +
          (spot.tips && spot.tips.length ? '<div class="spot-tips">💡 ' + spot.tips.map(function(t){ return esc(t); }).join(' · ') + '</div>' : '') +
        '</div>' +
        '</div>' +
      '</div>';

    return (
      '<li class="todo spot-item" id="d' + day.id + '-spot-' + i + '" data-spot="' + idx + '-' + i + '" data-lat="' + spot.lat + '" data-lng="' + spot.lng + '" data-day="' + day.id + '" data-index="' + i + '">' +
        '<label class="todo-check">' +
          '<input type="checkbox" data-persist="d' + day.id + '-' + (i + 1) + '">' +
          '<span class="todo-text">' +
            '<span class="spot-line"><span class="spot-num">' + NUMS[i] + '</span> ' + spot.emoji +
            ' <b class="spot-name">' + esc(spot.zh) + '</b></span>' +
          '</span>' +
        '</label>' +
        simpleHtml + detailHtml +
        nextHtml +
      '</li>'
    );
  }

  /* ---------- 渲染餐厅 ---------- */
  function renderRestaurants(day) {
    if (!day.restaurants || !day.restaurants.length) return '';
    var html = '<article class="event-card restaurant-card"><h3 class="event-title">🍽️ 当日餐食</h3><div class="restaurant-list">';
    day.restaurants.forEach(function (r, ri) {
      var mealEmoji = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍧' }[r.meal] || '🍽️';
      var tagsHtml = r.tags ? r.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') : '';
      var simpleR =
        '<div class="restaurant-simple">' +
          '<div class="restaurant-head"><span class="restaurant-meal">' + mealEmoji + ' ' + esc(r.meal) + '</span><span class="restaurant-time">' + esc(r.time) + '</span></div>' +
          '<div class="restaurant-name">' + esc(r.zhName) + '</div>' +
          '<div class="restaurant-meta">' + esc(r.cuisine) + ' · ' + esc(r.pricePerPerson) + '</div>' +
          '<div class="restaurant-dishes">推荐：' + r.recommendedDishes.slice(0, 2).map(function(d){ return esc(d); }).join(' · ') + '</div>' +
          '<div class="restaurant-btns">' +
            '<a class="mini-btn" target="_blank" rel="noopener" href="' + r.googleMapsUrl + '">🧭 导航</a>' +
            '<button type="button" class="spot-toggle" data-target="restaurant-detail-' + day.id + '-' + ri + '" aria-expanded="false">详情 ›</button>' +
          '</div>' +
        '</div>';
      var detailR =
        '<div class="restaurant-detail" id="restaurant-detail-' + day.id + '-' + ri + '" hidden>' +
          '<div class="restaurant-full">' +
            '<div>' + esc(r.name) + '</div>' +
            '<div>🕐 ' + esc(r.openingHours) + '</div>' +
            '<div>📍 ' + esc(r.distanceFromPrev) + '</div>' +
            '<div>推荐：' + r.recommendedDishes.map(function(d){ return esc(d); }).join(' · ') + '</div>' +
            '<div class="restaurant-tags">' + tagsHtml + '</div>' +
            (r.backup ? '<div class="restaurant-backup">备用：' + esc(r.backup.zhName || r.backup.name) + ' — ' + esc(r.backup.note) + '</div>' : '') +
            '<div class="restaurant-btns"><a class="mini-btn" target="_blank" rel="noopener" href="' + r.googleMapsUrl + '">📍 Google Maps</a></div>' +
          '</div>' +
        '</div>';
      html += '<div class="restaurant-item">' + simpleR + detailR + '</div>';
    });
    return html + '</div></article>';
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

    var s = day.summary;
    var stars = '★'.repeat(day.intensity || 1) + '☆'.repeat(5 - (day.intensity || 1));
    var summaryHtml =
      '<div class="day-summary">' +
        '<span>📍 ' + s.spots + ' 个地点</span><span>🚶 ' + s.walks + '</span>' +
        '<span>🚗 ' + s.grabs + ' 次 Grab</span><span>💰 ' + s.budget + '</span>' +
        (s.endTime ? '<span>🌙 ' + s.endTime + '</span>' : '') +
        '<span class="day-intensity">强度 ' + stars + '</span>' +
      '</div>';

    // 时间分段
    var listHtml = '';
    var lastSeg = '';
    day.spots.forEach(function (spot, i) {
      var seg = 'morning';
      if (i >= day.spots.length - 2) seg = 'evening';
      else if (i > 1) seg = 'afternoon';
      if (seg !== lastSeg) {
        listHtml += '<li class="time-seg">' + { morning: '🌅 MORNING', afternoon: '☀️ AFTERNOON', evening: '🌙 EVENING' }[seg] + '</li>';
        lastSeg = seg;
      }
      listHtml += renderSpot(day, spot, i, idx);
    });

    var waypoints = day.spots.filter(TRIP.isMapLocation).map(function (s) { return s.lat + ',' + s.lng; }).join('/');
    var dayRouteBtn = '<a class="mini-btn day-route-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/' + waypoints + '">📍 在 Google Maps 查看今日完整路线</a>';

    var isCollapsed = collapsed['day-' + day.id] || false;
    var collapseIcon = isCollapsed ? '▸' : '▾';

    return (
      '<section class="day-section" id="d' + day.id + '">' +
        '<div class="day-header">' +
          '<div class="day-num">' + day.num + '</div>' +
          '<div class="day-info">' +
            '<span class="day-date">' + day.weekday + ' · ' + day.date + '</span>' +
            '<span class="day-title">｜' + esc(day.title) + '</span>' +
            '<span class="day-progress" id="progress-d' + day.id + '"></span>' +
          '</div>' +
          '<button class="day-collapse-btn" data-day="' + day.id + '" aria-expanded="' + !isCollapsed + '">' + collapseIcon + '</button>' +
        '</div>' +
        '<p class="day-theme">' + esc(day.theme) +
          '<button class="reset-day-btn" data-day="' + day.id + '" type="button">重置当天进度</button></p>' +
        summaryHtml +
        '<div class="day-content" id="day-content-' + day.id + '"' + (isCollapsed ? ' hidden' : '') + '>' +
          transportHtml + dayRouteBtn +
          '<article class="event-card"><h3 class="event-title">📅 Day ' + day.id + ' 行程</h3><ul class="trip-list">' + listHtml + '</ul></article>' +
          renderRestaurants(day) +
        '</div>' +
      '</section>'
    );
  }

  /* ---------- 渲染页面 ---------- */
  var itineraryContainer = document.getElementById('tabContentItinerary');
  itineraryContainer.innerHTML = renderStays() + TRIP.days.map(renderDay).join('');

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

  /* ---------- Checkbox 持久化 ---------- */
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
      saveChecked();
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
      saveChecked(); updateProgress(dayId);
    });
  });

  TRIP.days.forEach(function (d) { updateProgress(d.id); });

  /* ---------- 折叠系统 ---------- */
  document.querySelectorAll('.day-collapse-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dayId = btn.getAttribute('data-day');
      var content = document.getElementById('day-content-' + dayId);
      var isHidden = content.hidden;
      content.hidden = !isHidden;
      btn.textContent = isHidden ? '▾' : '▸';
      btn.setAttribute('aria-expanded', String(isHidden));
      collapsed['day-' + dayId] = !isHidden;
      saveCollapsed();
    });
  });

  document.querySelectorAll('.spot-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var target = document.getElementById(targetId);
      if (!target) return;
      var isHidden = target.hidden;
      target.hidden = !isHidden;
      btn.textContent = isHidden ? '收起 ›' : '详情 ›';
      btn.setAttribute('aria-expanded', String(isHidden));
    });
  });

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

  /* ---------- Service Worker：更新后仅刷新一次，首次安装不刷新 ---------- */
  if ('serviceWorker' in navigator) {
    var hadController = !!navigator.serviceWorker.controller;
    var refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!hadController || refreshing) { hadController = true; return; }
      refreshing = true;
      window.location.reload();
    });
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { scope: './', updateViaCache: 'none' }).then(function (reg) {
        function checkUpdate() {
          if (navigator.onLine && document.visibilityState !== 'hidden') reg.update().catch(function () {});
        }
        checkUpdate();
        setInterval(checkUpdate, 60000);
        window.addEventListener('online', checkUpdate);
        window.addEventListener('pageshow', checkUpdate);
        document.addEventListener('visibilitychange', checkUpdate);
      }).catch(function () {});
    });
  }
})();
