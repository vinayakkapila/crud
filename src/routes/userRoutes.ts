import type { FastifyInstance } from "fastify";
import {createUser,getAllUsers,getUserById,updateUser,deleteUser,listUsersWithAddresses
} from "../controllers/userController.js";

export async function userRoutes(fastify: FastifyInstance) {
  // Create a new user
  fastify.post("/users", createUser);

  // Get all users
  fastify.get("/users", getAllUsers);

  // Get user by ID
  fastify.get("/users/:id", getUserById);

  // Update user by ID
  fastify.put("/users/:id", updateUser);


  // Delete user by ID
  fastify.delete("/users/:id", deleteUser);

  fastify.get("/userwithaddresses",listUsersWithAddresses)
}
