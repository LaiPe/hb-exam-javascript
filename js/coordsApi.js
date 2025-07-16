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

export const getCurrentLocationCoord = () => {
    return new Promise((resolve, reject) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 2000,
        };

        const success = pos => {
            const result = {
                lat : pos.coords.latitude, 
                lon : pos.coords.longitude
            }
            console.log("Géolocalisation aquise : latitude =", result.lat,"; longitude =", result.lon);
            resolve(result);
        };

        const error = err => {
            console.warn(`ERREUR (${err.code}): ${err.message}`);
            reject(err);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    });
}