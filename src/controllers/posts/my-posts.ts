import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";
import { ObjectId } from "mongodb";

export default async function myPosts(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const user = (request as any).user;
    const postsCollection = collection("posts");
    console.log(user.name);
    const myPosts = await postsCollection
        .find({
            "author.name": user.name,
        })
        .toArray();
    reply.send({ myPosts });
}
