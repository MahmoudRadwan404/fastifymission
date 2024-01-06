import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";
import { ObjectId } from "mongodb";

export default async function deletePreComment(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const preComments = collection("preComments");
    const preCommentId = requestHandler.input("preCommentId");
    const comment = await preComments
        .find({ _id: new ObjectId(preCommentId) })
        .toArray();
    try {
        await preComments.deleteOne({ _id: new ObjectId(preCommentId) });
        console.log("rejected comment successfully");
    } catch (err) {
        console.log("error inserting comment ");
    }
}
