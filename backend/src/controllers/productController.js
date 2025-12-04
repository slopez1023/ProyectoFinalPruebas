const ProductService = require('../services/productService');

const ProductController = {
    getAll: (req, res) => {
        try {
            const products = ProductService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: (req, res) => {
        try {
            const product = ProductService.getProductById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    create: (req, res) => {
        try {
            const product = ProductService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    update: (req, res) => {
        try {
            const product = ProductService.updateProduct(req.params.id, req.body);
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: (req, res) => {
        try {
            ProductService.deleteProduct(req.params.id);
            res.json({ message: 'Producto eliminado' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = ProductController;
