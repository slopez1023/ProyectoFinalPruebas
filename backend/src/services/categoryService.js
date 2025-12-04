const CategoryModel = require('../models/categoryModel');

const CategoryService = {
    getAllCategories: () => {
        return CategoryModel.getAll();
    },

    getCategoryById: (id) => {
        const category = CategoryModel.getById(id);
        if (!category) {
            throw new Error('Categoria no encontrada');
        }
        return category;
    },

    createCategory: (name) => {
        if (!name || name.trim() === '') {
            throw new Error('El nombre es requerido');
        }
        return CategoryModel.create(name.trim());
    },

    updateCategory: (id, name) => {
        if (!name || name.trim() === '') {
            throw new Error('El nombre es requerido');
        }
        const updated = CategoryModel.update(id, name.trim());
        if (!updated) {
            throw new Error('Categoria no encontrada');
        }
        return { id, name: name.trim() };
    },

    deleteCategory: (id) => {
        const deleted = CategoryModel.delete(id);
        if (!deleted) {
            throw new Error('Categoria no encontrada');
        }
        return true;
    }
};

module.exports = CategoryService;
