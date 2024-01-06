import { request } from "http";
import { ObjectId } from "mongodb";
import { send } from "@fastify/send/types/index.d";
import { collection } from "../../database/connection";
import { FastifyRequest } from "fastify/types/request";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import isEqual from "lodash.isequal";

const updatePost = async (req: FastifyRequest, res: FastifyReply) => {
  const requestHandler = handle(req);
  const postId = requestHandler.input("id");
  const content = requestHandler.input("content");
  const title = requestHandler.input("title");
  const published = requestHandler.input("published");
  const postsCollection = collection("posts");
  const user = (req as any).user;
  const userId = user._id;
  const foundPost = await postsCollection.findOne({
    _id: new ObjectId(postId),
  });
  if (!isEqual(userId, foundPost?.author.id)) {
    return res.status(404).send({ error: "can't update" });
  }
  try {
    if (title) {
      await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { title } }
      );
    }
    if (content) {
      await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { content } }
      );
    }
    if (published !== null) {
      await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { published } }
      );
    }
    res.status(200).send({ message: "updated successfully" });
  } catch (err) {
    res.status(404).send({ err });
  }
};

export default updatePost;
