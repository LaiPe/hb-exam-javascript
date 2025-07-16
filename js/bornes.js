class Borne {
    constructor(id,lat,lon) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
    }

    toHTML() {
        return "<li>Erreur : Borne factice</li>"
    }
}

class BornePublique extends Borne {
    constructor(id,lat,lon) {
        super(id,lat,lon);
    }

    toHTML() {
        const li = document.createElement("li");
        li.textContent = `Borne n°${this.id} - latitude : ${this.lat}, longitude : ${this.lon}`;
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
        li.textContent = `Borne n°${this.id} de ${this.owner} - latitude : ${this.lat}, longitude : ${this.lon}`;
        return li.outerHTML;
    }
}

