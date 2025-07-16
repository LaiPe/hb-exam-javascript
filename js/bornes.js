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
            li.textContent = `Borne publique ${this.id} - latitude : ${this.lat}, longitude : ${this.lon}`;
        } else {
            li.textContent = "Borne avec coordonnées invalides !"
        }
        return li.outerHTML;
    }
}

class BornePrivee extends BornePublique {
    constructor(id,lat,lon,owner) {
        super(id,lat,lon);
        this.owner = owner;
    }

    toHTML() {
        const li = document.createElement("li");
        if (this.isValidCoordinates()) {
            li.textContent = `Borne privée ${this.id} de ${this.owner} - latitude : ${this.lat}, longitude : ${this.lon}`;
        } else {
            li.textContent = "Borne avec coordonnées invalides !"
        }
        return li.outerHTML;
    }
}

class GestionnaireBorne {
    constructor() {
        this.bornes = [];
    }

    ajouterBorne(borne) {
        if (borne instanceof Borne) {
            this.bornes.push(borne);
        } else {
            throw new Error('Objet doit être une instance de Borne');
        }
    }

    // Rendre l'objet itérable
    [Symbol.iterator]() {
        return this.bornes[Symbol.iterator]();
    }
    
    // Méthode forEach personnalisée
    forEach(callback, thisArg) {
        this.bornes.forEach(callback, thisArg);
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