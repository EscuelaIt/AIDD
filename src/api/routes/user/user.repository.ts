// In-memory storage for users
const users: Map<string, User> = new Map();

// User type definition
type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function createUserRepository({ 
  email, 
  password 
}: { 
  email: string; 
  password: string; 
}): User {
  const now = new Date().toISOString();
  const user: User = {
    id: generateId(),
    email,
    password, // In a real app, this would be hashed
    createdAt: now,
    updatedAt: now,
  };

  users.set(user.id, user);
  return user;
}

export function getUserRepository({ id }: { id: string }): User | null {
  const user = users.get(id);
  return user || null;
}

export function updateUserRepository({ 
  id, 
  email, 
  password 
}: { 
  id: string; 
  email?: string; 
  password?: string; 
}): User | null {
  const user = users.get(id);
  
  if (!user) {
    return null;
  }

  const updatedUser: User = {
    ...user,
    email: email !== undefined ? email : user.email,
    password: password !== undefined ? password : user.password, // In a real app, this would be hashed
    updatedAt: new Date().toISOString(),
  };

  users.set(id, updatedUser);
  return updatedUser;
}

export function deleteUserRepository({ id }: { id: string }): boolean {
  const user = users.get(id);
  
  if (!user) {
    return false;
  }

  users.delete(id);
  return true;
}

export function getAllUsersRepository(): User[] {
  users.set("1", {
    id: "1",
    email: "test@test.com",
    password: "123456",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  users.set("2", {
    id: "2",
    email: "test2@test.com",
    password: "123456",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return Array.from(users.values());
} 