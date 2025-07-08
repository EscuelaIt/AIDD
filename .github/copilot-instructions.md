# Clean code rules

## Intentional naming

- Use fully descriptive names for variables and functions.
- Start with a verb in every function and flag variables (like `is`, `has`, `can`...).
- Avoid magic numbers and strings by declaring named constants.

## Avoid complexity

- Divide complex instructions into steps.
- Use early return guards for invalid or trivial cases.
- Extract inner blocks of conditional or repetitive code.

## Short functions or methods

- Keep them small and focused.
- Keep parameters to a minimum.
- Separate pure functions from functions with side effects.

## Structure the data

- Prefer structures over primitives.
- Prefer composition over inheritance.
- Place validations near the definitions.

## More cohesion, less coupling

- Place together things that change together.
- Show behavior, hide implementation details.
- Wrap external dependencies with adapters.

## Dependencies

- Keep dependencies to a minimum.
- One and only one direction of dependencies.
- One and only one level of dependencies (don't talk to strangers).

## Principles

- YAGNI: You ain't gonna need it (do the minimum).
- KISS: Keep it simple, stupid (do the simplest thing that could work).
- DRY: Don't repeat yourself (do the same thing once, use it everywhere).

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

# Modern node with typescript

Modern node works directly with typescript
Imports must:
- include the ts suffix
- mark types with type

Example:
```ts
import { bootstrap } from "./api/api.bootstrap.ts";
import type { ApiConfig } from "./api/api.bootstrap.ts";
```

Avoid classic node imports:
```ts
// missing the ts suffix
import { bootstrap } from "./api/api.bootstrap";
// missing the type
import { ApiConfig } from "./api/api.bootstrap.ts";
```
# Node.js Express API Development Rules

## Three-Layer Architecture

### Layer Structure

```
Request → Controller → Logic → Repository → Data Source
Response ← Controller ← Logic ← Repository ← Data Source
```

### Dependency Rules

- Controllers depend on Logic
- Logic depends on Repository
- Never reverse dependency direction
- One level of dependencies only (don't talk to strangers)

### File Organization

Each feature has its own folder in `src/api/routes/{feature}/`:

- `{feature}.router.ts` - Path and method routing
- `{feature}.controller.ts` - HTTP request/response handling functions
- `{feature}.logic.ts` - Business logic and orchestration
- `{feature}.repository.ts` - Data access layer

## Layer Patterns

### Router Pattern

```typescript
import { Router } from "express";
import { {feature}Controller } from "./{feature}.controller.ts";

const {feature}Router = Router();
{feature}Router.get("/:id", get{feature}Controller);
{feature}Router.post("/", post{feature}Controller);


```

### Controller Pattern

```typescript
import type { Request, Response } from "express";
import { {feature}Logic } from "./{feature}.logic.ts";

export function get{feature}Controller(req: Request, res: Response): void {
  try {
    // Extract and validate input
    const { id } = req.params;
    const queryParams = req.query;
    const bodyData = req.body;

    // Call business logic
    const data = {feature}Logic({ id, queryParams, bodyData });

    // Return structured response
    res.json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
```

### Logic Pattern

```typescript
import { {feature}Repository } from "./{feature}.repository.ts";

export function {feature}Logic(params: {
  id?: string;
  queryParams?: Record<string, unknown>;
  bodyData?: unknown;
}): {
  result: unknown;
  timestamp: string;
  processed: boolean;
} {
  // Early return for validation
  if (!params.id) {
    throw new Error("ID is required");
  }

  if (params.id.length < 3) {
    throw new Error("ID must be at least 3 characters");
  }

  // Call repository
  const result = {feature}Repository(params);

  // Transform and return business data
  return {
    result,
    timestamp: new Date().toISOString(),
    processed: true,
  };
}
```

### Repository Pattern

```typescript
export function {feature}Repository(params: {
  id?: string;
  queryParams?: Record<string, unknown>;
  bodyData?: unknown;
}): unknown {
  // Data access logic
  // Database queries, external API calls, file operations

  return {
    id: params.id,
    data: "processed data from data source",
    source: "repository",
  };
}
```

## Response Standards

### Success Response Structure

```typescript
{
  data: any,                    // Main response data
  message?: string              // Optional success message
}
```

### Error Response Structure

```typescript
{
  error: string,                // Error type/category
  message: string,              // Human-readable error message
}
```

## Project Structure

### API Bootstrap

- Initialize server in `api.bootstrap.ts`
- Register routes in `api.routes.ts`
- Configure middleware for cross-cutting concerns

### Middleware Usage

- Use middleware for logging, authentication, validation
- Place middleware in `src/api/middleware/`
- Register middleware in bootstrap file

### Shared Utilities

- Place common utilities in `src/api/shared/`
- Create reusable functions for request handling
- Export helper functions for data transformation


