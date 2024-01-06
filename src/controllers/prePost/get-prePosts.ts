import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";

export default async function getPrePosts(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);

    const posts = collection("posts");
    const limit = 15;
    const page = requestHandler.input("page") || 0;
    const skip = page * 15;
    const posts = await posts.find({}).limit(15).skip(skip).toArray();
    const countPosts = await posts.countDocuments({});
    const numberOfPages = Math.floor(countPosts / limit);
    const pagination = {
        prePosts: countPosts,
        numberOfPages,
        page: page,
    };
    console.log(posts);
    return reply.send({
        pagination,
        posts: posts,
    });
}
