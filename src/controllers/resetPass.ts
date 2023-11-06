import { send } from '@fastify/send/types/index.d';
import { request } from "http";
import handle from "../core/requestClass";
import { FastifyReply } from 'fastify';
import { collection } from "../database/connection";
import  hash  from '../utils/hashingPassword';

export default async function reset(request: any,res:FastifyReply){
    const requestHandler=handle(request)
    const email:string=requestHandler.input('email')
    const password:string=requestHandler.input('password')
    const code:string=requestHandler.input('code')
    console.log(code,email,password)
    if(!email&&!password&&!code) {
       return res.send({error:'all fields are required'})
    }
    const usersCollection = collection("users");
    const user = await usersCollection.findOne({ email: email  });
    
    if(!user){
       return res.send({error:'email not found'})
      }
      
      const newPassword=await hash(password)
      
      await usersCollection.updateOne({ email: email},{$set:{password:newPassword}})
   await usersCollection.updateOne({ email: email},{$unset:{code:code}})
      
   res.send({message:'success'})
   }