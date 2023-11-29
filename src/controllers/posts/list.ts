import { FastifyRequest } from "fastify/types/request";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";

const listPosts = async (request: FastifyRequest, reply: FastifyReply) => {
  const posts = collection("posts");
  const data = await posts.find({}).toArray();
  reply.send({ posts: data });
};
export default listPosts;
