import { FastifyRequest } from "fastify/types/request";
import { send } from "@fastify/send/types/index.d";
import { ObjectId } from "mongodb";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";

const getSinglePost = async (request: FastifyRequest, reply: FastifyReply) => {
  const requestHandler = handle(request);
  // const postId = request.params.id;
  const postId = requestHandler.input("id");

  console.log(postId);
  //console.log(request.params);
  //console.log("****" + postId + "****");
  const posts = collection("posts");
  try {
    const singlePost = await posts
      .find({ _id: new ObjectId(postId) })
      .toArray();

    if (!singlePost) {
      return reply.status(404).send({
        error: "Post not found",
      });
    }

    reply.send({
      post: singlePost,
    });
  } catch (err) {
    reply.status(404).send({ err: "Enter valid id" });
  }

};

export default getSinglePost;
