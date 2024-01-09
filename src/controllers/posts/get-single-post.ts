import { FastifyRequest } from "fastify/types/request";
import { send } from "@fastify/send/types/index.d";
import { ObjectId } from "mongodb";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import wrong from "./posts-errors";

const getSinglePost = async (request: FastifyRequest, reply: FastifyReply) => {
  const requestHandler = handle(request);
  const postId = requestHandler.input("id");
  const posts = collection("posts");
  try {
    const post = await posts
      .find({ _id: new ObjectId(postId) })
      .toArray();

    if (!post) {
      return reply.status(404).send({
        error: wrong.post,
      });
    }

    reply.status(200).send({
      post,
    });
  } catch (err) {
    reply.status(404).send({ err: wrong.id });
  }
};

export default getSinglePost;
