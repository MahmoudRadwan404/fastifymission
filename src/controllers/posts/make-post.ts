import isEqual from "lodash.isequal";
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
import wrong from "./posts-errors";
import Obj from "./types";
import { Buffer } from "buffer";

export default async function makePost(req: FastifyRequest, res: FastifyReply) {
  const posts = collection("posts");
  const requestHandler = handle(req);
  //posts fields
  const title = requestHandler.input("title");
  const content = requestHandler.input("content");
  let published = requestHandler.input("published");
  const image = requestHandler.input("image");
  const language = req.headers["language"] || "en";
  const categoryId = requestHandler.input("categoryId");
  console.log(req.headers["language"]);
  //saving images
  const user = (req as any).user;
  console.log(user);
  const imageName = Math.random().toString(36).substring(2, 7);
  let myPath: string | null = path.normalize(
    __dirname + `../../../../storage/uploads/${imageName}.png`
  );
  let baseName: string | null = path.basename(myPath);
  let imageUrl: string | null = urlImage(baseName);

  if (published == "true") {
    published = true;
  } else {
    published = false;
  }

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
    imageUrl = null;
    baseName = null;
  }

  const now = new Date();
  const data: Obj = {};

  data["author"] = {
    name: user.name,
    id: user._id,
    image: baseName,
    urlImage: imageUrl,
  };
  data["createdAt"] = now;
  data["title"] = title;
  data["content"] = content;
  data["categoryId"] = categoryId;
  try {
    if (language) {
      const result = await posts.insertOne({
        [`${language}`]: data,
        published: published,
      });

      console.log(data);
      res.status(200).send({ post: result });
    }
  } catch (err) {
    res.status(404).send({ error: wrong.creatingPost });
  }
}
