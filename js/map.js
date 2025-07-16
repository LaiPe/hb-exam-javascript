import {getCoordFromAdress, getCurrentLocationCoord} from "./coordsApi.js";

let map;

const redIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const initMap = async () => {
    const mapContainer = document.getElementById("map");
    const mapMessage = document.getElementById("map-message");

    // Affichage du message de loading
    mapMessage.style.color = "black";
    mapMessage.textContent = "Chargement de la carte..."

    try {
        // Fetch des coordonnées courantes
        const coords = await getCurrentLocationCoord();

        // Suppression message loading
        mapMessage.textContent = ""

        // Config de la map avec les coordonnées
        map = L.map(mapContainer).setView([coords.lat, coords.lon],13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map); 

    } catch (error) {
        mapMessage.style.color = "red";
        mapMessage.textContent = "Erreur lors du chargement de la carte !";
    }
}

export const setMapByAdress = async (adress) => {
    const coords = await getCoordFromAdress(adress);

    // console.log(coords);

    // Redirection de la vue de la map vers la nouvelle localisation
    map.setView([coords.lat, coords.lon],14);

    // Ajout d'un marqueur rouge à la nouvelle localisation
    L.marker([coords.lat, coords.lon],{icon: redIcon}).addTo(map);
}