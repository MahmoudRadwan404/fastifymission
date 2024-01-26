import isEqual from "lodash.isequal";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import { posts, postsCount } from "../../helpers/posts/all-posts";
import { $ } from "./stages";
export default async function listPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestHandler = handle(request);
  const {
    page = 1,
    limit = 5,
    title,
  } = requestHandler.only(["page", "limit", "title"]);
  const skip = ((page as number) - 1) * (limit as number);
  const language = request.headers["language"] || "en";
  const currentUser = (request as any).user;
  const matchPip: any[] = [];
  if (title) {
    matchPip.push($.and({ [`${language}.title`]: title }));
  }
  matchPip.push(
    $.and({
      isApproved: true,
      published: true,
    })
  );

  const allPosts = await posts(matchPip, currentUser._id, Number(limit), skip);
  const totalPosts = await postsCount(matchPip, currentUser._id);
  const pages: number = Math.ceil(totalPosts / (limit as number));
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
