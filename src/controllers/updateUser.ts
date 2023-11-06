import { ObjectId } from "mongodb";
import { send } from "@fastify/send/types/index.d";
import {collection} from '../database/connection'

const updateUser = async (req: any, res: any) => {
  const user =collection('users');
  try {
    let newUser = await user.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body } }
    );
    res.send({ newUser });
  } catch (err) {
    res.send(err);
  }
};

export default updateUser;
