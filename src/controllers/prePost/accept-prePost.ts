import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";
import { ObjectId } from "mongodb";

export default async function acceptPrePost(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const prePosts = collection("prePost")
    const posts = collection("posts")
    const postId = requestHandler.input("prePostId")
    const post = await prePosts.find({ _id: new ObjectId(postId) }).toArray()
    try {
        await posts.insertOne({ post })
         reply.send({ message: "accepted post successfully" })
         await prePosts.deleteOne({_id: new ObjectId(postId)})
         console.log("deleted post successfully")
    }
    catch (err) {
        console.log("error inserting post")
    }

}