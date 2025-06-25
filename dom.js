function addStationElement(station) {
    const list = document.getElementById("station-list");
    const div = document.createElement("div");
    div.className = "station";
    div.innerHTML = `
      <img src="assets/park.jpg" alt="Park view" class="station-img" />
      <h3>${station.name}</h3>
      <p class="station-desc">${station.description || ""}</p>
      <p><strong>Location:</strong> ${station.location}</p>
      <p><strong>Type:</strong> ${station.type}</p>
    `;
    list.appendChild(div);
}
