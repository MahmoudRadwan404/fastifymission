import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";

export default async function makeComment(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const postId = requestHandler.input("postId");
    const comment = requestHandler.input("comment");
    const commentorId = (request as any).user._id;
    const preComments = collection("preComments");
    try {
        await preComments.insertOne({ postId, comment, commentorId });
        reply.send({ message: "inserted comment successfully" });
    } catch (err) {
        console.log("error inserting comment");
    }
}
