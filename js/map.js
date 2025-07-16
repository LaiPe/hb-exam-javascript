import {getCoordFromAdress, getCurrentLocationCoord} from "./coordsApi.js";

let map;

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
    map.setView([coords.lat, coords.lon],14);
}