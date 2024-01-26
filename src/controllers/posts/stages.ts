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


