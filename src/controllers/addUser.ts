import { send } from "@fastify/send/types/index.d";
//import collection from "../database/data";
import handle from "./requestClass";
import validation from "./validationSchema";

export default async function addUser(req: any, reply: any) {
  const requestHandler = handle(req);
  const validationResult = await validation(requestHandler);
  if (validationResult === true) {
    reply.send("success");
  } else {
    reply.send(validationResult);
  }
}
