import { send } from "@fastify/send/types/index.d";
import { request } from "http";
import handle from "../../core/request-class";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";

export default async function forget(
  request: FastifyRequest,
  res: FastifyReply
) {
  const requestHandler = handle(request);
  const email = requestHandler.input("email");
  if (!email) {
    return res.status(400).send({ error: "Please enter email" });
  }
  const usersCollection = collection("users");
  const user = await usersCollection.findOne({ email: email });
  const code = Math.random().toString(36).substring(2, 7);
  if (!user) {
    return res.send({ error: "email not found" });
  }
  await usersCollection.updateOne({ email: email }, { $set: { code: code } });
  res.status(200).send({ code });
}
