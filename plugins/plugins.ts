import { send } from "@fastify/send/types/index.d";
import fastify from "fastify";
const app = fastify({ logger: true });
import multipart from "@fastify/multipart";
app.register(require("@fastify/formbody"));
app.register(require("@fastify/multipart"), {
  attachFieldsToBody: "keyValues",
});

export default app;
