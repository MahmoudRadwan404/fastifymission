import { send } from "@fastify/send/types/index.d";
import collection from "../database/newDb/data";
import { ObjectId } from "mongodb";

const getSingleUser = async (request: any, reply: any) => {
  /* const userId = +request.params.id;
  const finalUserId: any = users.find((user: any) => user.id === userId);
  console.log(userId);
  if (!finalUserId) {
    return reply.send({ msg: "not found id" });
  }
  reply.send(finalUserId);*/
  try {
    let user:any = await collection.find({ _id: new ObjectId(request.params.id) }).toArray();
    console.log(request.params.id);
    reply.send({user});
  } catch (err) {
    reply.send(err);
  }
};

export default getSingleUser;
