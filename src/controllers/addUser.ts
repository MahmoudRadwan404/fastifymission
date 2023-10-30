import collection from "../database/newDb/data";
const addUser = async function (req: any, reply: any) {
  const uploadValue = req.body.upload; // access file as buffer
  const fooValue = req.body.foo; // other fields
  const data = await collection.insertOne(req.body);
  reply.send({ data });
};

export default addUser;
