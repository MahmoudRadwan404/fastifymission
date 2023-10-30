import { ObjectId } from 'mongodb';
import { DeleteOneModel } from './../../node_modules/mongodb/src/bulk/common';
import { Collection } from './../../node_modules/mongodb/src/collection';
import { putJsonFile } from "@mongez/fs";
import users from "../database/users.json";
import collection from "../database/newDb/data"
const deleteUser = async(req: any, res: any) => {
 /* const id = +req.params.id;
  let deletedUser: any = users.find((user) => user.id === id);
  const index = users.indexOf(deletedUser);
  users.splice(index, 1);
  const userFilePath=process.cwd()+'/database/users.json'
  putJsonFile(userFilePath, users);
  res.send("deleted");*/
const deleted=  await collection.deleteOne({_id:new ObjectId(req.params.id)})
res.send(deleted)
};
export default deleteUser;
