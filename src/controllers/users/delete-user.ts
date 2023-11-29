import { ObjectId } from "mongodb";
import { collection } from "../../database/connection";
import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
const deleteUser = async (req: FastifyRequest, res: FastifyReply) => {
  const user = collection("users");
  const requestHandler = handle(req);
  const id = requestHandler.input("id");
  const postId = requestHandler.input("id");
  const deleted = await user.deleteOne({ _id: new ObjectId(id) });
  res.send(deleted);
};
export default deleteUser;
