class EntityManager {
    constructor() {
        this.entities = [];
    }

    add(entity) {
        this.entities.push(entity);
    }

    remove(entity) {
        this.entities = this.entities.filter(e => e !== entity);
    }

    updateAll(dt) {
        this.entities.forEach(entity => entity.update(dt));
    }

    // Weitere allgemeine Methoden ...
}

export {EntityManager}