const CategoryService = require('../services/categoryService');

const CategoryController = {
    getAll: (req, res) => {
        try {
            const categories = CategoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: (req, res) => {
        try {
            const category = CategoryService.getCategoryById(req.params.id);
            res.json(category);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    create: (req, res) => {
        try {
            const category = CategoryService.createCategory(req.body.name);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    update: (req, res) => {
        try {
            const category = CategoryService.updateCategory(req.params.id, req.body.name);
            res.json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: (req, res) => {
        try {
            CategoryService.deleteCategory(req.params.id);
            res.json({ message: 'Categoria eliminada' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = CategoryController;
