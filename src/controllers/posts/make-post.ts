import { FastifyRequest } from "fastify/types/request";
import { request } from "http";
import { send } from "@fastify/send/types/index.d";
import handle from "../../core/request-class";
import { collection } from "../../database/connection";
import fastify, { FastifyReply } from "fastify";
import * as fs from "fs";
import { mkdir } from "fs";
import path = require("path");
import urlImage from "./image-url";
type Obj = { [key: string]: string | string[] | object | undefined };
export default async function makePost(req: FastifyRequest, res: FastifyReply) {
  const posts = collection("posts");
  const requestHandler = handle(req);
  //const user = requestHandler.input("user");
  const title = requestHandler.input("title");
  const content = requestHandler.input("content");
  const published = requestHandler.input("published");
  const image = requestHandler.input("image");
  const user = (req as any).user;
  //let path: string | null = `images/${user._id}.png`;
  //let path: string | null = "D:\fastifymission"+`/storage/uploads/${user._id}.png`;
  const imageName = Math.random().toString(36).substring(2, 7);
  let myPath: string | null = path.normalize(
    __dirname + `../../../../storage/uploads/${imageName}.png`
  );
  const baseName = path.basename(myPath);
  const imageUrl = urlImage(baseName);
  console.log(myPath);
  //console.log(__dirname)

  //path : of uplods
  if (image) {
    fs.writeFile(myPath, image, (err) => {
      if (err) {
        console.log("Error" + err.message);
      } else {
        console.log("hallo from png");
      }
    });
  } else {
    myPath = null;
  }
  //console.log(image)
  const now = new Date();
  const data: Obj = {};

  //data need username and id

  data["author"] = {
    name: user.name,
    id: user._id,
    image: baseName,
    urlImage: imageUrl,
  };
  data["createdAt"] = now;
  data["title"] = title;
  data["content"] = content;
  data["published"] = published;
  //console.log("**********here********")
  try {
    const result = await posts.insertOne(data);
    data._id = result.insertedId;
    res.status(200).send({ post: data });
  } catch (err) {
    res.status(404).send({ error: "error creating post" });
  }
}
//full url :http://localhost:3000/images/%20image.png
