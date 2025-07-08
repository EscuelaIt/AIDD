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
