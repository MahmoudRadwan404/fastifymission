export default function handle(request: any) {
  return {
    input: function (requestKey: string) {
      return (
        request.params[requestKey] || //always exist
        request.query[requestKey] || //always exist
        request.body?.[requestKey] //work in adding content not in get requests
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
