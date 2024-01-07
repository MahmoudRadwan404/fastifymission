import { ObjectId } from 'mongodb';
import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";

export default async function likes(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const postId = requestHandler.input("postId");
    const likes = collection("likes");
    const userData = (request as any).user;
    const userDataId = userData._id;
    const posts = collection("posts");
    try {
        const found = await likes.find({ postId }).toArray();
        if (found.length == 0) {
            const flag = await likes.insertOne({ userDataId, postId });
            console.log(flag);
            const numOfLikes = await likes.countDocuments({ postId });
            await posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: numOfLikes } })
            reply.send({ numOfLikes, postId });
            console.log("successful like");
        } else {
            await likes.deleteOne({ postId });
            const numOfLikes = await likes.countDocuments({ postId });
            reply.send({ numOfLikes, postId });
            console.log("deleted");
        }
    } catch (err) {
        console.log("Error from likes file");
    }
}
