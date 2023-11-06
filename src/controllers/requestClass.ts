export default function handle(request: any) {
  return {
    input: function (requestKey: string) {
      return (
        request.body[requestKey] ||
        request.query[requestKey] ||
        request.params[requestKey]
      );
    },
    only: function (keys: string[]) {
      type obj = { [key: string]: string };
      const value: obj = {};
      for (let i = 0; i < keys.length; i++) {
        value[keys[i]] = request.body[keys[i]];
      }
      return value;
    },
  };
}
