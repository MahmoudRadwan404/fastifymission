import { ObjectId } from "mongodb";
import { send } from "@fastify/send/types/index.d";
import {collection} from '../../database/connection'
import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";

const updateUser = async (req: FastifyRequest, res: FastifyReply) => {
  const user =collection('users');
  const requestHandler=handle(req)
  const id=requestHandler.input('id')
  
  try {
    let newUser = await user.updateOne(
      { _id: new ObjectId(id) },
      { $set:  req.body  }
    );
    res.send({ newUser });
  } catch (err) {
    res.send(err);
  }
};

export default updateUser;
