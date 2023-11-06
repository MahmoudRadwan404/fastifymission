import { send } from '@fastify/send/types/index.d';
import { request } from "http";
import handle from "../core/requestClass";
import fastify, { FastifyReply } from 'fastify';
import { collection } from "../database/connection";

export default async function forget(request: any,res:FastifyReply){
 const requestHandler=handle(request)
 const email=requestHandler.input('email')
 if(!email) {
  return  res.send({error:'Please enter email'})
 }
 const usersCollection = collection("users");
 const user = await usersCollection.findOne({ email: email });
 const code='1452'
 if(!user){
   return res.send({error:'email not found'})
 }
 await usersCollection.updateOne({ email: email},{$set:{code:code}})
res.send({code})
}