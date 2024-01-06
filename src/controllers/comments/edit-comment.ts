import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";

export default async function editPostComment(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const comment = requestHandler.input("comment");
    const commentId = requestHandler.input("commentId");
    const comments = collection("comments");
    try {
        await comments.updateOne(
            { _id: new ObjectId(commentId) },
            {
                $set: {
                    comment: comment,
                },
            }
        );
        reply.send({ message: "updated comment successfully" });
    } catch (err) {
        console.log("error updating comment");
    }
}
