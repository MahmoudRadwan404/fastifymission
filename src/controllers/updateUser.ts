import { ObjectId } from "mongodb";
import { send } from "@fastify/send/types/index.d";
import { json } from "stream/consumers";
import collection from "../database/newDb/data";

const updateUser = async (req: any, res: any) => {
  try {
    let newUser = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body } }
    );
    res.send({ newUser });
  } catch (err) {
    res.send(err);
  }
};

export default updateUser;
