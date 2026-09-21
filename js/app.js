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
  function priorityClass(priority) {
    return String(priority || 'MUST').toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
  }
  function priorityBadge(spot) {
    var value = spot.priority || 'MUST';
    return '<span class="priority-badge priority-badge--' + priorityClass(value) + '">' + esc(value) + '</span>' + (spot.weatherSensitive ? '<span class="weather-badge">Weather-sensitive</span>' : '');
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
    var nextHtml = hasNext ? '<div class="spot-next">' + (next.mode === 'grab' ? '🚗 ' : next.mode === 'walk' ? '🚶 ' : '🚉 ') + esc(next.text) + '</div>' : '';
    var simpleHtml =
      '<div class="spot-simple">' +
        '<div class="spot-time-line"><span class="spot-time">' + esc(spot.time || '') + '</span>' + (spot.duration ? '<span class="spot-duration">' + esc(spot.duration) + '</span>' : '') + '</div>' +
        '<div class="spot-actions">' +
          (spot.en ? '<button type="button" class="spot-copy-name" data-copy="' + esc(spot.en) + '" title="点击复制英文名">' + esc(spot.en) + '</button>' : '') +
          '<a class="spot-nav-btn" target="_blank" rel="noopener" href="' + mapsDirTo(spot.lat, spot.lng) + '">🧭 导航</a>' +
        '</div>' +
      '</div>';

    return (
      '<li class="spot-item" id="d' + day.id + '-spot-' + i + '" data-spot="' + idx + '-' + i + '" data-lat="' + spot.lat + '" data-lng="' + spot.lng + '" data-day="' + day.id + '" data-index="' + i + '">' +
        '<div class="spot-line"><span class="spot-num">' + NUMS[i] + '</span> ' + spot.emoji + ' <b class="spot-name">' + esc(spot.zh) + '</b></div>' +
        simpleHtml +
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
    var dayRouteBtn = day.id === 3
      ? '<div class="day-route-note">D3 公共交通按文字分段执行，不生成整天驾车路线。</div>'
      : '<a class="mini-btn day-route-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/' + waypoints + '">📍 在 Google Maps 查看今日完整路线</a>';

    var planBHtml = day.planB ? '<aside class="plan-b"><strong>Plan B</strong><span>' + esc(day.planB) + '</span></aside>' : '';
    var returnPlansHtml = day.returnPlans ? '<aside class="return-plans"><h3>回程方案</h3>' + day.returnPlans.map(function (plan) {
      return '<div class="return-plan"><strong>' + esc(plan.title) + '</strong><span>' + esc(plan.text) + '</span></div>';
    }).join('') + '</aside>' : '';

    var isCollapsed = collapsed['day-' + day.id] || false;
    var collapseIcon = isCollapsed ? '▸' : '▾';

    return (
      '<section class="day-section" id="d' + day.id + '">' +
        '<div class="day-header">' +
          '<div class="day-num">' + day.num + '</div>' +
          '<div class="day-info">' +
            '<span class="day-date">' + day.weekday + ' · ' + day.date + '</span>' +
            '<span class="day-title">｜' + esc(day.title) + '</span>' +
          '</div>' +
          '<button class="day-collapse-btn" data-day="' + day.id + '" aria-expanded="' + !isCollapsed + '">' + collapseIcon + '</button>' +
        '</div>' +
        '<p class="day-theme">' + esc(day.theme) + '</p>' +
        '<div class="day-content" id="day-content-' + day.id + '"' + (isCollapsed ? ' hidden' : '') + '>' +
          planBHtml + returnPlansHtml +
          '<article class="event-card"><h3 class="event-title">📅 Day ' + day.id + ' 行程</h3><ul class="trip-list">' + listHtml + '</ul></article>' +
          renderRestaurants(day) +
        '</div>' +
      '</section>'
    );
  }

  function renderBookingCenter() {
    if (!TRIP.bookings || !TRIP.bookings.length) return '';
    var html = '<article class="booking-center event-card"><div class="booking-head"><h2>预订 / 准备</h2><span>出发前集中确认</span></div><div class="booking-grid">';
    TRIP.bookings.forEach(function (item) {
      html += '<div class="booking-item"><div class="booking-item-head"><strong>' + esc(item.name) + '</strong><span class="booking-status booking-status--' + priorityClass(item.status) + '">' + esc(item.status) + '</span></div><p>' + esc(item.note) + '</p></div>';
    });
    return html + '</div></article>';
  }

  /* ---------- 渲染页面 ---------- */
  var itineraryContainer = document.getElementById('tabContentItinerary');
  itineraryContainer.innerHTML = renderStays() + renderBookingCenter() + TRIP.days.map(renderDay).join('');

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

  document.querySelectorAll('.spot-copy-name').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-copy') || '';
      var done = function () { var old = btn.textContent; btn.textContent = '已复制'; setTimeout(function () { btn.textContent = old; }, 1200); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(name).then(done).catch(function () {});
      else {
        var input = document.createElement('textarea'); input.value = name; document.body.appendChild(input); input.select();
        try { document.execCommand('copy'); done(); } catch (e) {} input.remove();
      }
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
