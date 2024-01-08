import isEqual from "lodash.isequal";
import { FastifyRequest } from "fastify/types/request";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import { Buffer } from "buffer";
import convertToString from "./convertToStr";

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


  if (title) {
    let postsFilterResult = null;
    let numberOfPages = 0;
    const filter: any[] = [];

    if (title) {
      filter.push({
        [`${language}.title`]: title,
      });
    }

    postsFilterResult = await postsCollection
      .find({
        $and: [
          {
            $or: filter,
          },
          {
<<<<<<< HEAD
            [`published`]: true || "true",
=======
            [`published`]: true||"true",
>>>>>>> a56b96987ae94704184c3d2e55204eaf9275474e
          },
          {
            [`isApproved`]: true || "true",
          },
        ],
      })
      .toArray();
    numberOfPages = Math.ceil(postsFilterResult.length / limit);
    //pagination
    const pagination = {
      numOfPages: numberOfPages,
      limit,
      page,
      totalPosts: postsFilterResult?.length,
    };
    return reply.status(200).send({
      pagination,
      postsFilterResult,
    });
  } else {
    const totalPosts = await postsCollection.countDocuments({});
    const allPosts = await postsCollection
      .find({})
      .limit(limit)
      .skip(skip)
      .toArray();
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
}
