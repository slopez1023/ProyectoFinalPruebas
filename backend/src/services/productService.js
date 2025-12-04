const ProductModel = require('../models/productModel');

const ProductService = {
    getAllProducts: () => {
        return ProductModel.getAll();
    },

    getProductById: (id) => {
        const product = ProductModel.getById(id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    },

    createProduct: (productData) => {
        const { name, price, stock } = productData;

        if (!name || name.trim() === '') {
            throw new Error('El nombre es requerido');
        }
        if (price === undefined || price < 0) {
            throw new Error('El precio debe ser mayor o igual a 0');
        }
        if (stock === undefined || stock < 0) {
            throw new Error('El stock debe ser mayor o igual a 0');
        }

        return ProductModel.create({
            ...productData,
            name: name.trim()
        });
    },

    updateProduct: (id, productData) => {
        const { name, price, stock } = productData;

        if (!name || name.trim() === '') {
            throw new Error('El nombre es requerido');
        }
        if (price === undefined || price < 0) {
            throw new Error('El precio debe ser mayor o igual a 0');
        }
        if (stock === undefined || stock < 0) {
            throw new Error('El stock debe ser mayor o igual a 0');
        }

        const updated = ProductModel.update(id, {
            ...productData,
            name: name.trim()
        });

        if (!updated) {
            throw new Error('Producto no encontrado');
        }
        return { id, ...productData };
    },

    deleteProduct: (id) => {
        const deleted = ProductModel.delete(id);
        if (!deleted) {
            throw new Error('Producto no encontrado');
        }
        return true;
    }
};

module.exports = ProductService;
