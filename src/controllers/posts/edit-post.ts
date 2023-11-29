import { request } from "http";
import { ObjectId } from "mongodb";
import { send } from "@fastify/send/types/index.d";
import { collection } from "../../database/connection";
import { FastifyRequest } from "fastify/types/request";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";

const updatePost = async (req: any, res: FastifyReply) => {
  const requestHandler = handle(req);
  const postId = req.params.id;
  const post = requestHandler.input("post");
  const posts = collection("posts");
  try {
    let newPost = await posts.updateOne(
      { _id: new ObjectId(postId) },
      { $set: { post } }
    );
    res.status(200).send({ newPost });
  } catch (err) {
    res.status(404).send({ err });
  }
};

export default updatePost;
