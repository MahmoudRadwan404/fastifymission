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

export const likesPipline = [
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

export function isLiked(compare: any) {
  return [
    {
      $match: {
        $expr: {
          userDataId: compare,
        },
      },
    },
  ];
}

export const lookupForNumOfLikes = {
  $lookup: {
    from: "likes",
    localField: "_id",
    foreignField: "postId",
    pipeline: likesPipline,
    as: "numOfLikes",
  },
};

