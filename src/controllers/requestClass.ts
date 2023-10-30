export default function handle(request: any) {
  return {
    input: function (requestKey: string) {
      return (
        request.body[requestKey] ||
        request.query[requestKey] ||
        request.params[requestKey]
      );
    },
  };
}
