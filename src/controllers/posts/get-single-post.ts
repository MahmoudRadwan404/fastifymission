import { FastifyRequest } from "fastify/types/request";
import { send } from "@fastify/send/types/index.d";
import { ObjectId } from "mongodb";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import wrong from "./error";

const getSinglePost = async (request: FastifyRequest, reply: FastifyReply) => {
  const requestHandler = handle(request);
  const postId = requestHandler.input("id");
  const posts = collection("posts");
  try {
    const singlePost = await posts
      .find({ _id: new ObjectId(postId) })
      .toArray();

    if (!singlePost) {
      return reply.status(404).send({
        error: wrong.post,
      });
    }

    reply.status(200).send({
      post: singlePost,
    });
  } catch (err) {
    reply.status(404).send({ err: wrong.id });
  }
};

export default getSinglePost;
