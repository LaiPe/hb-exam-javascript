class Borne {
    constructor(id,lat,lon) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
    }

    // Méthode utilitaire pour valider les coordonnées
    isValidCoordinates() {
        const latValid = this.lat >= -90 && this.lat <= 90;
        const lonValid = this.lon >= -180 && this.lon <= 180;
        return latValid && lonValid;
    }

    // Méthode de rendu HTML
    toHTML() {
        return "<li>Borne factice</li>"
    }
}

class BornePublique extends Borne {
    constructor(id,lat,lon) {
        super(id,lat,lon);
    }

    toHTML() {
        const li = document.createElement("li");
        if (this.isValidCoordinates()) {
            li.textContent = `Borne ${this.id} - latitude : ${this.lat}, longitude : ${this.lon}`;
        } else {
            li.textContent = "Borne avec coordonnées invalides !"
        }
        return li.outerHTML;
    }
}

class BornePrivee extends Borne {
    constructor(id,lat,lon,owner) {
        super(id,lat,lon);
        this.owner = owner;
    }

    toHTML() {
        const li = document.createElement("li");
        if (this.isValidCoordinates()) {
            li.textContent = `Borne ${this.id} de ${this.owner} - latitude : ${this.lat}, longitude : ${this.lon}`;
        } else {
            li.textContent = "Borne avec coordonnées invalides !"
        }
        return li.outerHTML;
    }
}

class GestionnaireBorne {
    constructor() {
        this.gestionnaire = [];
    }

    ajouterBorne(borne) {
        if (borne instanceof Borne) {
            this.bornes.push(borne);
        } else {
            throw new Error('Objet doit être une instance de Borne');
        }
    }

    toHTML() {
        const ul = document.createElement('ul');
        ul.className = 'liste-bornes';
        
        this.bornes.forEach(borne => {
            ul.innerHTML += borne.toHTML();
        });
        
        return ul.outerHTML;
    }
}

export {Borne, BornePublique, BornePrivee, GestionnaireBorne}