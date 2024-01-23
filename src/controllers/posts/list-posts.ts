import isEqual from "lodash.isequal";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import { posts } from "./all-posts";
import { postsCount } from "./all-posts";
export default async function listPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestHandler = handle(request);
  const limit = +requestHandler.input("limit") || 5;
  const page = +requestHandler.input("page") || 2;
  const skip = (page - 1) * limit;
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
  const allPosts = await posts(matchPip, currentUser._id, limit, skip);
  const totalPosts = await postsCount(matchPip, currentUser._id);
  const pages: number = Math.ceil(totalPosts / limit);
  const pagination = {
    pages,
    limit,
    page,
    totalPosts,
  };
  reply.status(200).send({
    pagination,
    posts: allPosts,
  });
}
