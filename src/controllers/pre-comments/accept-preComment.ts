import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";
import { ObjectId } from "mongodb";

export default async function acceptPreComment(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const comments=collection("comments")
    const preComments = collection("preComments")
    const preCommentId = requestHandler.input("preCommentId")
    const comment = await preComments.find({ _id: new ObjectId(preCommentId) }).toArray()
    try {
        await comments.insertOne({ comment })
        reply.send({ message: "accepted comment successfully" })
        await preComments.deleteOne({ _id: new ObjectId(preCommentId) })
        console.log("accepted comment successfully")
    }
    catch (err) {
        console.log("error inserting comment ")
    }

}