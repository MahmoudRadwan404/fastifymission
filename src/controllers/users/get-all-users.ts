import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";

const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = collection("users");
  const usersData: any = await users.find({}).toArray();
  reply.status(200).send(usersData);
};
export default getAllUsers;
