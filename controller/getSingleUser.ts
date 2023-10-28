import users from "../database/users.json";
const getSingleUser = (request: any, reply: any) => {
  const userId = +request.params.id;
  const finalUserId: any = users.find((user: any) => user.id === userId);
  console.log(userId);
  if (!finalUserId) {
    return reply.send({ msg: "not found id" });
  }
  reply.send(finalUserId);
};

export default getSingleUser;
