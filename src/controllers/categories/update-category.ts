import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";

export default async function updateCategory(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const categoryId = requestHandler.input("categoryId")
    const categoryName = requestHandler.input("categoryName")
    const categories = collection("categories")
    try {
        const updated = await categories.updateOne({
            "categoryData.categoryId": categoryId
        }
            ,
            {
                $set: {
                    "categoryData.categoryName": categoryName
                }
            })
        reply.status(200).send({ updated })
    } catch (err) {
        reply.status(404).send({ Error: "Error updating category" })
    }


}