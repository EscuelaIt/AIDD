# Assets Board API

API RESTful para gestión de portfolios de activos financieros.

## Tecnologías

- Node.js 24+ (TypeScript nativo)
- Express 5

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm start
```

## Endpoints

- `GET /health` - Health check

## Estructura

- `src/controllers/` - Controladores de endpoints
- `src/services/` - Lógica de negocio
- `src/repositories/` - Acceso a datos
- `src/dtos/` - Data Transfer Objects
- `src/routes/` - Definición de rutas
- `src/middleware/` - Middleware personalizado
- `src/types/` - Tipos TypeScript
- `src/utils/` - Utilidades
- `data/` - Archivos JSON de datos

## Características

- **TypeScript nativo** con Node 24 (sin compilación)
- **Express 5** con soporte completo para ES modules
- **Hot reload** con `--watch` flag
- **Estructura modular** siguiendo principios SOLID
- **Separación clara** entre capas (controllers, services, repositories)
- **Type safety** completo en toda la aplicación 