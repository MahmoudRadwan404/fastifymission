//title matchpip,currentuser._id
import { collection } from "../../database/connection";
import { projection } from "../../controllers/posts/stages";
import { likesPipline } from "../../controllers/posts/stages";
import { isLiked } from "../../controllers/posts/stages";
import { lookupForNumOfLikes } from "../../controllers/posts/stages";

export async function posts(
  matchPip: any,
  userId: any,
  limit: number,
  skip: number
) {
  const newLimit: number = +limit;
  const postsCollection = collection("posts");
  //console.log(matchPip)
  const lookupForIsliked = {
    $lookup: {
      from: "likes",
      localField: "_id",
      foreignField: "postId",
      pipeline: isLiked({ $eq: ["$userDataId", userId] }),
      as: "liked",
    },
  };
  const allPosts = await postsCollection
    .aggregate([
      ...matchPip,
      lookupForIsliked,
      lookupForNumOfLikes,
      projection,
      { $skip: skip },
      { $limit: newLimit },
    ])
    .toArray();
  return allPosts;
}
export async function postsCount(matchPip: any, userId: any) {
  const postsCollection = collection("posts");
  const lookupForIsliked = {
    $lookup: {
      from: "likes",
      localField: "_id",
      foreignField: "postId",
      pipeline: isLiked({ $eq: ["$userDataId", userId] }),
      as: "liked",
    },
  };
  const allPostsCount = await postsCollection
    .aggregate([...matchPip, lookupForIsliked, lookupForNumOfLikes, projection])
    .toArray();
  return allPostsCount.length;
}
