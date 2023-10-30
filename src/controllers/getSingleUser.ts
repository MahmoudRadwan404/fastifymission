import { send } from "@fastify/send/types/index.d";
import collection from "../database/newDb/data";
import { ObjectId } from "mongodb";

const getSingleUser = async (request: any, reply: any) => {
  try {
    let user: any = await collection
      .find({ _id: new ObjectId(request.params.id) })
      .toArray();
    console.log(request.params.id);
    reply.send({ user });
  } catch (err) {
    reply.send(err);
  }
};

export default getSingleUser;
