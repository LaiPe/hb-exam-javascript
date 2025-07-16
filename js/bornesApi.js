export const getCoordFromAdress = async(adress) => {
    return fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adress)}&format=jsonv2`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                throw new Error(`Aucun résultat trouvé pour l'adresse: ${adress}`);
            }
            
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                display_name: data[0].display_name
            };
        })
        .catch(error => {
            console.error('Erreur lors de la géolocalisation:', error);
            throw error;
        });
};