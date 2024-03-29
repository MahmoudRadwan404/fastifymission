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
    const comments = collection("comments");
    const userData = (request as any).user;
    const userDataId = userData._id;
    const posts = collection("posts");
    try {
        const found = await likes.find({ postId: new ObjectId(postId) }).toArray();
        if (found.length == 0) {
            const flag = await likes.insertOne({ userDataId, postId: new ObjectId(postId) });
            console.log(flag);
            let numOfLikes = await likes.countDocuments({ postId: new ObjectId(postId) });
            const numOfComments = await comments.countDocuments({ postId: new ObjectId(postId) });
            await posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: numOfLikes } })
            reply.send({ numOfLikes, postId });
            console.log("successful like");
        } else {
            await likes.deleteOne({ postId: new ObjectId(postId) });
            const newNumOfLikes = await likes.countDocuments({ postId: new ObjectId(postId) });
            await posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: newNumOfLikes } })
            const numOfLikes = await likes.countDocuments({ postId: new ObjectId(postId) });
            reply.send({ numOfLikes, postId });
            console.log("deleted");
        }
    } catch (err) {
        console.log("Error from likes file");
    }
}
