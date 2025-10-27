import type { FastifyInstance } from "fastify";
import {createAddress,getAllAddresses,getAddressById,getAddressesByUserId,updateAddress,deleteAddress,listAddresses
} from "../controllers/addressController.js";

export async function addressRoutes(fastify: FastifyInstance) {
  //  Create a new address
  fastify.post("/addresses", createAddress);

  //  Get all addresses
  fastify.get("/address", getAllAddresses);

  //  Get a single address by address ka ID
  fastify.get("/addresses/:id", getAddressById);

  //  Get all addresses for a specific user ka id
  fastify.get("/users/:user_id/addresses", getAddressesByUserId);

  //  Update an address by ID
  fastify.put("/addresses/:id", updateAddress);

  //  Delete an address by ID
  fastify.delete("/addresses/:id", deleteAddress);

    // Aggreagate apis
    // get all the users with their addresses
  

  // filter address by pincode
  fastify.get("/addresses", listAddresses);


}
