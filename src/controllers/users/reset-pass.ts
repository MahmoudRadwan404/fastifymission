import { send } from "@fastify/send/types/index.d";
import { request } from "http";
import handle from "../../core/request-class";
import { FastifyReply } from "fastify";
import { collection } from "../../database/connection";
import hash from "../../utils/hashing-password";

export default async function reset(request: any, res: FastifyReply) {
  const requestHandler = handle(request);
  const email: string = requestHandler.input("email");
  const password: string = requestHandler.input("password");
  const code: string = requestHandler.input("code");
  console.log(code, email, password);
  if (!email && !password && !code) {
    return res.send({ error: "all fields are required" });
  }
  const usersCollection = collection("users");
  const user = await usersCollection.findOne({ email: email });

  if (!user) {
    return res.status(404).send({ error: "email not found" });
  }

  const newPassword = await hash(password);

  await usersCollection.updateOne(
    { email: email },
    { $set: { password: newPassword } }
  );
  await usersCollection.updateOne({ email: email }, { $unset: { code: code } });

  res.status(200).send({ message: "success" });
}
