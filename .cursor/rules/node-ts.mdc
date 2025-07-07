---
globs: *.ts
alwaysApply: false
---
Node moderno funciona directamente con typescript
Las importaciones deben:
-  incluir el sufijo ts
-  marcar los tipos con type

Ejemplo:
```ts
import { bootstrap } from "./api/api.bootstrap.ts";
import type { ApiConfig } from "./api/api.bootstrap.ts";
```

Evita las importaciones clásicas de node:
```ts
// falta el sufijo ts
import { bootstrap } from "./api/api.bootstrap";
// falta el tipo
import { ApiConfig } from "./api/api.bootstrap.ts";
```





