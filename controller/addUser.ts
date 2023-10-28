import users from "../database/users.json";
const addUser = async function (req: any, reply: any) {
  const uploadValue = req.body.upload; // access file as buffer
  const fooValue = req.body.foo; // other fields
  users.push(req.body);
  reply.send("success");
};

export default addUser;
