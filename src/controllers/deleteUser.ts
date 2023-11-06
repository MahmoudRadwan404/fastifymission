import { ObjectId } from 'mongodb';
import {collection} from '../database/connection'

const deleteUser = async(req: any, res: any) => {
    const user =collection('users');
const deleted=  await user.deleteOne({_id:new ObjectId(req.params.id)})
res.send(deleted)
};
export default deleteUser;
