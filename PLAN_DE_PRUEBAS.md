# Plan de Pruebas - Sistema de Inventario

## Resumen

Este documento describe los casos de prueba implementados para el sistema de gestion de inventario de productos.

---

## Casos de Prueba Unitarios

### CP-U01: Crear categoria correctamente
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica que se puede crear una categoria con un nombre valido |
| Prerrequisitos | Ninguno |
| Pasos | 1. Llamar a createCategory con nombre "Electronica" |
| Resultado Esperado | Retorna objeto con id y name |
| Resultado Obtenido | PASS |

### CP-U02: Error al crear categoria sin nombre
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica que se lanza error si el nombre esta vacio |
| Prerrequisitos | Ninguno |
| Pasos | 1. Llamar a createCategory con nombre vacio |
| Resultado Esperado | Lanza error "El nombre es requerido" |
| Resultado Obtenido | PASS |

### CP-U03: Obtener todas las categorias
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica que se pueden obtener todas las categorias |
| Prerrequisitos | Ninguno |
| Pasos | 1. Llamar a getAllCategories |
| Resultado Esperado | Retorna array de categorias |
| Resultado Obtenido | PASS |

### CP-U04: Obtener categoria por ID
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica que se puede obtener una categoria por su ID |
| Prerrequisitos | Categoria existente |
| Pasos | 1. Llamar a getCategoryById con ID valido |
| Resultado Esperado | Retorna la categoria |
| Resultado Obtenido | PASS |

### CP-U05: Error al obtener categoria inexistente
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica error al buscar categoria que no existe |
| Prerrequisitos | Ninguno |
| Pasos | 1. Llamar a getCategoryById con ID 999 |
| Resultado Esperado | Lanza error "Categoria no encontrada" |
| Resultado Obtenido | PASS |

### CP-U06: Crear producto correctamente
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica que se puede crear un producto con datos validos |
| Prerrequisitos | Ninguno |
| Pasos | 1. Llamar a createProduct con datos validos |
| Resultado Esperado | Retorna objeto producto con id |
| Resultado Obtenido | PASS |

### CP-U07: Error al crear producto sin nombre
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica error al crear producto sin nombre |
| Prerrequisitos | Ninguno |
| Pasos | 1. Llamar a createProduct con nombre vacio |
| Resultado Esperado | Lanza error "El nombre es requerido" |
| Resultado Obtenido | PASS |

### CP-U08: Error al crear producto con precio negativo
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica error al crear producto con precio negativo |
| Prerrequisitos | Ninguno |
| Pasos | 1. Llamar a createProduct con precio -10 |
| Resultado Esperado | Lanza error sobre precio |
| Resultado Obtenido | PASS |

### CP-U09: Error al crear producto con stock negativo
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica error al crear producto con stock negativo |
| Prerrequisitos | Ninguno |
| Pasos | 1. Llamar a createProduct con stock -5 |
| Resultado Esperado | Lanza error sobre stock |
| Resultado Obtenido | PASS |

### CP-U10: Actualizar producto correctamente
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica que se puede actualizar un producto |
| Prerrequisitos | Producto existente |
| Pasos | 1. Llamar a updateProduct con datos nuevos |
| Resultado Esperado | Retorna producto actualizado |
| Resultado Obtenido | PASS |

### CP-U11: Eliminar producto correctamente
| Campo | Descripcion |
|-------|-------------|
| Tipo | Unitaria |
| Descripcion | Verifica que se puede eliminar un producto |
| Prerrequisitos | Producto existente |
| Pasos | 1. Llamar a deleteProduct con ID valido |
| Resultado Esperado | Retorna true |
| Resultado Obtenido | PASS |

---

## Casos de Prueba de Integracion

### CP-I01: POST /api/categories - Crear categoria via API
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de creacion de categoria |
| Prerrequisitos | API corriendo |
| Pasos | 1. Hacer POST a /api/categories con body {name: "Test"} |
| Resultado Esperado | Status 201, retorna categoria creada |
| Resultado Obtenido | PASS |

### CP-I02: GET /api/categories - Obtener categorias via API
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de listado de categorias |
| Prerrequisitos | API corriendo |
| Pasos | 1. Hacer GET a /api/categories |
| Resultado Esperado | Status 200, retorna array |
| Resultado Obtenido | PASS |

### CP-I03: PUT /api/categories/:id - Actualizar categoria
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de actualizacion de categoria |
| Prerrequisitos | Categoria existente |
| Pasos | 1. Hacer PUT a /api/categories/1 con nuevo nombre |
| Resultado Esperado | Status 200, retorna categoria actualizada |
| Resultado Obtenido | PASS |

### CP-I04: DELETE /api/categories/:id - Eliminar categoria
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de eliminacion de categoria |
| Prerrequisitos | Categoria existente |
| Pasos | 1. Hacer DELETE a /api/categories/1 |
| Resultado Esperado | Status 200 |
| Resultado Obtenido | PASS |

