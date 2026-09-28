/* Malaysia Trip — compact daily handbook */
(function () {
  'use strict';
  var BOOKING_KEY = 'mt_booking_status';
  var DAY_KEY = 'mt_day';
  var legacyStatuses = {'TO BOOK':'TODO', 'BOOKED':'DONE', 'NOT REQUIRED':'TODO'};
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function(c) {return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function read(key, fallback) { try {return JSON.parse(localStorage.getItem(key)) || fallback;} catch (_) {return fallback;} }
  var bookingState = read(BOOKING_KEY, {});
  if (typeof bookingState !== 'object' || Array.isArray(bookingState)) bookingState = {};
  function normalizeBookingStatus(value, fallback) {
    value = legacyStatuses[value] || value;
    if (value === 'DONE' || value === 'BOOKED') return 'DONE';
    if (value === 'TODO' || value === 'TO BOOK') return 'TODO';
    return fallback === 'DONE' ? 'DONE' : 'TODO';
  }
  function bookingStatus(item) {
    var values = [bookingState[item.id], bookingState[item.name]];
    (item.legacyNames || []).forEach(function(name) { values.push(bookingState[name]); });
    for (var i = 0; i < values.length; i++) if (values[i]) return normalizeBookingStatus(values[i], item.status);
    return normalizeBookingStatus(item.status, 'TODO');
  }
  function navigation(s) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(s.navigationName || (s.lat + ',' + s.lng));
  }
  function copyButton(name) {return '<button class="spot-copy-name" type="button" data-copy="'+esc(name)+'" aria-label="复制 '+esc(name)+'">'+esc(name)+' ⧉</button>';}
  function disclosure(title, body, cls) {return '<details class="compact-panel '+(cls || '')+'"><summary>'+title+'</summary><div class="panel-body">'+body+'</div></details>';}
  function renderStays() {
    return disclosure('🏨 住宿', TRIP.stays.map(function(s) {
      return '<article class="hotel-compact"><strong>'+esc(s.zhName)+'</strong><p>'+esc(s.dates)+' · '+s.nights+'晚 · 入住'+esc(s.checkIn)+' / 退房'+esc(s.checkOut)+'</p>'+copyButton(s.name)+' <a class="spot-nav-btn" href="'+navigation(s)+'" target="_blank" rel="noopener">导航</a></article>';
    }).join(''), 'stays-section');
  }
  function renderBookings() {
    var bookings = TRIP.bookings.slice().sort(function(a,b){return (a.priority || 99) - (b.priority || 99);});
    var done = bookings.filter(function(b){return bookingStatus(b) === 'DONE';}).length;
    var body = '<p class="muted booking-intro">按优先级排列 · 已完成 <span data-booking-count>'+done+' / '+bookings.length+'</span> · 状态保存在当前浏览器，不跨设备同步。</p>';
    body += bookings.map(function(b) {
      var value = bookingStatus(b);
      var priorityClass = ' booking-item--p'+(b.priority || 3);
      return '<article class="booking-item'+priorityClass+'"><div class="booking-item-head"><div class="booking-title"><strong>'+esc(b.name)+'</strong><span class="priority-badge priority-badge--p'+(b.priority || 3)+'">'+esc(b.priorityLabel || '')+'</span></div><button type="button" class="booking-status-dot'+(value==='DONE'?' is-complete':'')+'" data-booking-id="'+esc(b.id || b.name)+'" aria-label="'+esc(b.name)+(value==='DONE'?'已完成，点击标记为未完成':'未完成，点击标记为已完成')+'" aria-pressed="'+String(value==='DONE')+'" title="点击切换完成状态"></button></div><p>'+esc(b.note)+'</p></article>';
    }).join('');
    return disclosure('📋 预订 / 准备', body+'<p id="booking-feedback" role="status" aria-live="polite"></p>', 'booking-center');
  }
  function renderSpot(s, i, day) {
    var n = s.next || {};
    var duration = s.duration && s.duration !== '—' ? ' · '+esc(s.duration) : '';
    return '<li class="spot-item" id="d'+day+'-spot-'+i+'"><div class="spot-line"><span class="spot-num">'+(i+1)+'</span><span>'+esc(s.emoji)+'</span><strong>'+esc(s.zh)+'</strong>'+copyButton(s.en)+'<a class="spot-nav-btn" href="'+navigation(s)+'" target="_blank" rel="noopener" aria-label="导航至'+esc(s.zh)+'">导航</a></div><div class="spot-time-line">'+esc(s.time)+duration+'</div>'+(s.note && s.note.includes('待订票')?'<p class="spot-next">'+esc(s.note)+'</p>':'')+(n.mode && n.mode!=='none' && n.text ? '<p class="spot-next">'+(n.mode==='grab'?'🚗':n.mode==='walk'?'🚶':'🚉')+' '+esc(n.text)+'</p>':'')+'</li>';
  }
  function renderFood(day) {
    return disclosure('🍽️ 吃什么',day.restaurants.map(function(r){return '<article class="food-compact"><strong>'+esc(r.zhName)+'</strong> <a class="spot-nav-btn" target="_blank" rel="noopener" href="'+esc(r.googleMapsUrl)+'">地图</a><p>'+esc(r.recommendedDishes.slice(0,2).join(' · '))+' · '+esc(r.pricePerPerson)+'</p>'+(r.note?'<p class="muted">'+esc(r.note)+'</p>':'')+'</article>';}).join(''));
  }
  function renderDay(day) {
    var main = '', optional = '';
    day.spots.forEach(function(s,i){ if(s.optional) optional += renderSpot(s,i,day.id); else main += renderSpot(s,i,day.id); });
    return '<section class="day-section" id="d'+day.id+'" hidden><h2 class="daily-title">D'+day.id+' · 10月'+Number(day.num)+'日 · '+esc(day.title)+'</h2><ol class="trip-list">'+main+'</ol>'+renderFood(day)+(optional?disclosure('有余力再去','<ol class="trip-list">'+optional+'</ol>'):'')+disclosure('补充说明','<p>'+esc(day.planB)+'</p><p class="muted">交通时间为规划估计；票务、营业与路况以当天为准。</p>')+'</section>';
  }
  document.getElementById('tabContentItinerary').innerHTML = renderStays()+renderBookings()+TRIP.days.map(renderDay).join('');
  var saved = Number(read(DAY_KEY, 1));
  var activeDay = /^[#]d[1-5]$/.test(location.hash) ? Number(location.hash.slice(2)) : (saved>=1 && saved<=5 ? saved : 1);
  function selectDay(day, updateURL) {
    activeDay=Number(day);
    document.querySelectorAll('.day-section').forEach(function(el){el.hidden=el.id!=='d'+activeDay;});
    document.querySelectorAll('#bottomNav a').forEach(function(a){var yes=Number(a.dataset.day)===activeDay;a.classList.toggle('active',yes);if(yes)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    try {localStorage.setItem(DAY_KEY,JSON.stringify(activeDay));} catch (_) {}
    if(updateURL) history.replaceState(null,'','#d'+activeDay);
    if(window.selectMapDay) window.selectMapDay(activeDay);
  }
  window.selectTripDay=function(day){selectDay(day,true);};
  function setTab(tab) {
    ['Itinerary','Map'].forEach(function(name){var yes=(name.toLowerCase()===tab);document.getElementById('tab'+name).classList.toggle('tab-btn--active',yes);document.getElementById('tab'+name).setAttribute('aria-selected',String(yes));document.getElementById('tabContent'+name).classList.toggle('active',yes);});
    if(tab==='map' && window.ensureMap) {window.ensureMap(); window.selectMapDay(activeDay);}
  }
  document.getElementById('tabItinerary').addEventListener('click',function(){setTab('itinerary');});
  document.getElementById('tabMap').addEventListener('click',function(){setTab('map');});
  document.querySelectorAll('#bottomNav a').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();selectDay(a.dataset.day,true);window.scrollTo({top:0,behavior:'auto'});});});
  window.addEventListener('hashchange',function(){if(/^#d[1-5]$/.test(location.hash)) selectDay(Number(location.hash.slice(2)),false);});
  selectDay(activeDay,false);
  document.querySelectorAll('[data-copy]').forEach(function(btn){btn.addEventListener('click',async function(){
    var label=btn.dataset.copy+' ⧉';
    try {
      if(navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(btn.dataset.copy);
      else {var t=document.createElement('textarea');t.value=btn.dataset.copy;document.body.appendChild(t);t.select();var ok=document.execCommand('copy');t.remove();if(!ok)throw new Error('copy');}
      btn.textContent='已复制';
    } catch (_) {btn.textContent='复制失败，请重试';}
    setTimeout(function(){btn.textContent=label;},1400);
  });});
  document.querySelectorAll('.booking-status-dot').forEach(function(button){button.addEventListener('click',function(){
    var item=TRIP.bookings.find(function(b){return (b.id || b.name) === button.dataset.bookingId;});
    if (!item) return;
    var next=bookingStatus(item)==='DONE'?'TODO':'DONE';
    var updated=Object.assign({},bookingState);
    var feedback=document.getElementById('booking-feedback');
    try {
      updated[item.id || item.name]=next;
      localStorage.setItem(BOOKING_KEY,JSON.stringify(updated));
      bookingState=updated;
      var complete=next==='DONE';
      button.classList.toggle('is-complete',complete);
      button.setAttribute('aria-pressed',String(complete));
      button.setAttribute('aria-label',item.name+(complete?'已完成，点击标记为未完成':'未完成，点击标记为已完成'));
      var count=document.querySelector('[data-booking-count]');
      if (count) count.textContent=TRIP.bookings.filter(function(b){return bookingStatus(b)==='DONE';}).length+' / '+TRIP.bookings.length;
      feedback.textContent='已保存';
    } catch (_) {feedback.textContent='无法保存，请允许浏览器本地存储后重试。';}
  });});
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
