# AI-Driven Development 

## Architect

### Input:

- `.ai/architect/prd.instructions.md`: Instrucciones para generar el PRD.
- `.ai/architect/prd.template.md`: Plantilla con la estructura esperada del PRD.
- `.ai/architect/feature.instructions.md`: Instrucciones para generar la descripción detallada de una feature
- `.ai/architect/feature.template.md`: Plantilla con la estructura detallada de una feature.
- `.ai/architect/domain.instructions.md`: Instrucciones para generar el Domain document.
- `.ai/architect/domain.template.md`: Plantilla con la estructura esperada del Domain document.

### Output: 

- `/docs/PRD.md`: Documento de Requerimientos del Producto (PRD) que describe la funcionalidad y características del sistema.
- `/docs/DOMAIN.md`: Documento de Dominio que define los conceptos clave y relaciones del sistema. E/R con reglas de negocio.
- `github.com/issues`: Issues de GitHub que describen tareas y funcionalidades específicas a implementar, y sus estados.

## Builder

### Input:

- `.ai/builder/feature-plan.instructions.md`: Instrucciones para planificar la implementación de una feature.
- `.ai/builder/feature-plan.template.md`: Plantilla con la estructura de un plan de implementación de feature.
- `.ai/builder/implementation.instructions.md`: Instrucciones para implementar un plan de una feature.
- `.ai/builder/rules`: Reglas técnicas de escritura y estilo de código.

### Output:

- `docs/feature.plan.md`: Documento de Planificación de implementación de una funcionalidad.
- `src/`:  Código fuente del sistema, organizado por capas y funcionalidades.

## Craftsman

### Input:

- `.ai/craftsman/test.instructions.md`: Instrucciones para implementar tests de una feature.
- `.ai/craftsman/document.instructions.md`: Instrucciones documentar el código fuente de una feature.
- `.ai/craftsman/rules`: Reglas técnicas de escritura y estilo de pruebas

### Output:

- `src/test`:  Tests unitarios y de integración para el sistema, organizados por funcionalidades.
- `/docs/STRUCTURE.md`: Documento de Estructura que describe la arquitectura del sistema, incluyendo patrones de diseño y organización de carpetas.