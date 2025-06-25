// Refactored to use map() and reverse() for newest-first display
function addStations(stations) {
  document.getElementById("station-list").innerHTML = "";
  stations.slice().reverse().forEach(station => addStationElement(station));
}

// Alternative: while loop version for comparison
function addStationsWhile(stations) {
  document.getElementById("station-list").innerHTML = "";
  let i = stations.length - 1;
  while (i >= 0) {
    addStationElement(stations[i]);
    i--;
  }
}

// 💌 Wishlist Renderer
const wishlist = [
  "Picnic Tables",
  "Water Fountain",
  "Dog Park Area"
];

function renderWishlist() {
  const wishlistSection = document.getElementById("wishlist");
  const ul = document.createElement("ul");
  wishlist.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  // Remove old list if present
  const oldUl = wishlistSection.querySelector("ul");
  if (oldUl) oldUl.remove();
  wishlistSection.appendChild(ul);
}

// ❌ Search Feedback
function searchStations(query) {
  const results = stations.filter(station =>
    station.name.toLowerCase().includes(query.toLowerCase())
  );
  const feedback = document.getElementById("search-feedback");
  if (results.length === 0) {
    feedback.textContent = "No stations found matching your search.";
  } else {
    feedback.textContent = "";
    addStations(results);
  }
}

// 🌟 Random Featured Station
function pickFeaturedStation() {
  const featuredSection = document.getElementById("featured-station");
  const openStations = stations; // If you add an 'open' property, filter here
  if (openStations.length === 0) return;
  const randomIndex = Math.floor(Math.random() * openStations.length);
  const station = openStations[randomIndex];
  featuredSection.innerHTML = `<h2>Featured Station</h2><div class="station"><h3>${station.name}</h3><p><strong>Location:</strong> ${station.location}</p><p><strong>Type:</strong> ${station.type}</p></div>`;
}

// 🏙️ Group by City
function groupStationsByCity() {
  const grouped = {};
  stations.forEach(station => {
    if (!grouped[station.location]) grouped[station.location] = [];
    grouped[station.location].push(station);
  });
  const groupedSection = document.getElementById("grouped-stations");
  groupedSection.innerHTML = '<h2>Stations Grouped by City</h2>';
  Object.keys(grouped).forEach(city => {
    const cityDiv = document.createElement("div");
    cityDiv.innerHTML = `<h3>${city}</h3>`;
    grouped[city].forEach(station => {
      const div = document.createElement("div");
      div.className = "station";
      div.innerHTML = `<h4>${station.name}</h4><p class='station-desc'>${station.description || ""}</p><p><strong>Type:</strong> ${station.type}</p>`;
      cityDiv.appendChild(div);
    });
    groupedSection.appendChild(cityDiv);
  });
}

// Dropdown filter for city
function renderCityDropdown() {
  const cities = Array.from(new Set(stations.map(s => s.location)));
  const controls = document.getElementById("toggle-controls");
  let dropdown = document.getElementById("city-dropdown");
  if (!dropdown) {
    dropdown = document.createElement("select");
    dropdown.id = "city-dropdown";
    dropdown.innerHTML = `<option value="">All Cities</option>` +
      cities.map(city => `<option value="${city}">${city}</option>`).join("");
    dropdown.onchange = function() {
      if (this.value) {
        addStations(stations.filter(s => s.location === this.value));
      } else {
        addStations(stations);
      }
    };
    controls.appendChild(dropdown);
  }
}

// 🔄 Filter Toggle
let showOnlyPlaygrounds = false;
function toggleFilteredStations() {
  showOnlyPlaygrounds = !showOnlyPlaygrounds;
  const toggleBtn = document.getElementById("toggle-btn");
  toggleBtn.textContent = showOnlyPlaygrounds ? "Show All Stations" : "Show Only Playgrounds";
  const filtered = showOnlyPlaygrounds ? stations.filter(s => s.type === "Playground") : stations;
  addStations(filtered);
}

// Add toggle button to DOM
window.addEventListener("DOMContentLoaded", () => {
  renderWishlist();
  pickFeaturedStation();
  groupStationsByCity();
  // Add toggle button
  const toggleSection = document.getElementById("toggle-controls");
  const btn = document.createElement("button");
  btn.id = "toggle-btn";
  btn.textContent = "Show Only Playgrounds";
  btn.onclick = toggleFilteredStations;
  toggleSection.appendChild(btn);
  // Add city dropdown
  renderCityDropdown();
});

// Load stations on page start
addStations(stations);
