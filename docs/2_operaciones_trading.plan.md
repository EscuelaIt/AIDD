# Feat_2: Operaciones de Trading - Plan de Implementación

## Contexto

### Funcionalidad

Comprar y vender activos donde el usuario especifica cantidad y precio.

### Reglas de codificación

- Sigue las reglas de codificación establecidas en [rules](../.ai/builder/rules/node-express-api.rules.md).

## Tareas

- [ ] Analizar y definir los endpoints necesarios para operaciones de trading (compra y venta de activos).
- [ ] Diseñar el contrato de entrada y salida para los endpoints (parámetros, validaciones, estructura de respuesta).
- [ ] Crear la estructura de carpetas y archivos para la feature `trading` en `src/api/routes/trading/` siguiendo la arquitectura de tres capas (router, controller, logic, repository).
- [ ] Implementar el router `trading.router.ts` para exponer los endpoints de compra y venta.
- [ ] Implementar el controller `trading.controller.ts` para gestionar las peticiones HTTP y validar los datos de entrada.
- [ ] Implementar la lógica de negocio en `trading.logic.ts` para orquestar las operaciones de compra y venta, incluyendo validaciones de cash disponible y cantidad de activos.
- [ ] Implementar el acceso a datos en `trading.repository.ts` para registrar las transacciones y actualizar portfolios y activos en el sistema de ficheros (JSON).
- [ ] Actualizar el modelo de datos si es necesario para reflejar correctamente las transacciones de trading.
- [ ] Añadir pruebas unitarias y de integración para los endpoints de trading.
- [ ] Documentar los endpoints y su uso en la documentación del proyecto.
