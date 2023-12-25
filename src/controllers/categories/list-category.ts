import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";

export default async function listCategories(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const categories = collection("categories")
    const page = requestHandler.input("page") || 0;
    const skip = page * 15
    const limit = 15
    try {
        const foundCategories = await categories.find({}).
            limit(limit).
            skip(skip).
            toArray();
        const pagination = {
            pages: (foundCategories.length / limit),
            page: page,
        }
        reply.status(200).send({ pagination, foundCategories })
    }
    catch (err) {
        reply.status(404).send({ Error: "Error finding category" })
    }


}