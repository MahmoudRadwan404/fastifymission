import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";

export default async function deletePostComment(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const commentId = requestHandler.input("commentId");
    const comments = collection("comments");
    try {
        await comments.deleteOne({ _id: new ObjectId(commentId) });
        reply.send({ message: "deleted comment successfully" });
    } catch (err) {
        console.log("error deleting comment");
    }
}
