import { ObjectId } from "mongodb";
import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";

export default async function deleteCategory(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestHandler = handle(request);
    const categoryId = requestHandler.input("categoryId");
    const categories = collection("categories");

    try {
        const deleted = await categories.deleteOne({
            _id: new ObjectId(categoryId),
        });

        reply.status(200).send({ deleted });
    } catch (err) {
        reply.status(404).send({ Error: "Error deleting category" });
    }
}
