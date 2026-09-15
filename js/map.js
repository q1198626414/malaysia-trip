/* ===== 地图（Leaflet）：数据来自 data.js；只画步行 / Grab 路段 ===== */
(function () {
  'use strict';

  var DAY_COLORS = { 1: '#d4a373', 2: '#8fa3b0', 3: '#b0725a', 4: '#6f8f6a', 5: '#6a7ba0' };
  var WALK = '#3f9e6b';
  var GRAB = '#e0a13c';

  var map = null;
  var mapReady = false;
  var dayLayers = {};   // dayId -> L.layerGroup (markers + routes)
  var nodeLayers = {};  // 交通节点
  var currentFilter = 'all';

  function markerIcon(day, n, dim) {
    return L.divIcon({
      className: '',
      html: '<div class="map-marker" style="background:' + DAY_COLORS[day] + (dim ? ';opacity:.55' : '') + '">' + n + '</div>',
      iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -14]
    });
  }

  function buildMap() {
    map = L.map('map', { scrollWheelZoom: false });

    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    });
    tiles.on('tileerror', function () {
      var hint = document.getElementById('mapOfflineHint');
      if (hint) hint.hidden = false;
    });
    tiles.addTo(map);

    TRIP.days.forEach(function (day) {
      var group = L.layerGroup();
      var spots = day.spots;

      spots.forEach(function (s, i) {
        var next = s.next || {};
        var nextLine = (next.mode && next.mode !== 'none' && i < spots.length - 1)
          ? '<div class="map-popup-next">' +
            (next.mode === 'grab' ? '🚗 ' : next.mode === 'walk' ? '🚶 ' : '🚉 ') + next.text + '</div>'
          : '';
        L.marker([s.lat, s.lng], { icon: markerIcon(day.id, i + 1) })
          .addTo(group)
          .bindPopup(
            '<div class="map-popup">' +
              '<b>' + s.zh + '</b><br>' + s.en +
              '<div class="map-popup-meta">D' + day.id + ' · 第 ' + (i + 1) + ' 站</div>' +
              nextLine +
              '<a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + s.lat + ',' + s.lng + '">📍 Google Maps</a>' +
            '</div>'
          );
      });

      // 只画步行 / Grab 路段；transit 段不画线
      spots.forEach(function (s, i) {
        var next = s.next || {};
        if (!next.mode || next.mode === 'none' || next.mode === 'transit' || i >= spots.length - 1) return;
        var b = spots[i + 1];
        L.polyline([[s.lat, s.lng], [b.lat, b.lng]], {
          color: next.mode === 'walk' ? WALK : GRAB,
          weight: 3, opacity: 0.85,
          dashArray: next.mode === 'walk' ? '6 7' : null,
          lineJoin: 'round'
        }).addTo(group);
      });

      dayLayers[day.id] = group;
    });

    (TRIP.transitNodes || []).forEach(function (n) {
      nodeLayers[n.day] = nodeLayers[n.day] || L.layerGroup();
      L.marker([n.lat, n.lng], {
        icon: L.divIcon({
          className: '',
          html: '<div class="map-marker map-marker--node">🚌</div>',
          iconSize: [24, 24], iconAnchor: [12, 12]
        })
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

    // 自动缩放
    var pts = [];
    TRIP.days.forEach(function (day) {
      if (f !== 'all' && String(day.id) !== String(f)) return;
      day.spots.forEach(function (s) { pts.push([s.lat, s.lng]); });
    });
    if (f !== 'all' && nodeLayers[f]) {
      nodeLayers[f].eachLayer(function (l) {
        var ll = l.getLatLng(); pts.push([ll.lat, ll.lng]);
      });
    }
    if (pts.length === 1) map.setView(pts[0], 14);
    else if (pts.length > 1) map.fitBounds(L.latLngBounds(pts).pad(0.18));
  }

  function buildFilterUI() {
    var wrap = document.getElementById('mapFilter');
    if (!wrap) return;
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      wrap.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');
      applyFilter(btn.getAttribute('data-day'));
    });
  }

  window.ensureMap = function () {
    if (!mapReady) {
      mapReady = true;
      buildMap();
      buildFilterUI();
      return;
    }
    if (map) setTimeout(function () { map.invalidateSize(); }, 40);
  };
})();
