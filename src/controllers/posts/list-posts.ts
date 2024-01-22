import isEqual from "lodash.isequal";
import { FastifyRequest } from "fastify/types/request";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";
import { pipeline } from "stream";
import { count } from "console";

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
  const filter: any[] = [];
  if (title) {
    filter.push({
      [`${language}.title`]: title,
    });
  }
  const totalPosts = await postsCollection.countDocuments({});
  const allPosts = await postsCollection
    .aggregate([
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $or: filter,
                    },
                    {
                      [`published`]: true,
                    },
                    {
                      [`isApproved`]: true,
                    },
                  ],
                },
              },
            },
          ],
          as: "matchedPosts",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      [`published`]: true,
                    },
                    {
                      [`isApproved`]: true,
                    },
                  ],
                },
              },
            },
          ],
          as: "allPosts",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          pipeline: [
            {
              $match: {
                $expr: {
                  userDataId: { $eq: ["$userDataId", currentUser._id] },
                },
              },
            },
          ],
          as: "liked",
        },
      },

      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          pipeline: [
            {
              $group: {
                _id: "$postId",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                count: 1,
              },
            },
          ],
          as: "numOfLikes",
        },
      },
      {
        $project: {
        //  _id: 1,
          //en: 1,
          //ar: 1,
          post: { $ifNull: ["$matchedPosts", "$allPosts"] },
          Liked: { $gt: [{ $size: "$liked" }, 0] },
          Likes: {
            $ifNull: [{ $arrayElemAt: ["$numOfLikes.count", 0] }, 0],
          },
        },
      },
    ])
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
