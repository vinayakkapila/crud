import type { FastifyRequest, FastifyReply } from "fastify";
import { addressService } from "../services/addressService.js";
import {userService} from "../services/userServices.js"

//  Create new address
export const createAddress = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const addressData = request.body as {
      user_id: number;
      street: string;
      city: string;
      state: string;
      pincode: string;
    };

    // Check for missing fields
    const requiredFields = ['user_id', 'street', 'city', 'state', 'pincode'];
    for (const field of requiredFields) {
      if (!addressData[field as keyof typeof addressData]) {
        return reply.code(400).send({ error: `${field} is required.` });
      }
    }

    // Validate types
    if (typeof addressData.user_id !== 'number' || addressData.user_id <= 0) {
      return reply.code(400).send({ error: 'user_id cannot be -ve' });
    }

    // Validate pincode (5–6 digits)
    if (!/^[0-9]{5,6}$/.test(addressData.pincode!)) {
      return reply.code(400).send({ error: 'Invalid pincode format.' });
    }

    const address = await addressService.createAddress(addressData);
    reply.code(201).send(address);
  } catch (error: any) {
    reply.code(400).send({ error: error.message });
  }
};


//  Get all addresses
export const getAllAddresses = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const addresses = await addressService.getAllAddresses();
    reply.send(addresses);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
};

//  Get address by ID
export const getAddressById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const address = await addressService.getAddressById(Number(id));
    reply.send(address);
  } catch (error: any) {
    reply.code(404).send({ error: error.message });
  }
};

//  Get addresses by user_id
export const getAddressesByUserId = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { user_id } = request.params as { user_id: string };
    const addresses = await addressService.getAddressesByUserId(Number(user_id));
    reply.send(addresses);
  } catch (error: any) {
    reply.code(404).send({ error: error.message });
  }
};

// Update address
export const updateAddress = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<{
      street: string;
      city: string;
      state: string;
      pincode: string;
    }>;

    const updatedAddress = await addressService.updateAddress(Number(id), data);
    reply.send(updatedAddress);
  } catch (error: any) {
    reply.code(400).send({ error: error.message });
  }
};

//  Delete address
export const deleteAddress = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const result = await addressService.deleteAddress(Number(id));
    reply.send(result);
  } catch (error: any) {
    reply.code(400).send({ error: error.message });
  }
};

export const listAddresses = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // Extract query param (?pincode=411001)
    const { pincode } = request.query as { pincode?: string };

    // Build filter
    const filter: { pincode?: string } = {};
    if (pincode) filter.pincode = pincode;

    // Fetch data
    const addresses = await addressService.listAddresses(filter);

    // Return response
    reply.send(addresses);
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    reply.code(500).send({ error: error.message });
  }
};
  export const usersWithAddresses = async (request: FastifyRequest,reply:FastifyReply) => {
    try {

    }
    catch(error:any)
    {}
  }
;


