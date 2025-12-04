const { test, expect } = require('@playwright/test');

test.describe('Sistema de Inventario - Pruebas E2E', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('debe cargar la pagina principal', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Sistema de Inventario');
    });

    test('flujo completo: crear categoria, crear producto y verificar en listado', async ({ page }) => {
        // Paso 1: Ir a la seccion de categorias
        await page.click('button:has-text("Categorias")');
        
        // Paso 2: Crear una nueva categoria
        const categoryName = 'Electronica Test ' + Date.now();
        await page.fill('input[placeholder="Nombre de la categoria"]', categoryName);
        await page.click('button:has-text("Crear Categoria")');
        
        // Verificar que la categoria aparece en la tabla
        await expect(page.locator('table')).toContainText(categoryName);

        // Paso 3: Ir a la seccion de productos
        await page.click('button:has-text("Productos")');

        // Paso 4: Crear un nuevo producto
        const productName = 'Laptop Test ' + Date.now();
        await page.fill('input[placeholder="Nombre del producto"]', productName);
        await page.fill('input[placeholder="Descripcion"]', 'Laptop de prueba E2E');
        await page.fill('input[placeholder="Precio"]', '1500');
        await page.fill('input[placeholder="Stock"]', '10');
        await page.selectOption('select[name="category_id"]', { label: categoryName });
        await page.click('button:has-text("Crear Producto")');

        // Paso 5: Verificar que el producto aparece en el listado
        await expect(page.locator('table')).toContainText(productName);
        await expect(page.locator('table')).toContainText('1500');
        await expect(page.locator('table')).toContainText('10');
    });

    test('debe poder editar un producto existente', async ({ page }) => {
        // Primero crear un producto
        const productName = 'Producto Editar ' + Date.now();
        await page.fill('input[placeholder="Nombre del producto"]', productName);
        await page.fill('input[placeholder="Precio"]', '100');
        await page.fill('input[placeholder="Stock"]', '5');
        await page.click('button:has-text("Crear Producto")');

        // Esperar a que aparezca en la tabla
        await expect(page.locator('table')).toContainText(productName);

        // Hacer clic en editar
        const row = page.locator('tr', { hasText: productName });
        await row.locator('button:has-text("Editar")').click();

        // Modificar el producto
        await page.fill('input[placeholder="Nombre del producto"]', productName + ' Actualizado');
        await page.fill('input[placeholder="Precio"]', '200');
        await page.click('button:has-text("Actualizar")');

        // Verificar actualizacion
        await expect(page.locator('table')).toContainText(productName + ' Actualizado');
        await expect(page.locator('table')).toContainText('200');
    });

    test('debe poder eliminar un producto', async ({ page }) => {
        // Crear un producto para eliminar
        const productName = 'Producto Eliminar ' + Date.now();
        await page.fill('input[placeholder="Nombre del producto"]', productName);
        await page.fill('input[placeholder="Precio"]', '50');
        await page.fill('input[placeholder="Stock"]', '1');
        await page.click('button:has-text("Crear Producto")');

        // Esperar a que aparezca
        await expect(page.locator('table')).toContainText(productName);

        // Configurar dialogo de confirmacion
        page.on('dialog', dialog => dialog.accept());

        // Eliminar el producto
        const row = page.locator('tr', { hasText: productName });
        await row.locator('button:has-text("Eliminar")').click();

        // Verificar que ya no esta
        await expect(page.locator('table')).not.toContainText(productName);
    });

    test('debe mostrar las categorias en el listado', async ({ page }) => {
        await page.click('button:has-text("Categorias")');
        
        // Verificar que la tabla de categorias existe
        await expect(page.locator('table')).toBeVisible();
        await expect(page.locator('th:has-text("Nombre")')).toBeVisible();
    });

    test('debe cambiar entre pestanas correctamente', async ({ page }) => {
        // Verificar que estamos en productos por defecto
        await expect(page.locator('h3')).toContainText('Nuevo Producto');

        // Cambiar a categorias
        await page.click('button:has-text("Categorias")');
        await expect(page.locator('h3')).toContainText('Nueva Categoria');

        // Volver a productos
        await page.click('button:has-text("Productos")');
        await expect(page.locator('h3')).toContainText('Nuevo Producto');
    });
});