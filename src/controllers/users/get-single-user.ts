import { send } from "@fastify/send/types/index.d";
import { ObjectId } from "mongodb";
import { collection } from "../../database/connection";
import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";

const getSingleUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const requestHandler = handle(request);
  const id = requestHandler.input("id");
  const usersCollection = collection("users");
  try {
    let user: any = await usersCollection.find({ _id: new ObjectId(id) }).toArray();
    console.log(id);
    reply.status(200).send({ user });
  } catch (err) {
    reply.status(404).send(err);
  }
};

export default getSingleUser;
