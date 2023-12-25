import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";

export default async function addCategory(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request)
    const categoryName = requestHandler.input("categoryName")
    const categoryId = Math.random().toString().substring(2, 11)
    const categories = collection("categories")
    const categoryData = {
        categoryName: categoryName,
        categoryId: categoryId
    }
    try {
        await categories.insertOne({ categoryData })
     //   const find=await categories.find({"categoryData.categoryId": categoryId}).toArray()
        reply.status(200).send({ categoryData })
    } catch (err) {
        reply.status(404).send({ Error: "Error inserting category" })
    }


}