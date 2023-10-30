import { InsertOneModel } from './../../node_modules/mongodb/src/bulk/common';
import users from "../database/users.json";
import collection from '../database/newDb/data';
const addUser = async function (req: any, reply: any) {
  const uploadValue = req.body.upload; // access file as buffer
  const fooValue = req.body.foo; // other fields
  //users.push(req.body);
 const data= await collection.insertOne(req.body)
  reply.send({data});
};


export default addUser;
