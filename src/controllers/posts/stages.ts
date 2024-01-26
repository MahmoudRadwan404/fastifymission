export const $ = {
  and(stage: any) {
    return {
      $match: {
        $and: [stage],
      },
    };
  },
  or() {},
};


