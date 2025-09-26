cat <<'EOF' > gom-map.js
/* gom-map.js */
const map = L.map("map").setView([10.4, 78.0], 9);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Load GeoJSON (you’ll add the file later)
fetch("gom-layers.geojson")
  .then(r => r.json())
  .then(data => L.geoJSON(data, {
    onEachFeature: (f, l) => {
      l.bindPopup(f.properties.name || f.properties.label);
    }
  }).addTo(map));

// Search (client‑side)
document.getElementById("search").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  map.eachLayer(layer => {
    if (layer.feature && layer.feature.properties.name.toLowerCase().includes(query)) {
      layer.setStyle({color: "#ff0000"});
    } else if (layer.feature) {
      layer.setStyle({color: "#3388ff"});
    }
  });
});
EOF