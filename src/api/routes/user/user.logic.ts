import { 
  createUserRepository, 
  getUserRepository, 
  updateUserRepository, 
  deleteUserRepository,
  getAllUsersRepository 
} from "./user.repository.ts";

export function createUserLogic({ email, password }: { email: string; password: string }) {
  // Business logic validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Email and password must be strings");
  }

  if (email.length < 5) {
    throw new Error("Email must be at least 5 characters long");
  }

  if (!email.includes("@")) {
    throw new Error("Email must contain @ symbol");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // Check if user already exists
  const existingUsers = getAllUsersRepository();
  const userExists = existingUsers.some(user => user.email === email);
  
  if (userExists) {
    throw new Error("User with this email already exists");
  }

  // Call repository
  const user = createUserRepository({ email, password });

  // Return transformed data (without password)
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function getUserLogic({ id }: { id: string }) {
  if (!id) {
    throw new Error("User ID is required");
  }

  if (typeof id !== "string") {
    throw new Error("User ID must be a string");
  }

  const user = getUserRepository({ id });

  if (!user) {
    throw new Error("User not found");
  }

  // Return transformed data (without password)
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function updateUserLogic({ 
  id, 
  email, 
  password 
}: { 
  id: string; 
  email?: string; 
  password?: string; 
}) {
  if (!id) {
    throw new Error("User ID is required");
  }

  if (typeof id !== "string") {
    throw new Error("User ID must be a string");
  }

  if (!email && !password) {
    throw new Error("At least email or password must be provided");
  }

  // Validate email if provided
  if (email !== undefined) {
    if (typeof email !== "string") {
      throw new Error("Email must be a string");
    }

    if (email.length < 5) {
      throw new Error("Email must be at least 5 characters long");
    }

    if (!email.includes("@")) {
      throw new Error("Email must contain @ symbol");
    }

    // Check if email is already taken by another user
    const existingUsers = getAllUsersRepository();
    const emailTaken = existingUsers.some(user => user.email === email && user.id !== id);
    
    if (emailTaken) {
      throw new Error("Email is already taken by another user");
    }
  }

  // Validate password if provided
  if (password !== undefined) {
    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
  }

  const user = updateUserRepository({ id, email, password });

  if (!user) {
    throw new Error("User not found");
  }

  // Return transformed data (without password)
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function deleteUserLogic({ id }: { id: string }) {
  if (!id) {
    throw new Error("User ID is required");
  }

  if (typeof id !== "string") {
    throw new Error("User ID must be a string");
  }

  const deleted = deleteUserRepository({ id });

  if (!deleted) {
    throw new Error("User not found");
  }

  return true;
}

export function getAllUsersLogic() {
  const users = getAllUsersRepository();

  // Return transformed data (without passwords)
  return users.map(user => ({
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
} 