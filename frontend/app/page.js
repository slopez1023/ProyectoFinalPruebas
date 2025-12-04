'use client';

import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('products');
    
    // Estados para formularios
    const [categoryName, setCategoryName] = useState('');
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories`);
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error al cargar categorias:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => setMessage(''), 3000);
    };

    // Funciones para categorias
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        try {
            const res = await fetch(`${API_URL}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: categoryName })
            });

            if (res.ok) {
                setCategoryName('');
                fetchCategories();
                showMessage('Categoria creada correctamente');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm('Seguro que desea eliminar esta categoria?')) return;

        try {
            await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
            fetchCategories();
            showMessage('Categoria eliminada');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Funciones para productos
    const handleProductChange = (e) => {
        setProductForm({
            ...productForm,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        const productData = {
            name: productForm.name,
            description: productForm.description,
            price: parseFloat(productForm.price),
            stock: parseInt(productForm.stock),
            category_id: productForm.category_id ? parseInt(productForm.category_id) : null
        };

        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (res.ok) {
                setProductForm({ name: '', description: '', price: '', stock: '', category_id: '' });
                fetchProducts();
                showMessage('Producto creado correctamente');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            description: product.description || '',
            price: product.price.toString(),
            stock: product.stock.toString(),
            category_id: product.category_id ? product.category_id.toString() : ''
        });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const productData = {
            name: productForm.name,
            description: productForm.description,
            price: parseFloat(productForm.price),
            stock: parseInt(productForm.stock),
            category_id: productForm.category_id ? parseInt(productForm.category_id) : null
        };

        try {
            const res = await fetch(`${API_URL}/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (res.ok) {
                setEditingProduct(null);
                setProductForm({ name: '', description: '', price: '', stock: '', category_id: '' });
                fetchProducts();
                showMessage('Producto actualizado');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm('Seguro que desea eliminar este producto?')) return;

        try {
            await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
            fetchProducts();
            showMessage('Producto eliminado');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setProductForm({ name: '', description: '', price: '', stock: '', category_id: '' });
    };

    const styles = {
        container: { maxWidth: '1000px', margin: '0 auto', padding: '20px' },
        header: { textAlign: 'center', marginBottom: '30px' },
        tabs: { display: 'flex', gap: '10px', marginBottom: '20px' },
        tab: { padding: '10px 20px', cursor: 'pointer', border: '1px solid #ccc', background: '#f5f5f5' },
        activeTab: { padding: '10px 20px', cursor: 'pointer', border: '1px solid #333', background: '#333', color: '#fff' },
        form: { background: '#f9f9f9', padding: '20px', marginBottom: '20px', borderRadius: '5px' },
        input: { width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
        button: { padding: '10px 20px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' },
        buttonSecondary: { padding: '10px 20px', background: '#666', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', marginLeft: '10px' },
        table: { width: '100%', borderCollapse: 'collapse' },
        th: { background: '#333', color: '#fff', padding: '10px', textAlign: 'left' },
        td: { padding: '10px', borderBottom: '1px solid #ddd' },
        message: { background: '#4CAF50', color: '#fff', padding: '10px', marginBottom: '20px', borderRadius: '4px', textAlign: 'center' },
        deleteBtn: { background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' },
        editBtn: { background: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', marginRight: '5px' }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Sistema de Inventario</h1>

            {message && <div style={styles.message}>{message}</div>}

            <div style={styles.tabs}>
                <button 
                    style={activeTab === 'products' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('products')}
                >
                    Productos
                </button>
                <button 
                    style={activeTab === 'categories' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('categories')}
                >
                    Categorias
                </button>
            </div>

            {activeTab === 'categories' && (
                <div>
                    <div style={styles.form}>
                        <h3>Nueva Categoria</h3>
                        <form onSubmit={handleCreateCategory}>
                            <input
                                type="text"
                                placeholder="Nombre de la categoria"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                style={styles.input}
                            />
                            <button type="submit" style={styles.button}>Crear Categoria</button>
                        </form>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Nombre</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat.id}>
                                    <td style={styles.td}>{cat.id}</td>
                                    <td style={styles.td}>{cat.name}</td>
                                    <td style={styles.td}>
                                        <button 
                                            style={styles.deleteBtn}
                                            onClick={() => handleDeleteCategory(cat.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'products' && (
                <div>
                    <div style={styles.form}>
                        <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                        <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre del producto"
                                value={productForm.name}
                                onChange={handleProductChange}
                                style={styles.input}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Descripcion"
                                value={productForm.description}
                                onChange={handleProductChange}
                                style={styles.input}
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Precio"
                                value={productForm.price}
                                onChange={handleProductChange}
                                style={styles.input}
                                required
                                min="0"
                                step="0.01"
                            />
                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                value={productForm.stock}
                                onChange={handleProductChange}
                                style={styles.input}
                                required
                                min="0"
                            />
                            <select
                                name="category_id"
                                value={productForm.category_id}
                                onChange={handleProductChange}
                                style={styles.input}
                            >
                                <option value="">Sin categoria</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <button type="submit" style={styles.button}>
                                {editingProduct ? 'Actualizar' : 'Crear Producto'}
                            </button>
                            {editingProduct && (
                                <button type="button" style={styles.buttonSecondary} onClick={cancelEdit}>
                                    Cancelar
                                </button>
                            )}
                        </form>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Nombre</th>
                                <th style={styles.th}>Descripcion</th>
                                <th style={styles.th}>Precio</th>
                                <th style={styles.th}>Stock</th>
                                <th style={styles.th}>Categoria</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod => (
                                <tr key={prod.id} data-testid={`product-row-${prod.id}`}>
                                    <td style={styles.td}>{prod.id}</td>
                                    <td style={styles.td}>{prod.name}</td>
                                    <td style={styles.td}>{prod.description}</td>
                                    <td style={styles.td}>${prod.price}</td>
                                    <td style={styles.td}>{prod.stock}</td>
                                    <td style={styles.td}>{prod.category_name || '-'}</td>
                                    <td style={styles.td}>
                                        <button 
                                            style={styles.editBtn}
                                            onClick={() => handleEditProduct(prod)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            style={styles.deleteBtn}
                                            onClick={() => handleDeleteProduct(prod.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}