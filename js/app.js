/* ===== Malaysia Trip 交互逻辑 ===== */
(function () {
  'use strict';

  var TAB_KEY = 'mt_tab';
  var CHECKED_KEY = 'mt_checked';

  /* ---------- 1. 标签切换（行程 / 地图，localStorage 记忆） ---------- */
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

    if (!isItinerary && typeof window.ensureMap === 'function') {
      window.ensureMap();
    }
    try { localStorage.setItem(TAB_KEY, tab); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  tabItineraryBtn.addEventListener('click', function () { setActiveTab('itinerary'); });
  tabMapBtn.addEventListener('click', function () { setActiveTab('map'); });

  /* ---------- 2. Checkbox 持久化 + 完成态（透明度 / 删除线） ---------- */
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

  var checkboxes = Array.prototype.slice.call(document.querySelectorAll('input[data-persist]'));
  checkboxes.forEach(function (input) {
    var id = input.getAttribute('data-persist');
    var li = input.closest('li');
    if (checkedSet[id]) {
      input.checked = true;
      if (li) li.classList.add('done');
    }
    input.addEventListener('change', function () {
      if (input.checked) {
        checkedSet[id] = true;
        if (li) li.classList.add('done');
      } else {
        delete checkedSet[id];
        if (li) li.classList.remove('done');
      }
      saveChecked(Object.keys(checkedSet));
    });
  });

  /* ---------- 3. 照片轮播（1 / N 计数器） ---------- */
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

  /* ---------- 4. 滚动观察：日期亮灯 + 底部导航 + 顶部栏背景 ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('.day-section'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.bottom-nav a'));
  var topbar = document.getElementById('topbar');

  function onScroll() {
    // 顶部栏背景
    if (window.scrollY > 40) topbar.classList.add('topbar--scrolled');
    else topbar.classList.remove('topbar--scrolled');

    // 当前日期
    var current = '';
    sections.forEach(function (section) {
      if (window.pageYOffset >= (section.offsetTop - 170)) {
        current = section.getAttribute('id');
      }
    });
    if (!current) current = 'd1'; // 顶部未进入任何 Day 时默认高亮 D1
    var currentDay = current ? current.replace('d', '') : '';
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

  /* ---------- 5. 恢复上次标签 / 旅行日期内默认定位当天 ---------- */
  function tripDayForToday() {
    var start = new Date(2026, 9, 2); // 2026-10-02
    var end = new Date(2026, 9, 6);   // 2026-10-06
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (today < start || today > end) return null;
    return Math.floor((today - start) / 86400000) + 1; // 1..5
  }

  function init() {
    var savedTab = null;
    try { savedTab = localStorage.getItem(TAB_KEY); } catch (e) {}
    setActiveTab(savedTab === 'map' ? 'map' : 'itinerary');

    // 旅行日期内 → 定位到当天；日期外 → 停在顶部（Day 1）
    var day = tripDayForToday();
    if (day && savedTab !== 'map') {
      var target = document.getElementById('d' + day);
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 250);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ---------- 6. Service Worker 注册（PWA 离线） ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function () {});
    });
  }
})();
