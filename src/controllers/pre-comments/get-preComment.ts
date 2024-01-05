import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";

export default async function getPreComment(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const preCommentId = requestHandler.input("preCommentId")
    const preComments = collection("preComments")
    const page = requestHandler.input("page") || 0
    const found = await preComments.find({ _id: new ObjectId(preCommentId) }).toArray();
    reply.send({ found })
}