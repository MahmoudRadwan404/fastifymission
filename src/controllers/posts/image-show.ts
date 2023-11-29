import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify';

export default function imageShow(request:FastifyRequest,reply:FastifyReply){
   reply.send('image.png')
   
}