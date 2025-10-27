import { Model } from "sequelize";
import { Users } from "../models/userModel.js";
import { Addresses } from "../models/addressModel.js";
interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

export const userService = {
  //  Create new user
  async createUser(data: UserData) {
    try {
      const user = await Users.create(data as any);
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error);
    }
  },

  //  Get all users
  async getAllUsers() {
    try {
      const users = await Users.findAll();
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error);
    }
  },

  //  Get a single user by ID
  async getUserById(id: number) {
    try {
      const user = await Users.findByPk(id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error);
    }
  },

  //  Update user by ID
  async updateUser(id: number, data: Partial<UserData>) {
    try {
      const [updated] = await Users.update(data, { where: { id } });
      if (updated === 0) throw new Error("User not found or no changes made");
      const updatedUser = await Users.findByPk(id);
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user: " + error);
    }
  },

  //  Delete user by ID
  async deleteUser(id: number) {
    try {
      const deleted = await Users.destroy({ where: { id } });
      if (deleted === 0) throw new Error("User not found");
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting user: " + error);
    }
  },
async getAllUsersWithAddresses() {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: Addresses,
          attributes: ["id", "street", "city", "pincode"],
        },
      ],
      order: [
        ["id", "ASC"], // order users
        [{ model: Addresses, as: "addresses" }, "id", "ASC"], // order nested addresses
      ],
    });

    return users;
  } catch (error: any) {
    throw new Error("Error fetching users with addresses: " + error.message);
  }
}

,

   
};
