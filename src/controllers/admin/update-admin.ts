import { ObjectId } from "mongodb";
import { send } from "@fastify/send/types/index.d";
import { collection } from "../../database/connection";
import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request-class";

export default async function updateAdmin(req: FastifyRequest, res: FastifyReply) {
    const usersCollection = collection("users");
    const requestHandler = handle(req);
    const adminId = requestHandler.input("adminId");

    try {
        let newAdmin = await usersCollection.updateOne(
            { _id: new ObjectId(adminId) },
            { $set: req.body }
        );
        res.status(200).send({ newAdmin });
    } catch (err) {
        res.status(404).send(err);
    }
};
