import { FastifyRequest } from "fastify/types/request";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";

export default async function listPosts(request: FastifyRequest, reply: FastifyReply) {
  const requestHandler = handle(request);
  const limit = +requestHandler.input("limit") || 2;
  const page = +requestHandler.input("page") || 1;
  const skip = (page - 1) * limit;
  const postsCollection = collection("posts");
  const title = requestHandler.input("title");
  const content = requestHandler.input("content");
  const published = requestHandler.input("published");

  if (title || content) {
    const postsFilterResult = await postsCollection
      .find({
        $and: [
          {
            $or: [{ 'title': title },
            {
              'content': content
            }]
          },
          {
            published: published
          }]
      })
      .toArray();
    console.log(postsFilterResult)
    const numberOfPages: number = Math.ceil(postsFilterResult.length / limit);

    const pagination = {
      numOfPages: numberOfPages,
      limit,
      page,
      totalPosts: postsFilterResult.length
    }
    return reply.status(200).send({ pagination, postsFilterResult });
  }

  const totalPosts = await postsCollection.countDocuments({});
  const allPosts = await postsCollection.find({})
    .limit(limit)
    .skip(skip)
    .toArray();
  const numberOfPages: number = Math.ceil(totalPosts / limit);
  const pagination = {
    Pages: numberOfPages,
    limit,
    page,
    totalPosts: totalPosts
  }
  reply.status(200).send({ pagination, posts: allPosts });
}
