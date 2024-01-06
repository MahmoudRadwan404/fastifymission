import { ObjectId } from "mongodb";
import { collection } from "../../database/connection";
import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";

export default async function deleteAdmin(
  req: FastifyRequest,
  res: FastifyReply
) {
  const users = collection("users");
  const requestHandler = handle(req);
  const adminId = requestHandler.input("adminId");
  const deleted = await users.deleteOne({ _id: new ObjectId(adminId) });
  res.send({ deleted });
}
