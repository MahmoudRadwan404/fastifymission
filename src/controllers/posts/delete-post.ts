import { FastifyRequest } from "fastify/types/request";
import { send } from "@fastify/send/types/index.d";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import isEqual from "lodash.isequal";

export default async function deletePost(
  req: FastifyRequest,
  res: FastifyReply
) {
  const postsCollection = collection("posts");
  const requestHandler = handle(req);
  const postId = requestHandler.input("id");
  const user = (req as any).user;
  const userId = user._id;
  const foundPost = await postsCollection.findOne({
    _id: new ObjectId(postId),
  });

  if (!isEqual(userId, foundPost?.author.id)) {
    return res.status(404).send({ error: "can't delete" });
  }
  const deleted = await postsCollection.deleteOne({
    _id: new ObjectId(postId),
  });
  res.status(200).send({ deleted });
}
