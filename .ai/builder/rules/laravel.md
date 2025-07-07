# Reglas de Generación de Código Laravel para APIs con LLM

Estas reglas guían al LLM en la generación de código Laravel robusto, escalable y siguiendo las mejores prácticas para el desarrollo de APIs RESTful.

## 1. Estructura General de la API

* **RESTful por Defecto:** Todas las APIs deben seguir los principios RESTful (verbos HTTP, recursos, estados).
* **Convenciones de Nomenclatura:**
    * **Controladores:** `[NombreRecurso]Controller` (ej. `ProductController`, `UserController`).
    * **Modelos:** Singular, CamelCase (ej. `Product`, `User`).
    * **Migraciones:** `create_[nombre_tabla]_table` (ej. `create_products_table`).
    * **Rutas:** Recursos plurales, snake_case (ej. `/api/products`).
    * **Métodos del Controlador:** `index`, `store`, `show`, `update`, `destroy`.
* **Separación de Responsabilidades:** Asegurar que cada componente (modelo, controlador, ruta, recurso) tenga una única responsabilidad.

## 2. Modelos y Migraciones

* **Definición de Campos:**
    * Especificar el tipo de dato, nulabilidad, valor por defecto (si aplica).
    * Usar `id()` para la clave primaria autoincremental.
    * Usar `timestamps()` para `created_at` y `updated_at`.
    * Para `softDeletes()`, incluir `deleted_at` si se requiere eliminación lógica.
* **Relaciones:**
    * Definir explícitamente las relaciones entre modelos (`hasOne`, `hasMany`, `belongsTo`, `belongsToMany`).
    * Asegurar que las claves foráneas estén definidas en las migraciones.
* **Mass Assignment Protection:**
    * Utilizar `$fillable` para los campos que pueden ser asignados masivamente.
    * Alternativamente, `$guarded = []` para permitir asignación masiva en todos los campos (solo si es seguro).

## 3. Rutas (API Routes)

* **Prefijo de API:** Todas las rutas de API deben estar dentro del grupo `Route::prefix('api')->middleware('api')`.
* **Resource Routes:** Siempre que sea posible, utilizar `Route::apiResource('[nombre_recurso_plural]', [NombreRecurso]Controller::class)`.
* **Rutas Personalizadas:** Para acciones que no encajan en un recurso, usar verbos HTTP explícitos (GET, POST, PUT, DELETE) y nombres descriptivos.
    * Ejemplo: `Route::post('/api/products/{product}/publish', [ProductController::class, 'publish']);`
* **Agrupación:** Agrupar rutas relacionadas para una mejor organización.
* **Middlewares:**
    * `api` por defecto.
    * `auth:sanctum` para rutas protegidas.
    * Otros middlewares personalizados según la lógica de negocio.

## 4. Controladores

* **Inyección de Dependencias:** Inyectar modelos directamente en los métodos del controlador para Route Model Binding.
    * Ejemplo: `public function show(Product $product)`
* **Validación:**
    * Utilizar `Form Request` classes para validaciones complejas.
    * Para validaciones simples, usar `$request->validate([...])` directamente en el controlador.
    * Devolver mensajes de error claros y específicos.
* **Respuestas JSON:**
    * Utilizar `response()->json([...], [status_code])` para todas las respuestas.
    * Códigos de estado HTTP significativos (200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error).
* **Manejo de Errores:**
    * Capturar excepciones específicas y devolver respuestas de error JSON apropiadas.
    * Configurar el `Handler` de excepciones para errores globales.
* **Lógica de Negocio:** Mantener los controladores ligeros. La lógica de negocio compleja debe residir en `Services`, `Actions` o `Jobs`.

## 5. Recursos API (API Resources)

* **Transformación de Datos:** Utilizar `[NombreRecurso]Resource` para transformar los modelos en un formato JSON consistente y adecuado para la API.
* **Colecciones:** Usar `[NombreRecurso]Resource::collection($collection)` para transformar colecciones de modelos.
* **Condicionales:** Usar `when()` o `mergeWhen()` para incluir campos condicionalmente.
* **Relaciones Incluidas:** Cargar las relaciones necesarias (`with()`) antes de pasar al recurso para evitar el problema de N+1.

## 6. Autenticación y Autorización

* **Laravel Sanctum:** Por defecto para autenticación de SPA y Mobile App.
* **Middleware `auth:sanctum`:** Aplicar a las rutas que requieren autenticación.
* **Políticas (Policies):** Para autorización basada en roles o permisos, utilizar Policies.
* **Gates:** Para autorizaciones más simples o personalizadas.

## 7. Pruebas

* **Pruebas de Funcionalidad (Feature Tests):** Escribir pruebas para los endpoints de la API.
* **Asserts Comunes:** `assertStatus()`, `assertJson()`, `assertJsonStructure()`, `assertJsonCount()`, `assertDatabaseHas()`, `assertDatabaseMissing()`.
* **Datos de Prueba (Factories):** Utilizar Model Factories para generar datos de prueba realistas.

## 8. Optimización y Rendimiento

* **Eager Loading:** Usar `with()` para cargar relaciones y evitar el problema de N+1.
* **Paginación:** Implementar paginación para colecciones grandes.
* **Caching:** Considerar el uso de caché para datos frecuentemente accedidos.

## 9. Seguridad

* **Validación de Entrada:** Siempre validar y sanear la entrada del usuario.
* **Protección CSRF:** No aplica para APIs sin sesión, pero importante en otras partes de la aplicación.
* **Rate Limiting:** Implementar limitación de solicitudes para prevenir abuso.

## 10. Documentación (Consideración para LLM)

* **Generación de OpenAPI/Swagger:** El LLM debe ser capaz de inferir la documentación a partir del código, o se le pueden proporcionar esquemas para ayudar en la generación.
* **Comentarios de Código:** Generar comentarios JSDoc/PHPDoc para métodos, clases y propiedades, explicando su propósito, parámetros y valores de retorno.

## Ejemplos de Directrices para el LLM:

* "Genera un controlador, modelo y migración para un recurso `Post` con campos `title` (string, required), `content` (text, nullable) y `user_id` (foreign key a `users` tabla)."
* "Crea una ruta API resource para el controlador `ProductController`."
* "Modifica el controlador `OrderController` para que al crear una orden, se valide que el campo `total` sea un número y mayor a 0."
* "Genera un `ProductResource` que incluya solo el `id`, `name`, `price` y una relación `category`."
* "Añade autenticación `sanctum` a las rutas de `UserController`."

Estas reglas proporcionan una base sólida para que el LLM genere código Laravel de alta calidad para APIs. Es crucial que el LLM sea capaz de interpretar el contexto y las intenciones del usuario para aplicarlas correctamente.