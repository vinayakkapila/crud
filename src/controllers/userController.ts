import type { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../services/userServices.js";


//  Create user
export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userData = request.body as {
      first_name: string;
      last_name: string;
      email: string;
    };


    if (!userData.first_name || !userData.last_name || !userData.email) {
      return reply.code(400).send({ error: 'All fields are required.' });
    }
    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(userData.first_name)) {
      return reply.code(400).send({ error: 'First name must contain only alphabets.' });
    }

    if (!nameRegex.test(userData.last_name)) {
      return reply.code(400).send({ error: 'Last name must contain only alphabets.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return reply.code(400).send({ error: 'Invalid email format.' });
    }

    // Create user
    const user = await userService.createUser(userData);
    reply.code(201).send(user);

  } catch (error: any) {
    reply.code(400).send({ error: error.message });
  }
};
;


//  Get all users
export const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await userService.getAllUsers();
    reply.send(users);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
};

//  Get user by ID
export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const user = await userService.getUserById(Number(id));
    reply.send(user);
  } catch (error: any) {
    reply.code(404).send({ error: error.message });
  }
};

//  Update user by ID
export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<{
      first_name: string;
      last_name: string;
      email: string;
    }>;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      return reply.code(400).send({ error: "Invalid or missing user ID." });
    }

    // Validate first name
    if (data.first_name !== undefined) {
      const firstName = data.first_name.trim();
      if (firstName === "") {
        return reply.code(400).send({ error: "First name cannot be empty." });
      }
      if (!/^[A-Za-z\s]+$/.test(firstName)) {
        return reply.code(400).send({ error: "First name can only contain alphabets and spaces." });
      }
    }

    // Validate last name
    if (data.last_name !== undefined) {
      const lastName = data.last_name.trim();
      if (lastName === "") {
        return reply.code(400).send({ error: "Last name cannot be empty." });
      }
      if (!/^[A-Za-z\s]+$/.test(lastName)) {
        return reply.code(400).send({ error: "Last name can only contain alphabets and spaces." });
      }
    }

    // Validate email
    if (data.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return reply.code(400).send({ error: "Invalid email format." });
      }
    }

    // Update user
    const updatedUser = await userService.updateUser(Number(id), data);
    reply.send(updatedUser);
  } catch (error: any) {
    reply.code(400).send({ error: error.message });
  }
};

//  Delete user
export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const result = await userService.deleteUser(Number(id));
    reply.send(result);
  } catch (error: any) {
    reply.code(400).send({ error: error.message });
  }
};
 export const listUsersWithAddresses= async(request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await userService.getAllUsersWithAddresses();
      return reply.status(200).send(users);
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  };
