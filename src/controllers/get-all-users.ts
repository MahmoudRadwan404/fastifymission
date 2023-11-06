import {collection} from '../database/connection'

const getAllUsers = async (request: any, reply: any) => {
  const users =collection('users');
  const data: any = await users.find({}).toArray();
  reply.send(data);
};
export default getAllUsers;
