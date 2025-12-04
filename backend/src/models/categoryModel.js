const db = require('../config/database');

const CategoryModel = {
    getAll: () => {
        const stmt = db.prepare('SELECT * FROM categories');
        return stmt.all();
    },

    getById: (id) => {
        const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
        return stmt.get(id);
    },

    create: (name) => {
        const stmt = db.prepare('INSERT INTO categories (name) VALUES (?)');
        const result = stmt.run(name);
        return { id: result.lastInsertRowid, name };
    },

    update: (id, name) => {
        const stmt = db.prepare('UPDATE categories SET name = ? WHERE id = ?');
        const result = stmt.run(name, id);
        return result.changes > 0;
    },

    delete: (id) => {
        const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
        const result = stmt.run(id);
        return result.changes > 0;
    }
};

module.exports = CategoryModel;
