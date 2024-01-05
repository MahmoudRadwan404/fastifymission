import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";

export default async function getComment(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const commentId = requestHandler.input("commentId")
    const comments = collection("comments")

    try {
        const comment = await comments.find({ _id: new ObjectId(commentorId) }).toArray();
        reply.send({ comment })
    }
    catch (err) {
        console.log("error showing comment")
    }
}