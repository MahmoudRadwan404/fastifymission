import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";

export default async function getPrePosts(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);

    const postsCollection = collection("posts");
    const limit = 15;
    const page = requestHandler.input("page") || 0;
    const skip = page * 15;
    const posts = await postsCollection
        .find({ $not: { isApproved: true } })
        .limit(15)
        .skip(skip)
        .toArray();
    const countPosts = posts.length;
    const numberOfPages = Math.floor(countPosts / limit);
    const pagination = {
        prePosts: countPosts,
        numberOfPages,
        page: page,
    };
    console.log(postsCollection);
    return reply.send({
        pagination,
        posts
    });
}
