// import {Borne, BornePublique, BornePrivee, GestionnaireBorne} from "./bornes.js";

// const borne1 = new BornePublique("001", 48.8566, 2.3522);
// const borne2 = new BornePrivee("002", 48.8606, 2.3376, "Jean Dupont");
// const borne3 = new BornePublique("003", 48.8738, 2.2950);

// const gest = new GestionnaireBorne();
// gest.ajouterBorne(borne1);
// gest.ajouterBorne(borne2);
// gest.ajouterBorne(borne3);

// document.querySelector("main").innerHTML = gest.toHTML();


import { initMap, setMapByAdress } from "./map.js";
import { getNearbyBornes } from "./bornesApi.js"


document.getElementById("form-coord-from-adress").addEventListener("submit", e => {
    e.preventDefault();
    const adressInput = document.getElementById("adress").value;
    setMapByAdress(adressInput.trim());
})

initMap();

const afficherBornes = async () => {
    const gestBornes = await getNearbyBornes();
    document.getElementById("liste-bornes").innerHTML = gestBornes.toHTML();
}
afficherBornes();