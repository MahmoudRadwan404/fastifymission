import { send } from "@fastify/send/types/index.d";
import fastify from "fastify";
const app = fastify({ logger: true });
import multipart from "@fastify/multipart";
import { port } from "./config";
app.register(require("@fastify/formbody"));
app.register(require("@fastify/multipart"), {
  attachFieldsToBody: "keyValues",
});


app.listen(port, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});


export default app;
