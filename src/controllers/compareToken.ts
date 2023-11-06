import { FastifyReply } from "fastify";
import Jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from 'dotenv'
import {secretKey} from '../secret'

dotenv.config()
export default async function verifyToken(req: any, res: FastifyReply) {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
   return res.status(403).send({ error: "Invalid authorization, token is required" });
  }
  const token = authHeader.split(' ')[1];
try{const decodedToken=await Jwt.verify(token,secretKey);}
catch(err){
    res.status(500).send({ error:"Error verifying token"})
}
  console.log(token);
  
}
