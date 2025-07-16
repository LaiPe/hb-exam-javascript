import { initMap, setMapByAdress, afficherBornesOnMap } from "./map.js";
import { getNearbyBornes } from "./bornesApi.js";
import { addReservation, afficherFormulaire, createReservationFromForm, afficherReservations } from "./reservation.js";

let borneSelectedForReservation;

const afficherBornesHTML = async (gestBornes) => {
    document.getElementById("liste-bornes").innerHTML = gestBornes.toHTML();
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
            borneSelectedForReservation = marker.borne;
        });
    });
});

document.getElementById("form-resa").addEventListener("submit", e => {
    e.preventDefault();
    addReservation(createReservationFromForm(borneSelectedForReservation));
    afficherReservations();
});

document.getElementById("change-bornes-vue").addEventListener("click", () => {
    document.getElementById("map").classList.toggle("hidden");
    document.getElementById("liste-bornes").classList.toggle("hidden");
});

initMap();
afficherReservations();