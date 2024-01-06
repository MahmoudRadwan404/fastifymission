import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";

export default async function approveComment(request: FastifyRequest, reply: FastifyReply) {

    const requestHandler = handle(request);
    const commentId = requestHandler.input("commentId");
    const comments = collection("comments");
    const isApproved = requestHandler.input("isApproved") || false;
    const foundComment = comments.find({ _id: new ObjectId(commentId) }).toArray();
    try {
        await comments.insertOne({ foundComment, isApproved });
        reply.send({ message: "approved" });
    }
    catch (err) {
        console.log("error inserting from admin");
    }

}