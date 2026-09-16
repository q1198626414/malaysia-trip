/* ===== 地图（Leaflet）：多瓦片源自动降级 + Timeline 双向联动 ===== */
(function () {
  'use strict';

  var DAY_COLORS = { 1: '#d4a373', 2: '#8fa3b0', 3: '#b0725a', 4: '#6f8f6a', 5: '#6a7ba0' };
  var WALK = '#3f9e6b';
  var GRAB = '#e0a13c';

  // 瓦片源配置（按优先级）
  var TILE_SOURCES = [
    {
      name: 'CartoDB Voyager',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    },
    {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abc',
      maxZoom: 19
    },
    {
      name: 'Esri World Street',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ',
      subdomains: '',
      maxZoom: 18
    }
  ];

  var map = null;
  var mapReady = false;
  var dayLayers = {};
  var nodeLayers = {};
  var currentFilter = 'all';
  var showOptional = true;
  var markersBySpot = {}; // "dayId-index" -> L.marker
  var currentTileLayer = null;
  var tileFailCount = 0;

  function markerIcon(day, n, type) {
    var bg = DAY_COLORS[day] || '#888';
    var content = String(n).padStart(2, '0');
    var size = 26;
    return L.divIcon({
      className: '',
      html: '<div class="map-marker' + (type === 'food' ? ' map-marker--food' : type === 'hotel' ? ' map-marker--hotel' : type === 'transit' ? ' map-marker--transit' : '') + '" style="background:' + bg + '">' + content + '</div>',
      iconSize: [size, size], iconAnchor: [size/2, size/2], popupAnchor: [0, -size/2]
    });
  }

  function addTileLayer(srcIndex) {
    if (currentTileLayer) {
      map.removeLayer(currentTileLayer);
      currentTileLayer = null;
    }
    var src = TILE_SOURCES[srcIndex];
    if (!src) return false;
    currentTileLayer = L.tileLayer(src.url, {
      attribution: src.attribution,
      subdomains: src.subdomains,
      maxZoom: src.maxZoom,
      crossOrigin: true
    });
    currentTileLayer.on('tileerror', function () {
      tileFailCount++;
      if (tileFailCount > 6) {
        // 尝试下一个瓦片源
        var nextIndex = srcIndex + 1;
        if (nextIndex < TILE_SOURCES.length) {
          tileFailCount = 0;
          addTileLayer(nextIndex);
        } else {
          showMapFallback();
        }
      }
    });
    currentTileLayer.addTo(map);
    return true;
  }

  function showMapFallback() {
    var mapEl = document.getElementById('map');
    if (!mapEl) return;
    // 隐藏地图，显示降级 UI
    mapEl.style.display = 'none';
    var fallback = document.getElementById('mapFallback');
    if (fallback) fallback.open = true;
    var status = document.getElementById('mapFallbackStatus');
    if (status) status.textContent = '地图服务暂时不可用，以下文字路线仍可正常使用。';
    renderFallbackRoutes();
  }

  function renderFallbackRoutes() {
    var container = document.getElementById('mapFallbackRoutes');
    if (!container) return;
    var filter = currentFilter === 'all' ? null : parseInt(currentFilter, 10);
    var html = '';
    TRIP.days.forEach(function (day) {
      if (filter && day.id !== filter) return;
      html += '<div class="fallback-day"><h4>Day ' + day.id + '｜' + day.title + '</h4><ol>';
      var visibleNum = 0;
      day.spots.forEach(function (s, i) {
        if (!TRIP.isMapLocation(s) || (!showOptional && s.optional)) return;
        var num = ++visibleNum;
        html += '<li><b>' + num + '.</b> ' + s.zh + ' ' + s.en + '</li>';
        if (s.next && s.next.mode !== 'none' && i < day.spots.length - 1) {
          html += '<li class="fallback-arrow">↓ ' + s.next.text + '</li>';
        }
      });
      html += '</ol>';
      if (day.id === 3) html += '<p class="fallback-route-note">D3 按公共交通分段执行，不生成整天驾车路线。</p></div>';
      else {
        var waypoints = day.spots.filter(function (s) { return TRIP.isMapLocation(s) && (showOptional || !s.optional); }).map(function (s) { return s.lat + ',' + s.lng; }).join('/');
        html += '<a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/' + waypoints + '">📍 在 Google Maps 查看今日路线</a></div>';
      }
    });
    container.innerHTML = html;
  }

  function buildMap() {
    map = L.map('map', { scrollWheelZoom: false });
    addTileLayer(0);

    // 构建 day layers
    TRIP.days.forEach(function (day) {
      var group = L.layerGroup();
      var spots = day.spots;
      var visibleNum = 0;

      spots.forEach(function (s, i) {
        if (!TRIP.isMapLocation(s) || (!showOptional && s.optional)) return;
        visibleNum++;
        var next = s.next || {};
        var nextLine = (next.mode && next.mode !== 'none' && i < spots.length - 1)
          ? '<div class="map-popup-next">' +
            (next.mode === 'grab' ? '🚗 ' : next.mode === 'walk' ? '🚶 ' : '🚉 ') + next.text + '</div>'
          : '';
        var imgThumb = s.image
          ? '<img src="' + s.image + '" alt="' + (s.imageAlt || s.zh) + '" class="map-popup-img" loading="lazy" onerror="this.style.display=\'none\'">'
          : '';
        var m = L.marker([s.lat, s.lng], { icon: markerIcon(day.id, i + 1, s.type) })
          .addTo(group)
          .bindPopup(
            '<div class="map-popup">' + imgThumb +
              '<b>' + s.zh + '</b><br>' + s.en +
              '<div class="map-popup-meta">D' + day.id + ' · 第 ' + String(i + 1).padStart(2, '0') + ' 站 · ' + (s.priority || 'MUST') + ' · ' + (s.duration || '') + '</div>' +
              nextLine +
              '<div class="map-popup-btns">' +
                '<a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + s.lat + ',' + s.lng + '">📍 地点</a>' +
                '<a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + s.lat + ',' + s.lng + '">🧭 导航</a>' +
              '</div>' +
            '</div>'
          );
        m.on('click', function () {
          // Timeline 联动：滚动到对应行程卡片
          var el = document.getElementById('d' + day.id + '-spot-' + i);
          if (el) {
            setActiveTab('itinerary');
            setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          }
        });
        markersBySpot[day.id + '-' + i] = m;
      });

      // 只画步行 / Grab 路段
      spots.forEach(function (s, i) {
        if (!TRIP.isMapLocation(s) || (!showOptional && s.optional)) return;
        var next = s.next || {};
        if (!next.mode || next.mode === 'none' || next.mode === 'transit' || i >= spots.length - 1) return;
        var b = spots[i + 1];
        if (!TRIP.isMapLocation(b) || (!showOptional && b.optional) || (next.mode !== 'walk' && next.mode !== 'grab')) return;
        L.polyline([[s.lat, s.lng], [b.lat, b.lng]], {
          color: next.mode === 'walk' ? WALK : GRAB,
          weight: 3, opacity: 0.85,
          dashArray: next.mode === 'walk' ? '6 7' : null,
          lineJoin: 'round'
        }).addTo(group);
      });

      dayLayers[day.id] = group;
    });

    (TRIP.transitNodes || []).filter(TRIP.isMapLocation).forEach(function (n) {
      nodeLayers[n.day] = nodeLayers[n.day] || L.layerGroup();
      L.marker([n.lat, n.lng], {
        icon: L.divIcon({ className: '', html: '<div class="map-marker map-marker--node">🚌</div>', iconSize: [22, 22], iconAnchor: [11, 11] })
      }).addTo(nodeLayers[n.day]).bindPopup('<div class="map-popup"><b>' + n.name + '</b><div class="map-popup-meta">交通节点 · 长途巴士</div></div>');
    });

    applyFilter('all');
  }

  function applyFilter(f) {
    currentFilter = f;
    Object.keys(dayLayers).forEach(function (id) {
      var show = f === 'all' || String(f) === String(id);
      if (show) { if (!map.hasLayer(dayLayers[id])) dayLayers[id].addTo(map); }
      else if (map.hasLayer(dayLayers[id])) map.removeLayer(dayLayers[id]);
    });
    Object.keys(nodeLayers).forEach(function (id) {
      var show = f === 'all' || String(f) === String(id);
      if (show) { if (!map.hasLayer(nodeLayers[id])) nodeLayers[id].addTo(map); }
      else if (map.hasLayer(nodeLayers[id])) map.removeLayer(nodeLayers[id]);
    });

    var pts = [];
    TRIP.days.forEach(function (day) {
      if (f !== 'all' && String(day.id) !== String(f)) return;
      day.spots.filter(function (s) { return TRIP.isMapLocation(s) && (showOptional || !s.optional); }).forEach(function (s) { pts.push([s.lat, s.lng]); });
    });
    Object.keys(nodeLayers).forEach(function (id) {
      if (f === 'all' || String(id) === String(f)) nodeLayers[id].eachLayer(function (l) { var ll = l.getLatLng(); pts.push([ll.lat, ll.lng]); });
    });
    if (pts.length === 1) map.setView(pts[0], 14);
    else if (pts.length > 1) map.fitBounds(L.latLngBounds(pts).pad(0.18));

    // 更新降级路线
    renderFallbackRoutes();
  }

  function setActiveTab(tab) {
    // 从 app.js 中复用，或手动触发
    var btn = tab === 'map' ? document.getElementById('tabMap') : document.getElementById('tabItinerary');
    if (btn) btn.click();
  }

  function buildFilterUI() {
    var wrap = document.getElementById('mapFilter');
    if (!wrap || wrap._bound) return;
    wrap._bound = true;
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      wrap.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');
      applyFilter(btn.getAttribute('data-day'));
    });
  }

  function buildOptionalToggle() {
    var toggle = document.getElementById('mapOptionalToggle');
    if (!toggle || toggle._bound) return;
    toggle._bound = true;
    toggle.addEventListener('change', function () {
      showOptional = toggle.checked;
      if (map) {
        Object.keys(dayLayers).forEach(function (id) { if (map.hasLayer(dayLayers[id])) map.removeLayer(dayLayers[id]); });
        dayLayers = {}; nodeLayers = {}; markersBySpot = {};
        mapReady = false;
        map.remove();
        map = null;
        document.getElementById('map').style.display = '';
        window.ensureMap();
      }
      renderFallbackRoutes();
    });
  }

  // 暴露给 app.js：点击 Timeline 地点时飞至地图 Marker
  window.flyToSpot = function (dayId, spotIndex) {
    if (!map) return;
    applyFilter(String(dayId));
    document.querySelectorAll('#mapFilter .filter-btn').forEach(function (btn) { btn.classList.toggle('filter-btn--active', btn.getAttribute('data-day') === String(dayId)); });
    var key = dayId + '-' + spotIndex;
    var m = markersBySpot[key];
    if (m) {
      var latlng = m.getLatLng();
      map.flyTo(latlng, 16, { duration: 0.8 });
      m.openPopup();
    }
  };

  window.ensureMap = function () {
    if (!mapReady) {
      mapReady = true;
      buildMap();
      buildFilterUI();
      buildOptionalToggle();
      return;
    }
    if (map) setTimeout(function () { map.invalidateSize(); }, 60);
  };
})();
