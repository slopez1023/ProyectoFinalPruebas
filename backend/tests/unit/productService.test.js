const ProductService = require('../../src/services/productService');
const ProductModel = require('../../src/models/productModel');

jest.mock('../../src/models/productModel');

describe('ProductService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createProduct', () => {
        test('debe crear un producto correctamente', () => {
            const productData = {
                name: 'Laptop',
                description: 'Laptop gaming',
                price: 1500,
                stock: 10,
                category_id: 1
            };
            const mockProduct = { id: 1, ...productData };
            ProductModel.create.mockReturnValue(mockProduct);

            const result = ProductService.createProduct(productData);

            expect(result).toEqual(mockProduct);
        });

        test('debe lanzar error si el nombre esta vacio', () => {
            expect(() => {
                ProductService.createProduct({
                    name: '',
                    price: 100,
                    stock: 5
                });
            }).toThrow('El nombre es requerido');
        });

        test('debe lanzar error si el precio es negativo', () => {
            expect(() => {
                ProductService.createProduct({
                    name: 'Test',
                    price: -10,
                    stock: 5
                });
            }).toThrow('El precio debe ser mayor o igual a 0');
        });

        test('debe lanzar error si el stock es negativo', () => {
            expect(() => {
                ProductService.createProduct({
                    name: 'Test',
                    price: 100,
                    stock: -5
                });
            }).toThrow('El stock debe ser mayor o igual a 0');
        });
    });

    describe('getAllProducts', () => {
        test('debe retornar todos los productos', () => {
            const mockProducts = [
                { id: 1, name: 'Laptop', price: 1500 },
                { id: 2, name: 'Mouse', price: 50 }
            ];
            ProductModel.getAll.mockReturnValue(mockProducts);

            const result = ProductService.getAllProducts();

            expect(result).toEqual(mockProducts);
        });
    });

    describe('getProductById', () => {
        test('debe retornar un producto por id', () => {
            const mockProduct = { id: 1, name: 'Laptop', price: 1500 };
            ProductModel.getById.mockReturnValue(mockProduct);

            const result = ProductService.getProductById(1);

            expect(result).toEqual(mockProduct);
        });

        test('debe lanzar error si el producto no existe', () => {
            ProductModel.getById.mockReturnValue(undefined);

            expect(() => {
                ProductService.getProductById(999);
            }).toThrow('Producto no encontrado');
        });
    });

    describe('updateProduct', () => {
        test('debe actualizar un producto', () => {
            const productData = {
                name: 'Laptop Actualizada',
                description: 'Nueva descripcion',
                price: 2000,
                stock: 15,
                category_id: 1
            };
            ProductModel.update.mockReturnValue(true);

            const result = ProductService.updateProduct(1, productData);

            expect(result.name).toBe('Laptop Actualizada');
        });

        test('debe lanzar error si el producto no existe', () => {
            ProductModel.update.mockReturnValue(false);

            expect(() => {
                ProductService.updateProduct(999, {
                    name: 'Test',
                    price: 100,
                    stock: 5
                });
            }).toThrow('Producto no encontrado');
        });
    });

    describe('deleteProduct', () => {
        test('debe eliminar un producto', () => {
            ProductModel.delete.mockReturnValue(true);

            const result = ProductService.deleteProduct(1);

            expect(result).toBe(true);
        });

        test('debe lanzar error si el producto no existe', () => {
            ProductModel.delete.mockReturnValue(false);

            expect(() => {
                ProductService.deleteProduct(999);
            }).toThrow('Producto no encontrado');
        });
    });
});
