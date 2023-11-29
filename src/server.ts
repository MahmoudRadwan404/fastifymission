import path from "path";
import { send } from "@fastify/send/types/index.d";
import fastify from "fastify";
import { port } from "./config";
import fastifyStatic from "@fastify/static";
import multiPart from "@fastify/multipart";
import formBody from "@fastify/formbody";

const app = fastify({ logger: true });
app.register(formBody);
app.register(multiPart, {
  attachFieldsToBody: "keyValues",
});

app.register(fastifyStatic, {
  root: path.join(process.cwd(), "storage/uploads"), 
  prefix: "/uploads", 
});
app.listen(port, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
  console.log(process.cwd()); 
});

export default app;
