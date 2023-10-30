import collection from "../database/newDb/data";

const getAllUsers = async (request: any, reply: any) => {
  const data: any = await collection.find({}).toArray();
  reply.send(data);
};
export default getAllUsers;
