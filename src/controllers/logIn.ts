import { send } from "@fastify/send/types/index.d";
import bcrypt from "bcrypt";
import { collection } from "../database/connection";
import handle from "../core/requestClass";
import jwt from "jsonwebtoken";
import crypto, { verify } from "crypto";
import fastify, { FastifyReply } from "fastify";
import verifyToken from "../validation/compareToken";
import { secretKey } from "../config";
import newAccessToken from "../utils/generateAccessToken";
import verifyPassword from "../validation/verifyPassword";
import { loginValidation } from "../validation/logInValidation";

export default async function logIn(request: any, reply: FastifyReply) {
  const requestHandler = handle(request);
  const usersCollection = collection("users");
//const email = requestHandler.input("email");
  //const password = requestHandler.input("password");

  const {email,password}=requestHandler.only(["email","password"]);
console.log(email,password);
  if (!loginValidation(email, password)) {
    return reply.send({ error: "email and password are both required" });
  }
  const accessToken = collection("authUsers");

  const user = await usersCollection.findOne({ email: email });

  if (!user) {
    return reply.status(404).send({
      error: "User not found"
    });
  }

  const token = await newAccessToken({ email }, secretKey, {
    expiresIn: "10d",
    algorithm: "HS256",
  });
  const finalPassword:string = user.password
console.log(finalPassword);
  const passCompare = await verifyPassword(password, finalPassword);
  console.log(passCompare,"  ",password)
  if (passCompare) {
    await accessToken.insertOne({ id: user._id, token: token });
    delete user.password;
    reply.status(200).send({
      user: user,
      accessToken: token,
    });
  } else {
    return reply.send("failed login");
  }
}
