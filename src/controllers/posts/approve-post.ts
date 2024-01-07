import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";

export default async function approvePost(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const postId = requestHandler.input("postId");
    const posts = collection("posts");
    const foundPost = posts.find({ _id: new ObjectId(postId) }).toArray();
    try {
        await posts.insertOne({ foundPost, isApproved: true });
        reply.send({ message: "approved" });
    } catch (err) {
        console.log("error inserting from admin");
    }
}
