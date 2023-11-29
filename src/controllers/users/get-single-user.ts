import { send } from "@fastify/send/types/index.d";
import { ObjectId } from "mongodb";
import {collection} from '../../database/connection'
import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";

const getSingleUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const requestHandler=handle(request)
  const id=requestHandler.input('id')
  const user =collection('users');
  try {
    let singleUser: any = await user
      .find({ _id: new ObjectId(id) })
      .toArray();
    console.log(id);
    reply.status(200).send({ singleUser });
  } catch (err) {
    reply.status(404).send(err);
  }
};

export default getSingleUser;
