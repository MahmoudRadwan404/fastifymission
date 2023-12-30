import { FastifyReply, FastifyRequest } from 'fastify';
import { collection } from '../database/connection';

export default async function verifyAdmin(request: FastifyRequest, reply: FastifyReply) {
    const admin = (request as any).user;
    const users = collection('users');
    const foundUser = await users.findOne({ _id: admin._id })
    if (!foundUser?.isAdmin) {
        return reply.send({ message: "access not valid" })
    }

}