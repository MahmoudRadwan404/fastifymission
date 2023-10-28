//import users from "../database/usersDb";
import users from "../database/users.json";
const getAllUsers = (request:any, reply:any) => {
  const reqQuery = request.query;
  console.log(users);
  if (Object.keys(request.query as any).length === 0) {
    return reply.send({
      users,
    });
  }
  return reply.send({
    query: reqQuery,
    users: users,
  });
};
export default getAllUsers;
