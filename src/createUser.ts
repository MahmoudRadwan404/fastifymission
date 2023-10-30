import fastify, { FastifyReply, FastifyRequest } from "fastify";
import handle from "./controllers/requestClass";

export default function createUser(request: FastifyRequest ,response: FastifyReply) {
    console.log(request.body)
  return response.send({
    name: handle(request).input('name'),
    email: handle(request).input('email'),
    password: handle(request).input('password')
  });
}