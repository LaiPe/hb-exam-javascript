const storageName = "reservations";

// CRUD sur le localStorage
export const addReservation = reservation => {
    try {
        const reservations = getAllReservation();
        reservations.push(reservation);
        localStorage.setItem(storageName, JSON.stringify(reservations));
        
        const messageElement = document.getElementById("message-form-resa");
        messageElement.textContent = "Réservation ajoutée avec succès !";
        
        return true;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation:", error);
        const messageElement = document.getElementById("message-form-resa");
        messageElement.textContent = "Erreur lors de l'ajout de la réservation";
        return false;
    }
}

export const getAllReservation = () => {
    try {
        return JSON.parse(localStorage.getItem(storageName)) || [];
    } catch (error) {
        console.error("Erreur lors de la lecture des réservations:", error);
        return [];
    }
}

export const deleteReservation = (index) => {
    try {
        const reservations = getAllReservation();
        reservations.splice(index, 1);
        localStorage.setItem(storageName, JSON.stringify(reservations));
        afficherReservations(); // Actualiser l'affichage
        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        return false;
    }
}

// Manipulation de la DOM
export const afficherFormulaire = (borne) => {
    const formElement = document.getElementById("form-resa");
    const infoElement = document.getElementById("info-bornes");
    
    if (formElement && infoElement) {
        formElement.classList.remove("hidden");
        infoElement.innerHTML = borne.toHTML();
    }
}

export const masquerFormulaire = () => {
    const formElement = document.getElementById("form-resa");
    if (formElement) {
        formElement.classList.add("hidden");
    }
}

export const createReservationFromForm = (borne) => {
    const date = document.getElementById("date-resa")?.value;
    const heureDebut = document.getElementById("heure-resa")?.value;
    const duree = document.getElementById("duree-resa")?.value;
    
    // Validation des champs
    if (!date || !heureDebut || !duree) {
        throw new Error("Tous les champs sont obligatoires");
    }
    
    if (parseInt(duree) <= 0) {
        throw new Error("La durée doit être positive");
    }
    
    // Vérifier que la date n'est pas dans le passé
    const dateResa = new Date(date);
    const aujourd = new Date();
    aujourd.setHours(0, 0, 0, 0);
    
    if (dateResa < aujourd) {
        throw new Error("La date ne peut pas être dans le passé");
    }
    
    return {
        idBorne: borne.id,
        typeBorne: borne.constructor.name || borne.type || "Borne", // Nom de la classe ou propriété type
        date: date,
        heureDebut: heureDebut,
        duree: parseInt(duree),
    }
}

export const afficherReservations = () => {
    const reservations = getAllReservation();
    const ul = document.getElementById("liste-reservations");
    ul.innerHTML = '';

    if (reservations.length == 0) {
        ul.textContent = "Pas de réservations..."
    }

    reservations.forEach(resa => {
        const li = document.createElement("li");
        li.textContent = `Reservation pour la ${resa.typeBorne} ${resa.idBorne} : ${resa.date} @ ${resa.heureDebut}, pour ${resa.duree}h`;
        ul.appendChild(li);
    });
}