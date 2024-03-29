export const $ = {
  and(fields: any) {
    return {
      $match: {
        $and: [fields],
      },
    };
  },
  or() {},
};

export const projection = {
  $project: {
    _id: 1,
    en: 1,
    ar: 1,
    Liked: { $gt: [{ $size: "$liked" }, 0] },
    Likes: {
      $ifNull: [{ $arrayElemAt: ["$numOfLikes.count", 0] }, 0],
    },
  },
};
 const likesPipline = [
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
];

export const lookupForNumOfLikes = {
  $lookup: {
    from: "likes",
    localField: "_id",
    foreignField: "postId",
    pipeline: likesPipline,
    as: "numOfLikes",
  },
};

export function lookupForIsLiked(userId: any) {
  return {
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
  };
}
