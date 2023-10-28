import { putJsonFile } from "@mongez/fs";
import users from "../database/users.json";

const deleteUser = (req: any, res: any) => {
  const id = +req.params.id;
  let deletedUser: any = users.find((user) => user.id === id);
  const index = users.indexOf(deletedUser);
  users.splice(index, 1);
  const userFilePath=process.cwd()+'/database/users.json'
  putJsonFile(userFilePath, users);
  res.send("deleted");
};
export default deleteUser;
