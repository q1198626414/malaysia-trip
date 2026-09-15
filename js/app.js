/* ===== Malaysia Trip 交互逻辑（行程由 data.js 渲染） ===== */
(function () {
  'use strict';

  var TAB_KEY = 'mt_tab';
  var CHECKED_KEY = 'mt_checked';
  var NUMS = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];

  function mapsPlace(lat, lng) {
    return 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng;
  }
  function mapsDir(a, b, walking) {
    var u = 'https://www.google.com/maps/dir/?api=1&origin=' + a.lat + ',' + a.lng +
            '&destination=' + b.lat + ',' + b.lng;
    if (walking) u += '&travelmode=walking';
    return u;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- 渲染行程 ---------- */
  function renderDay(day, idx) {
    var t = day.transport;
    var transportHtml =
      '<article class="transport-card">' +
        '<div class="transport-head">' +
          '<span class="transport-mode">' + esc(t.mode) + '</span>' +
          '<span class="transport-tag">' + esc(t.tag) + '</span>' +
        '</div>' +
        '<div class="transport-route">' +
          '<div class="route-end"><span class="route-code">' + esc(t.from.code) + '</span><span class="route-sub">' + esc(t.from.sub) + '</span></div>' +
          '<div class="route-mid"><span class="route-icon">' + t.mid.icon + '</span><span class="route-dur">' + esc(t.mid.dur) + '</span></div>' +
          '<div class="route-end route-end--right"><span class="route-code">' + esc(t.to.code) + '</span><span class="route-sub">' + esc(t.to.sub) + '</span></div>' +
        '</div>' +
        '<div class="transport-note">' + esc(t.note) + '</div>' +
      '</article>';

    var listHtml = '';
    day.spots.forEach(function (s, i) {
      var next = s.next || { mode: 'none', text: '' };
      var hasNext = next.mode && next.mode !== 'none' && i < day.spots.length - 1;
      var nextHtml = '';
      if (hasNext) {
        if (next.mode === 'transit') {
          nextHtml = '<div class="next-note">🚉 ' + esc(next.text) + '</div>';
        } else {
          var b = day.spots[i + 1];
          nextHtml =
            '<div class="next-row">' +
              '<span class="next-text">' + (next.mode === 'grab' ? '🚗 建议 Grab · ' : '🚶 ') + esc(next.text) + '</span>' +
              '<a class="mini-btn" target="_blank" rel="noopener" href="' + mapsDir(s, b, next.mode === 'walk') + '">前往下一站</a>' +
            '</div>';
        }
      }
      listHtml +=
        '<li class="todo" data-spot="' + idx + '-' + i + '">' +
          '<label class="todo-check">' +
            '<input type="checkbox" data-persist="d' + day.id + '-' + (i + 1) + '">' +
            '<span class="todo-text">' +
              '<span class="spot-line"><span class="spot-num">' + NUMS[i] + '</span> ' + s.emoji +
              ' <b class="spot-name">' + esc(s.zh) + ' ' + esc(s.en) + '</b>｜' + esc(s.note) + '</span>' +
              '<a class="mini-btn mini-btn--place" target="_blank" rel="noopener" href="' + mapsPlace(s.lat, s.lng) + '">📍 Google Maps</a>' +
            '</span>' +
          '</label>' +
          nextHtml +
        '</li>';
    });

    var COVERS = [
      'radial-gradient(120% 120% at 80% 10%, #5b7c99 0%, #2b3d52 60%, #1a2838 100%)',
      'radial-gradient(120% 120% at 20% 10%, #3f7d86 0%, #244a55 60%, #163038 100%)',
      'radial-gradient(120% 120% at 50% 0%, #c9a877 0%, #8f6f4b 60%, #5f4630 100%)',
      'radial-gradient(120% 120% at 80% 0%, #c2809a 0%, #7c4f6a 60%, #4a2e40 100%)',
      'radial-gradient(120% 120% at 50% 20%, #e09a5a 0%, #a45f32 60%, #5c341f 100%)',
      'radial-gradient(120% 120% at 20% 0%, #b7b09a 0%, #776f57 60%, #443d2c 100%)',
      'radial-gradient(120% 120% at 80% 0%, #c9685a 0%, #8f4038 60%, #53241f 100%)',
      'radial-gradient(120% 120% at 50% 0%, #4a6a8a 0%, #26394f 60%, #12202e 100%)',
      'radial-gradient(120% 120% at 30% 10%, #6f9b74 0%, #3c6146 60%, #1f3827 100%)',
      'radial-gradient(120% 120% at 70% 10%, #c56a52 0%, #8f4136 60%, #55231d 100%)',
      'radial-gradient(120% 120% at 50% 10%, #9aa0a6 0%, #5c636a 60%, #33393f 100%)',
      'radial-gradient(120% 120% at 20% 20%, #b98f62 0%, #7c5c38 60%, #44321e 100%)',
      'radial-gradient(120% 120% at 80% 20%, #4f8fa0 0%, #2d5968 60%, #16313c 100%)',
      'radial-gradient(120% 120% at 50% 10%, #cf6a5e 0%, #944039 60%, #5a211c 100%)',
      'radial-gradient(120% 120% at 50% 10%, #d9a15c 0%, #a2682f 60%, #5c3715 100%)',
      'radial-gradient(120% 120% at 80% 10%, #ca9a6e 0%, #8a6a50 40%, #b06a7a 75%, #5c3a3a 100%)',
      'radial-gradient(120% 120% at 50% 0%, #6c8096 0%, #3d4a5c 60%, #222c38 100%)',
      'radial-gradient(120% 120% at 50% 20%, #5a4a7a 0%, #352a52 60%, #1c1630 100%)',
      'radial-gradient(120% 120% at 20% 0%, #5a6f9c 0%, #35466a 60%, #1d2840 100%)',
      'radial-gradient(120% 120% at 60% 0%, #7a9c5a 0%, #46613a 60%, #27361e 100%)',
      'radial-gradient(120% 120% at 40% 20%, #9c7c5a 0%, #61483a 60%, #33241d 100%)'
    ];
    var overviewHtml = day.spots.map(function (s, i) {
      return '<div class="photo-carousel-slide cover" style="background:' + COVERS[(idx * 7 + i) % COVERS.length] + '">' +
        '<div class="cover-emoji">' + s.emoji + '</div><div class="cover-label">' + esc(s.zh) + '</div></div>';
    }).join('');

    return (
      '<section class="day-section" id="d' + day.id + '">' +
        '<div class="day-header">' +
          '<div class="day-num">' + day.num + '</div>' +
          '<div class="day-info"><span class="day-date">' + day.date + '</span><span class="day-title">｜' + esc(day.title) + '</span>' +
          '<span class="day-progress" id="progress-d' + day.id + '"></span></div>' +
        '</div>' +
        '<p class="day-theme">' + esc(day.theme) +
          '<button class="reset-day-btn" data-day="' + day.id + '" type="button">重置当天进度</button></p>' +
        transportHtml +
        '<article class="event-card"><h3 class="event-title">📅 Day ' + day.id + '｜' + esc(day.theme) + '</h3>' +
          '<ul class="trip-list">' + listHtml + '</ul></article>' +
        '<div class="photo-carousel js-photo-carousel" aria-label="Day ' + day.id + ' 地点概览">' +
          '<div class="photo-carousel-track">' + overviewHtml + '</div>' +
          '<div class="photo-carousel-dots" aria-hidden="true"></div>' +
        '</div>' +
      '</section>'
    );
  }

  document.getElementById('tabContentItinerary').innerHTML =
    TRIP.days.map(renderDay).join('');

  /* ---------- 标签切换（记忆） ---------- */
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
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  tabItineraryBtn.addEventListener('click', function () { setActiveTab('itinerary'); });
  tabMapBtn.addEventListener('click', function () { setActiveTab('map'); });

  /* ---------- Checkbox 持久化 + 进度 ---------- */
  function loadChecked() {
    try {
      var raw = localStorage.getItem(CHECKED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function saveChecked(list) {
    try { localStorage.setItem(CHECKED_KEY, JSON.stringify(list)); } catch (e) {}
  }
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

  /* 重置当天进度（需确认，防误触） */
  document.querySelectorAll('.reset-day-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dayId = btn.getAttribute('data-day');
      if (!window.confirm('确定重置 Day ' + dayId + ' 的全部进度？')) return;
      document.querySelectorAll('input[data-persist^="d' + dayId + '-"]').forEach(function (input) {
        input.checked = false;
        delete checkedSet[input.getAttribute('data-persist')];
        input.closest('li').classList.remove('done');
      });
      saveChecked(Object.keys(checkedSet));
      updateProgress(dayId);
    });
  });

  TRIP.days.forEach(function (d) { updateProgress(d.id); });

  /* ---------- 地点概览轮播 ---------- */
  document.querySelectorAll('.js-photo-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.photo-carousel-track');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.photo-carousel-slide'));
    var dotsWrap = carousel.querySelector('.photo-carousel-dots');
    if (!track || !dotsWrap || slides.length === 0) return;
    if (slides.length === 1) { dotsWrap.style.display = 'none'; return; }
    var counter = document.createElement('span');
    counter.className = 'photo-carousel-counter';
    dotsWrap.appendChild(counter);
    var ticking = false;
    function update() {
      var w = track.clientWidth || 1;
      var idx = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / w)));
      counter.textContent = (idx + 1) + ' / ' + slides.length;
    }
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
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

  /* ---------- 初始化：恢复标签 / 旅行日期定位 ---------- */
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
