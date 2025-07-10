import assert from "assert";
import { describe, test } from "node:test";
import type { CreatePortfolioParams, Portfolio } from "../api/routes/portfolio/portfolio.logic.ts";
import { createPortfolioLogic, overrideCreatePortfolioRepository, resetCreatePortfolioRepository } from "../api/routes/portfolio/portfolio.logic.ts";
import * as repo from "../api/routes/portfolio/portfolio.repository.ts";

// Store original repository function to restore after stubbing
type CreatePortfolioRepoType = typeof repo.createPortfolioRepository;
const originalCreatePortfolioRepository: CreatePortfolioRepoType = repo.createPortfolioRepository;

describe("createPortfolioLogic", () => {
  test("should throw error when email is empty", async () => {
    const params: CreatePortfolioParams = { email: "", cash: 0 };
    await assert.rejects(
      async () => {
        await createPortfolioLogic(params);
      },
      {
        message: "Email is required and cannot be empty",
      }
    );
  });

  test("should throw error when cash is negative", async () => {
    const params: CreatePortfolioParams = { email: "user@example.com", cash: -100 };
    await assert.rejects(
      async () => {
        await createPortfolioLogic(params);
      },
      {
        message: "Cash must be a non-negative number",
      }
    );
  });

  test("should throw error when email format is invalid", async () => {
    const params: CreatePortfolioParams = { email: "invalid-email", cash: 50 };
    await assert.rejects(
      async () => {
        await createPortfolioLogic(params);
      },
      {
        message: "Invalid email format",
      }
    );
  });

  test("should return portfolio data when params are valid", async () => {
    const params: CreatePortfolioParams = { email: "user@example.com", cash: 150.5 };
    const fakeResult: Portfolio = {
      id: "12345",
      email: params.email,
      cash: params.cash,
      createdAt: new Date().toISOString(),
    };

    // Stub repository for test
    overrideCreatePortfolioRepository(async () => fakeResult);

    // Act
    const result = await createPortfolioLogic(params);

    // Restore original repository
    resetCreatePortfolioRepository();

    // Assert result matches stub
    assert.strictEqual(result.id, fakeResult.id);
    assert.strictEqual(result.email, fakeResult.email);
    assert.strictEqual(result.cash, fakeResult.cash);
    assert.strictEqual(result.createdAt, fakeResult.createdAt);
  });

  test("should handle repository errors correctly", async () => {
    const params: CreatePortfolioParams = { email: "user@example.com", cash: 200 };
    const errorMessage = "Database connection failed";

    // Stub repository to throw
    overrideCreatePortfolioRepository(async () => { throw new Error(errorMessage); });

    await assert.rejects(
      async () => {
        await createPortfolioLogic(params);
      },
      {
        message: errorMessage,
      }
    );

    // Restore original repository
    resetCreatePortfolioRepository();
  });
});
