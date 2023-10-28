import { appendFile } from "@mongez/fs";
import { putFile } from "@mongez/fs";
import { send } from "@fastify/send/types/index.d";
import { json } from "stream/consumers";
import users from "../database/users.json";
import { putJsonFile } from "@mongez/fs";

const updateUser = (req: any, res: any) => {
  const id = +req.params.id;

  let userUpdate: any = users.find((user: any) => user.id === id);
  let index = users.indexOf(userUpdate);
  userUpdate = { ...userUpdate, ...req.body };
  users[index] = userUpdate;
const userFilePath=process.cwd()+'/database/users.json'
  putJsonFile(userFilePath, users);
  res.send("updated");
};

export default updateUser;
