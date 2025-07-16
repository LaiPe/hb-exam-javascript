import { initMap, setMapByAdress, afficherBornesOnMap } from "./map.js";
import { getNearbyBornes } from "./bornesApi.js"

const afficherBornesHTML = async (gestBornes) => {
    document.getElementById("liste-bornes").innerHTML = gestBornes.toHTML();
}

const afficherFormulaire = (borne) => {
    document.getElementById("form-resa").classList.remove("hidden");
    document.getElementById("info-bornes").innerHTML = borne.toHTML();
}

document.getElementById("form-coord-from-adress").addEventListener("submit", async e => {
    e.preventDefault();

    const adressInput = document.getElementById("adress").value;
    const gestBornes = await getNearbyBornes();
    await setMapByAdress(adressInput.trim());

    afficherBornesHTML(gestBornes);
    const markers = afficherBornesOnMap(gestBornes);
    markers.eachLayer(marker => {
        marker.on("click", () => {
            afficherFormulaire(marker.borne);
        });
    });
});

document.getElementById("change-bornes-vue").addEventListener("click", () => {
    document.getElementById("map").classList.toggle("hidden");
    document.getElementById("liste-bornes").classList.toggle("hidden");
});

initMap();