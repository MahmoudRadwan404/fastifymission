import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import handle from "../../core/request-class";

export default async function create_post_validation(
  req: FastifyRequest,
  res: FastifyReply
) {
  const requestHandler = handle(req);
  const title = requestHandler.input("title");
  const content = requestHandler.input("content");

  if (!title || !content) {
    return res
      .status(400)
      .send({ error: "header and content are both required" });
  }
}
