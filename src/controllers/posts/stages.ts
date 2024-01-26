const stages: any[] = [];
export const $ = {
  and(variabels: any) {
    return {
      $match: {
        $and: [variabels],
      },
    };
  },
  or() {},
};


