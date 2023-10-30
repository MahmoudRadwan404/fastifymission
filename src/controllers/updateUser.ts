import { ObjectId } from 'mongodb';
import { send } from "@fastify/send/types/index.d";
import { json } from "stream/consumers";
import users from "../database/users.json";
import { putJsonFile } from "@mongez/fs";
import collection from "../database/newDb/data"
const updateUser = async(req: any, res: any) => {
 /* const id = +req.params.id;

  let userUpdate: any = users.find((user: any) => user.id === id);
  let index = users.indexOf(userUpdate);
  userUpdate = { ...userUpdate, ...req.body };
  users[index] = userUpdate;
const userFilePath=process.cwd()+'/database/users.json'
  putJsonFile(userFilePath, users);
  res.send("updated");*/
try{
let newUser=await collection.updateOne({_id:new ObjectId(req.params.id)},{$set:{...req.body}});
  res.send({newUser})
}
catch(err){
  res.send(err)
}

};

export default updateUser;
