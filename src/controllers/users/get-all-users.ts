import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";

const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const usersCollection = collection("users");
  const users: any = await usersCollection.find({}).toArray();
  reply.status(200).send(users);
};
export default getAllUsers;
