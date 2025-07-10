# STRUCTURE.md

## Descripción general

Este proyecto implementa una API RESTful para la gestión de portafolios de inversión y operaciones de trading, desarrollada en Node.js con TypeScript y Express. La arquitectura sigue un patrón de tres capas (Controller, Logic, Repository) y organiza cada funcionalidad en carpetas independientes bajo `src/api/routes/`.

## Estructura técnica

- **Bootstrap y rutas**:
  - `src/api/api.bootstrap.ts`: Inicializa el servidor Express, configura middlewares y registra rutas.
  - `src/api/api.routes.ts`: Registra los routers de cada funcionalidad (`/health`, `/users`, `/portfolios`, `/trading`).
- **Middleware**:
  - `src/api/middleware/`: Middlewares reutilizables (ej. logging).
- **Rutas y capas**:
  - Cada feature tiene su carpeta en `src/api/routes/{feature}/` con:
    - `{feature}.router.ts`: Define rutas y métodos HTTP.
    - `{feature}.controller.ts`: Maneja la petición y respuesta HTTP.
    - `{feature}.logic.ts`: Orquesta la lógica de negocio y validaciones.
    - `{feature}.repository.ts`: Acceso a datos (filesystem).
    - `{feature}.types.ts`: Tipos y contratos públicos (si aplica).
- **Datos**:
  - `data/portfolios/`: Portafolios persistidos como archivos JSON.
  - `data/transactions/`: Transacciones de trading.

## Patrones de diseño

- **Tres capas**: Separación estricta Controller → Logic → Repository.
- **Inyección de dependencias**: Lógica permite sobreescribir repositorios para testing.
- **Validación temprana**: Validaciones de entrada en Logic y Controller.
- **Persistencia por archivos**: Repositorios usan el filesystem para almacenar datos.

## Dependencias y tecnologías

- Node.js, Express, TypeScript
- Módulos nativos: `fs`, `path`, `crypto`

## Organización de carpetas

```
src/
  api/
    api.bootstrap.ts
    api.routes.ts
    middleware/
    routes/
      portfolio/
      trading/
      user/
      health/
    shared/
  test/
data/
  portfolios/
  transactions/
```

## Ejemplo de flujo de una operación

1. El cliente realiza una petición POST a `/portfolios` para crear un portafolio.
2. El router delega al controller, que valida y extrae los datos.
3. El controller llama a la lógica de negocio, que valida reglas y llama al repositorio.
4. El repositorio persiste el portafolio en `data/portfolios/`.
5. La respuesta estructurada se retorna al cliente.
