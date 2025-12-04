const CategoryService = require('../../src/services/categoryService');
const CategoryModel = require('../../src/models/categoryModel');

// Mock del modelo
jest.mock('../../src/models/categoryModel');

describe('CategoryService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createCategory', () => {
        test('debe crear una categoria correctamente', () => {
            const mockCategory = { id: 1, name: 'Electronica' };
            CategoryModel.create.mockReturnValue(mockCategory);

            const result = CategoryService.createCategory('Electronica');

            expect(result).toEqual(mockCategory);
            expect(CategoryModel.create).toHaveBeenCalledWith('Electronica');
        });

        test('debe lanzar error si el nombre esta vacio', () => {
            expect(() => {
                CategoryService.createCategory('');
            }).toThrow('El nombre es requerido');
        });

        test('debe lanzar error si el nombre es solo espacios', () => {
            expect(() => {
                CategoryService.createCategory('   ');
            }).toThrow('El nombre es requerido');
        });
    });

    describe('getAllCategories', () => {
        test('debe retornar todas las categorias', () => {
            const mockCategories = [
                { id: 1, name: 'Electronica' },
                { id: 2, name: 'Ropa' }
            ];
            CategoryModel.getAll.mockReturnValue(mockCategories);

            const result = CategoryService.getAllCategories();

            expect(result).toEqual(mockCategories);
        });
    });

    describe('getCategoryById', () => {
        test('debe retornar una categoria por id', () => {
            const mockCategory = { id: 1, name: 'Electronica' };
            CategoryModel.getById.mockReturnValue(mockCategory);

            const result = CategoryService.getCategoryById(1);

            expect(result).toEqual(mockCategory);
        });

        test('debe lanzar error si la categoria no existe', () => {
            CategoryModel.getById.mockReturnValue(undefined);

            expect(() => {
                CategoryService.getCategoryById(999);
            }).toThrow('Categoria no encontrada');
        });
    });

    describe('updateCategory', () => {
        test('debe actualizar una categoria', () => {
            CategoryModel.update.mockReturnValue(true);

            const result = CategoryService.updateCategory(1, 'Nuevo nombre');

            expect(result).toEqual({ id: 1, name: 'Nuevo nombre' });
        });

        test('debe lanzar error si la categoria no existe', () => {
            CategoryModel.update.mockReturnValue(false);

            expect(() => {
                CategoryService.updateCategory(999, 'Test');
            }).toThrow('Categoria no encontrada');
        });
    });

    describe('deleteCategory', () => {
        test('debe eliminar una categoria', () => {
            CategoryModel.delete.mockReturnValue(true);

            const result = CategoryService.deleteCategory(1);

            expect(result).toBe(true);
        });

        test('debe lanzar error si la categoria no existe', () => {
            CategoryModel.delete.mockReturnValue(false);

            expect(() => {
                CategoryService.deleteCategory(999);
            }).toThrow('Categoria no encontrada');
        });
    });
});
