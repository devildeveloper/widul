var map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);
map.locate({setView: true, maxZoom: 16});
function onLocationFound(e) {
	console.log(e.latlng);
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
        .bindPopup("Estas dentro de  " + radius + " metros en este punto").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
    var pos=[-12.1192896,-77.0336169]
    map.setView(pos,16);
    L.marker(pos).addTo(map)
        .bindPopup("No se donde estes, pero te puse aqui.").openPopup();
}

map.on('locationerror', onLocationError);