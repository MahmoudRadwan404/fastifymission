import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";

export default async function getPostComments(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const postId = requestHandler.input("postId");
    const commentsCollection = collection("comments");
    const page = requestHandler.input("page") || 0;
    const limit = 15;
    const skip = page * 15;
    const comments = await commentsCollection
        .find({
            $and: [{ postId: postId }, { isApproved: true || "true" }],
        })
        .limit(limit)
        .skip(skip)
        .toArray();
    const numberOfComments = await commentsCollection.countDocuments({});
    const pagination = {
        page,
        numberOfPages: Math.floor(numberOfComments / limit),
        numberOfComments,
    };
    reply.send({ pagination, comments });
}
