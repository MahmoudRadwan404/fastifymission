import { obj } from "../controllers/posts/types";
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
      const value: obj = {};
      //for (let i = 0; i < keys.length; i++)
      /*for (let i in keys) {
        value[keys[i]] =
          request.params[keys[i]] ||
          request.query[keys[i]] ||
          request.body?.[keys[i]];
      }*/
      /*for (const key of keys) {
        value[key] =
          request.params[key] ?? request.query[key] ?? request.body?.[key];
      }*/
      for (const key of keys) {
        value[key] = this.input(key);
      }
      return value;
    },
  };
}
