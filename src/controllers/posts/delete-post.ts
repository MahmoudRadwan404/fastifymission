import { request } from "http";
import { FastifyRequest } from "fastify/types/request";
import { send } from "@fastify/send/types/index.d";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";

export default async function deletePost(req: any, res: FastifyReply) {
  const posts = collection("posts");
  const requestHandler = handle(req);
  // const postId=requestHandler.input("id");
  const postId = req.params.id;
  const deleted = await posts.deleteOne({
    _id: new ObjectId(postId),
  });
  res.send({ deleted });
}
