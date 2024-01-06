import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";
import { ObjectId } from "mongodb";

export default async function deletePrePost(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const prePosts = collection("prePost");
    const postId = requestHandler.input("prePostId");
    try {
        await prePosts.deleteOne({ _id: new ObjectId(postId) });
        reply.send({ message: "post rejected" });
    } catch (err) {
        console.log("error from delete prePost");
    }
}
