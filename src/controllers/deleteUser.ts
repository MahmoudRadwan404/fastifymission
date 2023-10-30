import { ObjectId } from 'mongodb';
import { DeleteOneModel } from './../../node_modules/mongodb/src/bulk/common';
import { Collection } from './../../node_modules/mongodb/src/collection';
import collection from "../database/newDb/data"

const deleteUser = async(req: any, res: any) => {
const deleted=  await collection.deleteOne({_id:new ObjectId(req.params.id)})
res.send(deleted)
};
export default deleteUser;
