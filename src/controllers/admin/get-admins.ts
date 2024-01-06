import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";

export default async function getAdmins(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const users = collection("users");
  const admins = await users.find({ isAdmin: "true" }).toArray();
  reply.status(200).send({ admins });
}
