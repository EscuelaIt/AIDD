# Sintaxis de plantilla

## Resumen

Toda la documentación se generará como contenido Markdown y seguirá una sintaxis de plantilla específica.

Este documento describe la sintaxis que se utilizará en las plantillas para generar contenido estructurado.

Esta sintaxis contiene todo el contenido literal, los marcadores de posición y las instrucciones a seguir.

## Elementos de sintaxis

### Instrucciones en los comentarios

Los comentarios estándar de Markdown contienen instrucciones que los LLM deben seguir al generar contenido.

Léelas y síguelas, pero NO las incluyas en el resultado.

**EJEMPLO**

```md
<!-- Este es un comentario de instrucción.
Puede abarcar varias líneas.
Contiene instrucciones para el LLM.
Úsela para guiar el proceso de generación.
No lo incluyas en la salida.
-->
```

### Marcadores de posición de expresiones

Los _marcadores de posición_ son tokens especiales entre llaves dobles `{{ }}` que indican contenido que debe generarse o completarse.

Puede expresarse en lenguaje natural `{{ título del documento }}`.

Puede incluir una variable prefijada en camelCase, como `{{ variableName }}`.

Puede incluir el símbolo de barra vertical `|` para agregar un modificador de formato, como `{{ variableName | UPPER_CASE }}`.

Resuelve la expresión de marcador de posición en un valor de texto para incluirlo en la salida.

Prioridad de resolución:

1. Usar las variables proporcionadas si están definidas.
2. Usar tus conocimientos si se proporciona suficiente información.
3. Solicitar detalles al usuario.

- Formular una pregunta de cada vez.
- Considerar el contexto de las respuestas anteriores.
- Ofrecer una selección de respuestas predefinidas si es posible.

**EJEMPLO**

```md
{{ descripción en lenguaje natural }}
{{ @variableName }}
{{ algo | modificador }}
```

### Secciones condicionales

Algunas secciones solo se incluyen si se cumple una _condición_.

Describir las condiciones en lenguaje natural.

Describir las condiciones con `if` y `end` para delimitar la sección.

**EJEMPLO**

```md
{{ if need unit testing }}
Contenido que describe cómo crear las pruebas unitarias
{{ end need unit testing }}

{{ if @projectType is web }}
Contenido específico para proyectos web
{{ end is web }}
```

### Bucles

Algunas secciones se repiten para cada elemento de una lista.

Usa lenguaje natural para describir el _bucle_.

Usa `for` y `end` para delimitar la sección.

**EJEMPLO**

```md
{{ for archivo in carpetaArchivos }}
Contenido de cada archivo {{ elemento }}: `{{ nombre.archivo }}`
{{ end archivo }}

{{ for feature in features }}
**Feature**: {{ feature.name }} `{{ feature.slug }}`
Descripción: {{ feature.description | Una frase corta }}
{{ end feature }}
```

### Restricciones de valores

Algunos marcadores de posición pueden estar _restringidos_ a valores específicos.

Puede elegir de la lista u ofrecer opciones al usuario para que elija.

Estas listas tienen el prefijo `:` y están separadas por `|` o `,` para una o varias opciones.

**EJEMPLO**

```md
El tema principal del proyecto es {{ : rojo | verde | azul }}.
Usaremos {{ : consola, archivo, base de datos | Ninguno }} para el registro.
```

Puede generar algo como:

```md
El tema principal del proyecto es rojo.
Usaremos la consola y el archivo para el registro.
```

### Numeración

Usa el símbolo de almohadilla `#` para asignar un _número_ a los elementos.

Al usarlo en un bucle, se reemplazará con el _número_ del elemento actual.

**EJEMPLO**

```md
# Funcionalidad {{ F# }}

Historia de usuario **{{ HU_# }}**
{{ for tarea in tareas }}

- [ ] Tarea `{{ # }}`: {{ descripción_tarea }}
      {{ end tarea }}
```

Debería producir:

```md
# Característica F1

Historia de usuario **US_1**

- [ ] Tarea `1`: Realizar algo
- [ ] Tarea `2`: Realizar otra cosa
```

### Alias ​​de variables

Define valores reutilizables con el símbolo de asignación igual `=`, variables con nombre en `camelCase`:

Reglas de variables:

- Solo un alias por marcador de expresión
- Tener alcance en toda la plantilla
- Puede hacer referencia a otros alias definidos anteriormente
- No se puede redefinir

**EJEMPLO**

```md
{{ userName = John Doe }}
{{ projectStart = 15/01/2023 }}

Responsable del proyecto: {{ userName }}
Fecha de inicio: {{ projectStart }}
```

### Secciones obligatorias vs. opcionales

Algunas secciones son obligatorias, otras son opcionales.

Use el símbolo `?` como sufijo para que una sección sea opcional.

Use el símbolo `!` como sufijo para que una sección sea obligatoria.

Esto puede usarse para datos o tareas que deben estar presentes en la salida.

**EJEMPLO**

```md
{{ optionalSection? }}
{{ regularSection }}
{{ requiredSection! }}
```

### Resumen de símbolos de sintaxis

**IMPORTANTE**

Los siguientes símbolos se utilizan en la sintaxis de la plantilla:
Se presentan entre `bloques de código` solo para facilitar la lectura; no deben incluirse en la plantilla.

- `<!-- -->` para comentarios de instrucciones
- `{{ }}` para marcadores de posición
- `{{ | }}` para modificadores de formato
- `{{ = }}` para alias
- `{{ # }}` para numeración
- `{{ : | }}` para restricciones de opción única
- `{{ : , }}` para restricciones de opción múltiple
- `{{ if }}` para condicionales
- `{{ for }}` para bucles for
- `{{ end }}` para bucle o fin de condicional

---
