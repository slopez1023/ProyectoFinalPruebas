const request = require('supertest');

// Configurar entorno de prueba antes de importar la app
process.env.NODE_ENV = 'test';

const app = require('../../src/index');

describe('API Integration Tests', () => {

    describe('Categories API', () => {
        test('POST /api/categories - debe crear una categoria', async () => {
            const res = await request(app)
                .post('/api/categories')
                .send({ name: 'Electronica' });

            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Electronica');
        });

        test('GET /api/categories - debe obtener todas las categorias', async () => {
            const res = await request(app).get('/api/categories');

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        test('GET /api/categories/:id - debe obtener una categoria por id', async () => {
            // Primero crear una categoria
            const createRes = await request(app)
                .post('/api/categories')
                .send({ name: 'Ropa' });

            const res = await request(app).get(`/api/categories/${createRes.body.id}`);

            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Ropa');
        });

        test('PUT /api/categories/:id - debe actualizar una categoria', async () => {
            const createRes = await request(app)
                .post('/api/categories')
                .send({ name: 'Hogar' });

            const res = await request(app)
                .put(`/api/categories/${createRes.body.id}`)
                .send({ name: 'Hogar Actualizado' });

            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Hogar Actualizado');
        });

        test('DELETE /api/categories/:id - debe eliminar una categoria', async () => {
            const createRes = await request(app)
                .post('/api/categories')
                .send({ name: 'Para Eliminar' });

            const res = await request(app).delete(`/api/categories/${createRes.body.id}`);

            expect(res.status).toBe(200);
        });

        test('POST /api/categories - debe fallar sin nombre', async () => {
            const res = await request(app)
                .post('/api/categories')
                .send({});

            expect(res.status).toBe(400);
        });
    });

    describe('Products API', () => {
        let categoryId;

        beforeAll(async () => {
            const res = await request(app)
                .post('/api/categories')
                .send({ name: 'Test Category' });
            categoryId = res.body.id;
        });

        test('POST /api/products - debe crear un producto', async () => {
            const res = await request(app)
                .post('/api/products')
                .send({
                    name: 'Laptop',
                    description: 'Laptop de prueba',
                    price: 1500,
                    stock: 10,
                    category_id: categoryId
                });

            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Laptop');
        });

        test('GET /api/products - debe obtener todos los productos', async () => {
            const res = await request(app).get('/api/products');

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        test('GET /api/products/:id - debe obtener un producto por id', async () => {
            const createRes = await request(app)
                .post('/api/products')
                .send({
                    name: 'Mouse',
                    description: 'Mouse inalambrico',
                    price: 50,
                    stock: 20,
                    category_id: categoryId
                });

            const res = await request(app).get(`/api/products/${createRes.body.id}`);

            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Mouse');
        });

        test('PUT /api/products/:id - debe actualizar un producto', async () => {
            const createRes = await request(app)
                .post('/api/products')
                .send({
                    name: 'Teclado',
                    description: 'Teclado mecanico',
                    price: 100,
                    stock: 15,
                    category_id: categoryId
                });

            const res = await request(app)
                .put(`/api/products/${createRes.body.id}`)
                .send({
                    name: 'Teclado Actualizado',
                    description: 'Teclado mecanico RGB',
                    price: 150,
                    stock: 20,
                    category_id: categoryId
                });

            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Teclado Actualizado');
        });

        test('DELETE /api/products/:id - debe eliminar un producto', async () => {
            const createRes = await request(app)
                .post('/api/products')
                .send({
                    name: 'Para Eliminar',
                    description: 'Producto de prueba',
                    price: 10,
                    stock: 1,
                    category_id: categoryId
                });

            const res = await request(app).delete(`/api/products/${createRes.body.id}`);

            expect(res.status).toBe(200);
        });

        test('POST /api/products - debe fallar con precio negativo', async () => {
            const res = await request(app)
                .post('/api/products')
                .send({
                    name: 'Producto Invalido',
                    price: -10,
                    stock: 5
                });

            expect(res.status).toBe(400);
        });
    });

    describe('Health Check', () => {
        test('GET /api/health - debe retornar status ok', async () => {
            const res = await request(app).get('/api/health');

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('ok');
        });
    });
});
