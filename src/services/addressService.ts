import { Addresses } from "../models/addressModel.js";
import { Users } from "../models/userModel.js";

interface AddressData {
  user_id: number;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export const addressService = {
  // Create new address
  async createAddress(data: AddressData) {
    try {
      // Ensure user exists before creating address
      const user = await Users.findByPk(data.user_id);
      if (!user) throw new Error("User not found");

      const address = await Addresses.create(data as any);
      return address;
    } catch (error: any) {
      throw new Error("Error creating address: " + error.message);
    }
  },

  //  Get all addresses
  async getAllAddresses() {
    try {
      const addresses = await Addresses.findAll();
      return addresses;
    } catch (error: any) {
      throw new Error("Error fetching addresses: " + error.message);
    }
  },

  //  Get address by ID
  async getAddressById(id: number) {
    try {
      const address = await Addresses.findByPk(id);
      if (!address) throw new Error("Address not found");
      return address;
    } catch (error: any) {
      throw new Error("Error fetching address: " + error.message);
    }
  },

  //  Get all addresses for a specific user
  // extra add on 
    async  getAddressesByUserId(user_id: number) {
    try {
      const user = await Users.findByPk(user_id);
      if (!user) throw new Error("User not found");

      const addresses = await Addresses.findAll({
        where: { user_id },
      });
      return addresses;
    } catch (error: any) {
      throw new Error("Error fetching user addresses: " + error.message);
    }
  },


  //  Update address by ID
  async updateAddress(id: number, data: Partial<AddressData>) {
    try {
      const [updated] = await Addresses.update(data, { where: { id } });
      if (updated === 0) throw new Error("Address not found or no changes made");

      const updatedAddress = await Addresses.findByPk(id);
      return updatedAddress;
    } catch (error: any) {
      throw new Error("Error updating address: " + error.message);
    }
  },

  // Delete address by ID
  async deleteAddress(id: number) {
    try {
      const deleted = await Addresses.destroy({ where: { id } });
      if (deleted === 0) throw new Error("Address not found");

      return { message: "Address deleted successfully" };
    } catch (error: any) {
      throw new Error("Error deleting address: " + error.message);
    }
  },

  // aggreagate apis
   async listAddresses(filter?: { pincode?: string }) {
    const whereClause: any = {};

    if (filter?.pincode) {
      whereClause.pincode = filter.pincode;
    }

    const addresses = await Addresses.findAll({
      where: whereClause,
    });

    return addresses;
  },
   async listUsersWithAddresses() {
    const users = await Users.findAll({
      include: [
        {
          model: Addresses,
          as: 'addresses', // match association alias
          attributes: ['id', 'street', 'city', 'state', 'pincode'],
        },
      ],
      attributes: [ 'first_name', 'last_name'],
    });

    return users;
  }
};
