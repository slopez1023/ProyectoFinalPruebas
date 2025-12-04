# Sistema de Gestion de Inventario

Sistema completo para la gestion de inventario de productos con API REST, interfaz web y pruebas automatizadas.

## Descripcion

Este proyecto implementa un sistema de inventario que permite gestionar productos y categorias. Incluye:

- API REST con arquitectura por capas (Modelo - Servicio - Controlador)
- Interfaz web desarrollada en Next.js
- Base de datos SQLite
- Pruebas unitarias, de integracion y E2E
- Analisis estatico de codigo
- Pipeline de integracion continua

## Arquitectura

El proyecto sigue una arquitectura de capas:

```
backend/
├── src/
│   ├── config/          # Configuracion de base de datos
│   ├── models/          # Modelos de datos
│   ├── services/        # Logica de negocio
│   ├── controllers/     # Controladores HTTP
│   ├── routes/          # Definicion de rutas
│   └── index.js         # Punto de entrada
├── tests/
│   ├── unit/            # Pruebas unitarias
│   └── integration/     # Pruebas de integracion

frontend/
├── app/
│   ├── layout.js        # Layout principal
│   └── page.js          # Pagina principal

e2e/
├── tests/               # Pruebas E2E con Playwright
└── playwright.config.js
```

## Base de Datos

Se utiliza SQLite con las siguientes tablas:

**categories**
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | INTEGER | Clave primaria autoincremental |
| name | TEXT | Nombre de la categoria (unico) |

**products**
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | INTEGER | Clave primaria autoincremental |
| name | TEXT | Nombre del producto |
| description | TEXT | Descripcion del producto |
| price | REAL | Precio del producto |
| stock | INTEGER | Cantidad en stock |
| category_id | INTEGER | FK a categories |

## Instalacion

### Requisitos previos

- Node.js 18 o superior
- npm

### Pasos de instalacion

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd inventario-productos
```

2. Instalar dependencias del backend:
```bash
cd backend
npm install
```

3. Instalar dependencias del frontend:
```bash
cd ../frontend
npm install
```

4. Instalar dependencias de pruebas E2E:
```bash
cd ../e2e
npm install
npx playwright install
```

## Ejecucion

### Iniciar el Backend (API)

```bash
cd backend
npm start
```

La API estara disponible en http://localhost:3001

### Iniciar el Frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

La interfaz estara disponible en http://localhost:3000

## Endpoints de la API

### Categorias

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/categories | Obtener todas las categorias |
| GET | /api/categories/:id | Obtener categoria por ID |
| POST | /api/categories | Crear categoria |
| PUT | /api/categories/:id | Actualizar categoria |
| DELETE | /api/categories/:id | Eliminar categoria |

### Productos

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/products | Obtener todos los productos |
| GET | /api/products/:id | Obtener producto por ID |
| POST | /api/products | Crear producto |
| PUT | /api/products/:id | Actualizar producto |
| DELETE | /api/products/:id | Eliminar producto |

## Pruebas

### Pruebas Unitarias

```bash
cd backend
npm test
```

### Pruebas de Integracion

```bash
cd backend
npm run test:integration
```

### Todas las Pruebas del Backend

```bash
cd backend
npm run test:all
```

### Pruebas E2E

Primero asegurate de que el backend y frontend esten corriendo, luego:

```bash
cd e2e
npm test
```

Para ver las pruebas en el navegador:

```bash
npm run test:headed
```

### Analisis Estatico

Backend:
```bash
cd backend
npm run lint
```

Frontend:
```bash
cd frontend
npm run lint
```

## Pipeline de CI

El proyecto incluye un workflow de GitHub Actions que ejecuta automaticamente:

1. Instalacion de dependencias
2. Pruebas unitarias
3. Pruebas de integracion
4. Analisis estatico (ESLint)
5. Pruebas E2E

Si todas las etapas pasan, imprime "OK". Si alguna falla, el pipeline se marca como fallido.

El pipeline se ejecuta en cada push o pull request a las ramas main/master.

## Decisiones Tecnicas

- **SQLite**: Se eligio por su simplicidad y por no requerir configuracion de servidor de base de datos.
- **Express**: Framework minimalista y ampliamente usado para APIs REST.
- **Next.js**: Framework de React para el frontend con soporte para renderizado del lado del servidor.
- **Jest + Supertest**: Combinacion estandar para pruebas de backend en Node.js.
- **Playwright**: Herramienta moderna para pruebas E2E con soporte para multiples navegadores.
- **ESLint**: Herramienta de analisis estatico para JavaScript.

## Estructura del Plan de Pruebas

El archivo PLAN_DE_PRUEBAS.md contiene la documentacion detallada de todos los casos de prueba incluyendo:

- Tipo de prueba
- Descripcion
- Prerrequisitos
- Pasos
- Resultado esperado
- Resultado obtenido

## Notas Adicionales

- La base de datos SQLite se crea automaticamente al iniciar el backend
- Para las pruebas se usa una base de datos en memoria
- El frontend consume la API en localhost:3001 por defecto