### CP-I05: POST /api/products - Crear producto via API
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de creacion de producto |
| Prerrequisitos | API corriendo |
| Pasos | 1. Hacer POST a /api/products con datos de producto |
| Resultado Esperado | Status 201, retorna producto creado |
| Resultado Obtenido | PASS |

### CP-I06: GET /api/products - Obtener productos via API
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de listado de productos |
| Prerrequisitos | API corriendo |
| Pasos | 1. Hacer GET a /api/products |
| Resultado Esperado | Status 200, retorna array |
| Resultado Obtenido | PASS |

### CP-I07: PUT /api/products/:id - Actualizar producto
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de actualizacion de producto |
| Prerrequisitos | Producto existente |
| Pasos | 1. Hacer PUT a /api/products/1 con datos nuevos |
| Resultado Esperado | Status 200, retorna producto actualizado |
| Resultado Obtenido | PASS |

### CP-I08: DELETE /api/products/:id - Eliminar producto
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de eliminacion de producto |
| Prerrequisitos | Producto existente |
| Pasos | 1. Hacer DELETE a /api/products/1 |
| Resultado Esperado | Status 200 |
| Resultado Obtenido | PASS |

### CP-I09: Validacion de precio negativo via API
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica que API rechaza precio negativo |
| Prerrequisitos | API corriendo |
| Pasos | 1. Hacer POST a /api/products con precio -10 |
| Resultado Esperado | Status 400 |
| Resultado Obtenido | PASS |

### CP-I10: Health check de la API
| Campo | Descripcion |
|-------|-------------|
| Tipo | Integracion |
| Descripcion | Verifica endpoint de salud de la API |
| Prerrequisitos | API corriendo |
| Pasos | 1. Hacer GET a /api/health |
| Resultado Esperado | Status 200, {status: "ok"} |
| Resultado Obtenido | PASS |

---

## Casos de Prueba E2E (End-to-End)

### CP-E01: Cargar pagina principal
| Campo | Descripcion |
|-------|-------------|
| Tipo | E2E |
| Descripcion | Verifica que la pagina principal carga correctamente |
| Prerrequisitos | Frontend y backend corriendo |
| Pasos | 1. Navegar a http://localhost:3000 |
| Resultado Esperado | Muestra titulo "Sistema de Inventario" |
| Resultado Obtenido | PASS |

### CP-E02: Flujo completo crear categoria y producto
| Campo | Descripcion |
|-------|-------------|
| Tipo | E2E |
| Descripcion | Flujo principal: crear categoria, crear producto, verificar listado |
| Prerrequisitos | Sistema completo corriendo |
| Pasos | 1. Ir a Categorias 2. Crear categoria "Electronica" 3. Ir a Productos 4. Crear producto con esa categoria 5. Verificar en tabla |
| Resultado Esperado | Producto visible en listado con categoria asignada |
| Resultado Obtenido | PASS |

### CP-E03: Editar producto existente
| Campo | Descripcion |
|-------|-------------|
| Tipo | E2E |
| Descripcion | Verifica que se puede editar un producto desde la interfaz |
| Prerrequisitos | Producto existente |
| Pasos | 1. Crear producto 2. Click en Editar 3. Modificar datos 4. Guardar 5. Verificar cambios |
| Resultado Esperado | Producto actualizado visible en tabla |
| Resultado Obtenido | PASS |

### CP-E04: Eliminar producto
| Campo | Descripcion |
|-------|-------------|
| Tipo | E2E |
| Descripcion | Verifica que se puede eliminar un producto desde la interfaz |
| Prerrequisitos | Producto existente |
| Pasos | 1. Crear producto 2. Click en Eliminar 3. Confirmar eliminacion |
| Resultado Esperado | Producto ya no aparece en tabla |
| Resultado Obtenido | PASS |

### CP-E05: Navegacion entre pestanas
| Campo | Descripcion |
|-------|-------------|
| Tipo | E2E |
| Descripcion | Verifica navegacion entre Productos y Categorias |
| Prerrequisitos | Frontend corriendo |
| Pasos | 1. Click en Categorias 2. Click en Productos |
| Resultado Esperado | Cambia el contenido segun la pestana |
| Resultado Obtenido | PASS |

### CP-E06: Visualizar listado de categorias
| Campo | Descripcion |
|-------|-------------|
| Tipo | E2E |
| Descripcion | Verifica que se muestra la tabla de categorias |
| Prerrequisitos | Frontend corriendo |
| Pasos | 1. Click en pestana Categorias |
| Resultado Esperado | Tabla de categorias visible |
| Resultado Obtenido | PASS |

---

## Resumen de Resultados

| Tipo de Prueba | Total | Pasaron | Fallaron |
|----------------|-------|---------|----------|
| Unitarias | 11 | 11 | 0 |
| Integracion | 10 | 10 | 0 |
| E2E | 6 | 6 | 0 |
| **Total** | **27** | **27** | **0** |

---

## Herramientas Utilizadas

- Jest: Pruebas unitarias y de integracion
- Supertest: Testing de API HTTP
- Playwright: Pruebas E2E
- ESLint: Analisis estatico de codigo