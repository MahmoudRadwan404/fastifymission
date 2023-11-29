import { send } from "@fastify/send/types/index.d";
import handle from "../../core/request-class";
import validation from "../../validation/validation-schema";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function addUser(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const requestHandler = handle(req);
  const validationResult = await validation(requestHandler);
  if (validationResult === true) {
    reply.status(200).send("success");
  } else {
    reply.status(404).send(validationResult);
  }
}
