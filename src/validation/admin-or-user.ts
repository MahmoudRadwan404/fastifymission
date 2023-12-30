import isEqual from 'lodash.isequal';
import { FastifyReply, FastifyRequest } from 'fastify';
import { collection } from '../database/connection';
import handle from '../core/request-class';
import { ObjectId } from 'mongodb';

export default async function verifyAdminOrUser(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const admin = (request as any).user;
    const users = collection('users');
    const comments = collection('comments');
    const commentId = requestHandler.input("commentId")
    const foundUser = await users.findOne({ _id: admin._id })
    const comment = await comments.findOne({ _id: new ObjectId(commentId) })

    if (!foundUser?.isAdmin) {
        return reply.send({ message: "access not valid" })
    }
    else if (!isEqual(admin._id, comment?.commentorId)) {
        //console.log(admin._id)
        //console.log(comment?.commentorId)
        return reply.send({ message: "access not valid" })
    }
}