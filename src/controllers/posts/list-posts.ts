import isEqual from "lodash.isequal";
import { FastifyRequest } from "fastify/types/request";
import { collection } from "../../database/connection";
import { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import posts from "./all-posts";

export default async function listPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestHandler = handle(request);
  const limit = +requestHandler.input("limit") || 2;
  const page = +requestHandler.input("page") || 1;
  const skip = (page - 1) * limit;
  const postsCollection = collection("posts");
  let title = requestHandler.input("title");
  const language = request.headers["language"] || "en";
  const currentUser = (request as any).user;
  let matchPip;
  if (title) {
    matchPip = {
      $match: {
        isApproved: true,
        published: true,
        [`${language}.title`]: title,
      },
    };
  } else {
    matchPip = {
      $match: {
        $and: [{ isApproved: true }, { published: true }],
      },
    };
  }
  const allPosts = await posts(matchPip, currentUser._id);
  const totalPosts = allPosts.length;
  const numberOfPages: number = Math.ceil(totalPosts / limit);
  const pagination = {
    Pages: numberOfPages,
    limit,
    page,
    totalPosts: totalPosts,
  };
  reply.status(200).send({
    pagination,
    posts: allPosts,
  });
}
