import {BornePublique, BornePrivee, GestionnaireBorne} from "./bornes.js";

const names = ["Pierre" ,"Quentin" , "Selim" , "Jerome" , "Elijah" , "Bilel" , "Cloé" ,"Remi" ,"Vincent", "Martin", "Virginie", "Léo"];

const fetchBornesJSON = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
    }
}

const getRandomName = () => {
    return names[Math.floor(Math.random() * names.length)];
};

export const getNearbyBornes = async () => {
    const gestBornes = new GestionnaireBorne;

    try {
        // TODELETE fetch data local
        const data = await fetchBornesJSON('../data/bornes.json');

        data.features.forEach(element => {
            let borne;
            const id = parseInt(element.id.slice(5));
            const lon = element.geometry.coordinates[0];
            const lat = element.geometry.coordinates[1];

            if (id % 2 == 0) {
                borne = new BornePublique(id, lat, lon);
                gestBornes.ajouterBorne(borne);
            } else {
                borne = new BornePrivee(id, lat, lon, getRandomName());
                gestBornes.ajouterBorne(borne)
            }

            console.log(borne);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des bornes:', error);
    }
    return gestBornes;
}