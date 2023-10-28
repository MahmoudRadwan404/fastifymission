import { send } from "@fastify/send/types/index.d";
import fastify from "fastify";
const app = fastify({ logger: true });
import multipart from "@fastify/multipart";
import toBuffer from "@fastify/multipart";
app.register(require("@fastify/formbody"));


app.get("/", (request, reply) => {
  reply.send({ ok: "OK" });
});
  
  app.get("/users", (request, reply) => {
    const reqQuery = request.query;
    if (reqQuery == null) {
      return reply.send({
        users,
      });
    }
    return reply.send({
      query: reqQuery,
      users: users,
    });
  });
  app.get("/users/:userId", (request: any, reply: any) => {
    const userId = +request.params.id;
    const finalUserId = users.find((user) => user.id === userId);
    console.log(userId);
    if (!finalUserId) {
      return reply.send({ msg: "not found id" });
    }
    reply.send(finalUserId);
  });
  
  /*app.post("/users", (request, response) => {
    console.log(request.body);
    users.push({ id: users.length + 1, userName: request.body});
    response.send("success");
  });*/
  //---------------------------------------------
  /*app.register(multipart, {
    attachFieldsToBody: true,
  });
  app.post('/users', async function (req:any, reply:any) {
    const uploadValue = await req.body.upload.toBuffer() // access files
    const fooValue = req.body.foo.value                  // other fields
    const body = Object.fromEntries(
      Object.keys(req.body).map((key) => [key, req.body[key].value])
    ) // Request body in key-value pairs, like req.body in Express (Node 12+)
  reply.send("success");
  users.push(req.body);
  })*/
  
  //------------------------------------------------------------
  app.register(require("@fastify/multipart"), {
    attachFieldsToBody: "keyValues",
  });
  
  app.post("/users", async function (req: any, reply: any) {
    const uploadValue = req.body.upload; // access file as buffer
    const fooValue = req.body.foo; // other fields
    users.push(req.body);
    reply.send("success");
  });
  
  