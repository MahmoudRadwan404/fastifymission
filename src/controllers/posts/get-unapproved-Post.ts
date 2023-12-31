import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";
import { ObjectId } from "mongodb";

export default async function getPrePost(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const posts = collection("posts");
    const postId = requestHandler.input("prePostId");
    const post = await posts.find({ _id: new ObjectId(postId) }).toArray();
    console.log(post);
    return reply.send({
        post,
    });
}
