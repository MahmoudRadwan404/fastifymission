import { send } from "@fastify/send/types/index.d";
import { ObjectId } from "mongodb";
import {collection} from '../database/data'

const getSingleUser = async (request: any, reply: any) => {
  const user =collection('users');
  try {
    let singleUser: any = await user
      .find({ _id: new ObjectId(request.params.id) })
      .toArray();
    console.log(request.params.id);
    reply.send({ singleUser });
  } catch (err) {
    reply.send(err);
  }
};

export default getSingleUser;
