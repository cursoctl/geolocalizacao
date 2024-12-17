// Verificação para garantir que o template envia latitudes e longitudes válidas
if (typeof lat !== 'undefined' && typeof lon !== 'undefined') {
    var map = L.map('mapDiv').setView([lat, lon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Loop para adicionar marcadores
    {% for biz in items.businesses %}
        var marker = L.marker([{{ biz.coordinates.latitude }}, {{ biz.coordinates.longitude }}]).addTo(map);
        marker.bindPopup("<b>{{ biz.name }}</b><br/>{{ biz.location.display_address.0 }} {{ biz.location.display_address.1 }}<br/>{{ city }}").openPopup();
    {% endfor %}
} else {
    console.log("Nenhum dado de geolocalização disponível para exibir no mapa.");
}
