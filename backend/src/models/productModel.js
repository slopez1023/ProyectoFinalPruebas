const db = require('../config/database');

const ProductModel = {
    getAll: () => {
        const stmt = db.prepare(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
        `);
        return stmt.all();
    },

    getById: (id) => {
        const stmt = db.prepare(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.id = ?
        `);
        return stmt.get(id);
    },

    create: (product) => {
        const { name, description, price, stock, category_id } = product;
        const stmt = db.prepare(`
            INSERT INTO products (name, description, price, stock, category_id) 
            VALUES (?, ?, ?, ?, ?)
        `);
        const result = stmt.run(name, description, price, stock, category_id);
        return { id: result.lastInsertRowid, ...product };
    },

    update: (id, product) => {
        const { name, description, price, stock, category_id } = product;
        const stmt = db.prepare(`
            UPDATE products 
            SET name = ?, description = ?, price = ?, stock = ?, category_id = ? 
            WHERE id = ?
        `);
        const result = stmt.run(name, description, price, stock, category_id, id);
        return result.changes > 0;
    },

    delete: (id) => {
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        const result = stmt.run(id);
        return result.changes > 0;
    }
};

module.exports = ProductModel;
