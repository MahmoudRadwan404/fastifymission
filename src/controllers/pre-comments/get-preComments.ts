import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";

export default async function getPreComments(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const comments = collection("comments");
    const page = requestHandler.input("page") || 0;
    const postId = requestHandler.input("postId")
    const limit = 15;
    const skip = page * 15;
    const found = await comments.find({ postId: postId }).limit(limit).skip(skip).toArray();
    const numberOfComments = await comments.countDocuments({});
    const pagination = {
        page,
        numberOfPages: Math.floor(numberOfComments / limit),
        numberOfComments,
    };
    reply.send({ pagination, found });
}
