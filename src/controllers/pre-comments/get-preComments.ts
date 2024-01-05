import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";

export default async function getPreComments(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const preComments = collection("preComments")
    const page = requestHandler.input("page") || 0
    const limit = 15
    const skip = page * 15
    const found = await preComments.find({}).limit(limit).skip(skip).toArray()
    const numberOfComments = await preComments.countDocuments({})
    const pagination = {
        page,
        numberOfPages: Math.floor(numberOfComments / limit),
        numberOfComments
    }
    reply.send({ pagination, found })
}