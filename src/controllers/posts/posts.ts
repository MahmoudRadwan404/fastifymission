import isEqual from 'lodash.isequal';
import { FastifyRequest } from "fastify/types/request";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";
import handle from "../../core/request-class";

export default async function posts(request: FastifyRequest, reply: FastifyReply) {
    const requestHandler = handle(request);
    const limit = +requestHandler.input("limit") || 2;
    const page = +requestHandler.input("page") || 1;
    const skip = (page - 1) * limit;
    const postsCollection = collection("posts");
    let title = requestHandler.input("title");
    const content = requestHandler.input("content");
    const published = requestHandler.input("published") || true;
    const language = request.headers['language'] || 'en';
    //you have to index the document before using text
    //await postsCollection.createIndex({title:1})
    if ((title || content) && isEqual(language, 'ar')) {
        console.log(isEqual(language, 'ar'))
        title = Buffer.from(title)
        let postsFilterResult = await postsCollection
            .find({ "ar.title": title })
            .toArray();

        const numberOfPages: number = Math.ceil(postsFilterResult.length / limit);
        postsFilterResult.forEach((obj) => {
            obj.ar.title = obj.ar.title.toString()
            obj.ar.content = obj.ar.content.toString()
        }
        )

        const pagination = {
            numOfPages: numberOfPages,
            limit,
            page,
            totalPosts: postsFilterResult.length
        }
        console.log(postsFilterResult)
        return reply.status(200).send({ pagination, postsFilterResult });
    }

    const totalPosts = await postsCollection.countDocuments({});
    const allPosts = await postsCollection.find({})
        //there us limit par
        //there skip par
        .toArray();
    const numberOfPages: number = Math.ceil(totalPosts / limit);
    const pagination = {
        Pages: numberOfPages,
        limit,
        page,
        totalPosts: totalPosts
    }
    reply.status(200).send({ pagination, posts: allPosts });

}
