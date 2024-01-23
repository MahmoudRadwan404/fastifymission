import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import handle from "../../core/request-class";

export default async function listCategories(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestHandler = handle(request);
  const categoriesCollection = collection("categories");
  const page = requestHandler.input("page") || 0;
  const skip = page * 15;
  const limit = 15;
  try {
    const categories = await categoriesCollection
      .find({})
      .limit(limit)
      .skip(skip)
      .toArray();
    const pagination = {
      pages: Math.ceil(categories.length / limit),
      page: page,
      categories:categories.length
    };
    reply.status(200).send({ pagination, categories });
  } catch (err) {
    reply.status(404).send({ Error: "Error returning categories" });
  }
}
