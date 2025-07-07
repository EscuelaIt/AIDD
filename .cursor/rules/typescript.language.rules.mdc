---
globs: *.ts
alwaysApply: false
---
# Typescript Language rules 

## Case conventions
- Variables, methods and functions are in camelCase.
- Classes, interfaces and types are in PascalCase.
- Constants and enums are in UPPER_SNAKE_CASE.

## Types
- Always define explicit types. Do it for variables, function parameters and return values.

### Type declarations
- Avoid primitive obsession and define type aliases in its own `*.type.ts` file.
- Leverage generics for reusable components
- Use `type` over `interface` for custom data types.
- Use `interface` for defining the object behavior.
- Prefer union types over `enum`.
- Use `===` and `!==` for equality checks.
- Define logic functions for runtime validation and formatting.
  
### Dealing with unknown or optional values
- Use `unknown` for values that are not known at the time of writing the code.
- Use `never` for values that are not expected to exist.
- Use `void` for functions that do not return a value.
- Declare a constant with default values to avoid check for`undefined` or `null`.
- Accept `undefined` for optional values, when the value may not exist at all.
- Do not use `null` (except when an external API uses it).
- Do not use `any` (except as a last resort).

## Modules
- In this context a module is a typescript file that exports a single object.

### Export
- Export objects with methods rather than standalone functions for better testability.
- Use named exports over default exports for clarity and better IDE support.
- Export only one component per file.

### Naming
- The exported object got a `<intention><artifact>` name in camelCase.
- Each file got a `<intention>.<artifact>.ts` name in kebab-case.
- Intention are features or specifications. ex: `auth`, `user`, `payment`, `order`...
- Artifacts are architectural building blocks. ex: `logic `, `controller`, `repository`...
  
### Import
- Use ES modules (`import`) syntax, not CommonJS (`require`).
- When importing use the full file name including the extension `.ts`.
- Destructure imports when possible (eg. `import { foo } from 'bar.ts'`)
- Import types specifically from the module file (eg. `import type { Foo } from './foo.ts'`)

## Functions and methods
- Name functions and methods with a verb and optional add a noun.
- Use a single level of abstraction.

### Pure over side effects
- Prefer pure functions over side effects.
- Keep side effects in separate functions easy to identify and mock.

### Declarations over expressions
- Prefer `function` declarations over _arrow => functions_.
- Only use _arrow => functions_ for callbacks, one-liners, and when preserving parent scope `this`

### Array methods
- Prefer array functions (`map`, `filter`, `reduce`, `find`, etc.) over traditional `for` loops
- Use array destructuring and spreading for cleaner array manipulations.
- Implement early returns in array callbacks for better performance.
- Consider array function composition for complex transformations.
- Use `for...of` loops when you need to break or continue iterations.
- Resort to traditional `for` loops only for complex control flow or performance-critical sections.
  
### Async
- Use `async`/`await` for async code.
- Mark functions that return promises as `async`.
- Use `await` for async operations.
- Use `try-catch` for error handling.
- Use `Promise.all()` for concurrent operations.

## Classes
- Prefer functional modules over classes.
- Use classes when data and behavior are tightly coupled or for certain design patterns.
- Be explicit for `public`, `private` or `protected` members.
- Use `readonly` as default for properties.
- Declare and use an `interface` for the public API.

## Error handling
- Use `try-catch` at top level of the application.
- In other cases, use `try-catch` only if it adds value (eg. fix something or add context).
- Define and use a logger for error handling.
# Typescript Language rules 

## Case conventions
- Variables, methods and functions are in camelCase.
- Classes, interfaces and types are in PascalCase.
- Constants and enums are in UPPER_SNAKE_CASE.

## Types
- Always define explicit types. Do it for variables, function parameters and return values.

### Type declarations
- Avoid primitive obsession and define type aliases in its own `*.type.ts` file.
- Leverage generics for reusable components
- Use `type` over `interface` for custom data types.
- Use `interface` for defining the object behavior.
- Prefer union types over `enum`.
- Use `===` and `!==` for equality checks.
- Define logic functions for runtime validation and formatting.
  
### Dealing with unknown or optional values
- Use `unknown` for values that are not known at the time of writing the code.
- Use `never` for values that are not expected to exist.
- Use `void` for functions that do not return a value.
- Declare a constant with default values to avoid check for`undefined` or `null`.
- Accept `undefined` for optional values, when the value may not exist at all.
- Do not use `null` (except when an external API uses it).
- Do not use `any` (except as a last resort).

## Modules
- In this context a module is a typescript file that exports a single object.

### Export
- Export objects with methods rather than standalone functions for better testability.
- Use named exports over default exports for clarity and better IDE support.
- Export only one component per file.

### Naming
- The exported object got a `<intention><artifact>` name in camelCase.
- Each file got a `<intention>.<artifact>.ts` name in kebab-case.
- Intention are features or specifications. ex: `auth`, `user`, `payment`, `order`...
- Artifacts are architectural building blocks. ex: `service`, `controller`, `repository`...
  
### Import
- Use ES modules (`import`) syntax, not CommonJS (`require`).
- When importing use the full file name including the extension `.ts`.
- Destructure imports when possible (eg. `import { foo } from 'bar.ts'`)
- Import types specifically from the module file (eg. `import type { Foo } from './foo.ts'`)

## Functions and methods
- Name functions and methods with a verb and optional add a noun.
- Use a single level of abstraction.

### Pure over side effects
- Prefer pure functions over side effects.
- Keep side effects in separate functions easy to identify and mock.

### Declarations over expressions
- Prefer `function` declarations over _arrow => functions_.
- Only use _arrow => functions_ for callbacks, one-liners, and when preserving parent scope `this`

### Array methods
- Prefer array functions (`map`, `filter`, `reduce`, `find`, etc.) over traditional `for` loops
- Use array destructuring and spreading for cleaner array manipulations.
- Implement early returns in array callbacks for better performance.
- Consider array function composition for complex transformations.
- Use `for...of` loops when you need to break or continue iterations.
- Resort to traditional `for` loops only for complex control flow or performance-critical sections.
  
### Async
- Use `async`/`await` for async code.
- Mark functions that return promises as `async`.
- Use `await` for async operations.
- Use `try-catch` for error handling.
- Use `Promise.all()` for concurrent operations.

## Classes
- Prefer functional modules over classes.
- Use classes when data and behavior are tightly coupled or for certain design patterns.
- Be explicit for `public`, `private` or `protected` members.
- Use `readonly` as default for properties.
- Declare and use an `interface` for the public API.

## Error handling
- Use `try-catch` at top level of the application.
- In other cases, use `try-catch` only if it adds value (eg. fix something or add context).
- Define and use a logger for error handling.
