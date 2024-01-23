//title matchpip,currentuser._id
import { skip } from "node:test";
import { collection } from "../../database/connection";

export async function posts(
  matchPip: any,
  userId: any,
  limit: number,
  skip: number
) {
  const postsCollection = collection("posts");
  const allPosts = await postsCollection
    .aggregate([
      matchPip,
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          pipeline: [
            {
              $match: {
                $expr: {
                  userDataId: { $eq: ["$userDataId", userId] },
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
          _id: 1,
          en: 1,
          ar: 1,
          Liked: { $gt: [{ $size: "$liked" }, 0] },
          Likes: {
            $ifNull: [{ $arrayElemAt: ["$numOfLikes.count", 0] }, 0],
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ])
    .toArray();

  return allPosts;
}

export async function postsCount(matchPip: any, userId: any) {
  const postsCollection = collection("posts");
  const allPostsCount = await postsCollection
    .aggregate([
      matchPip,
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          pipeline: [
            {
              $match: {
                $expr: {
                  userDataId: { $eq: ["$userDataId", userId] },
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
          _id: 1,
          en: 1,
          ar: 1,
          Liked: { $gt: [{ $size: "$liked" }, 0] },
          Likes: {
            $ifNull: [{ $arrayElemAt: ["$numOfLikes.count", 0] }, 0],
          },
        },
      },
    ])
    .toArray();
  return allPostsCount.length;
}
