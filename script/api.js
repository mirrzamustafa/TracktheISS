const mymap = L.map("map").setView([0, 0], 1);
const attribution =
  '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const url = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
const tile = L.tileLayer(url, { attribution }).addTo(mymap);
const iss = L.icon({
  iconUrl: "images/iss.png",
  iconSize: [70, 45], // size of the icon
  iconAnchor: [25, 16], // point of the icon which will correspond to marker's location
});
marker = L.marker([0, 0], { icon: iss }).addTo(mymap);
firstTime = true;
async function getISS() {
  const request = await fetch(api_url);
  const data = await request.json();
  const lat = data.latitude;
  const lon = data.longitude;
  const vel = data.velocity;
  marker.setLatLng([lat, lon], { icon: iss });
  if (firstTime) {
    mymap.setView([lat, lon], 3);
    firstTime = false;
  }
  document.getElementById("lat").innerHTML = lat;
  document.getElementById("long").innerHTML = lon;
  document.getElementById("vel").innerHTML = vel;
}
getISS();
setInterval(getISS, 1000);
