//import users from "../database/usersDb";
import users from "../database/users.json";
import collection from "../database/newDb/data"
const getAllUsers = async(request:any, reply:any) => {
  /*const reqQuery = request.query;
  console.log(users);
  if (Object.keys(request.query as any).length === 0) {
    return reply.send({
      users,
    });
  }
  return reply.send({
    query: reqQuery,
    users: users,
  });*/
 const data:any=await collection.find({}).toArray()
 reply.send(data)

};
export default getAllUsers;
