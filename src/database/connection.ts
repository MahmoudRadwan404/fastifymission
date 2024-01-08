// or as an es module:
import { MongoClient, Db } from "mongodb";
import { url } from "../config";
// Connection URL
const client = new MongoClient(url);
// Database Name
const dbName = "usersProject";
// Use connect method to connect to the server
export async function connection() {
  await client.connect();
  console.log("done");
}
export function collection(collectionName: string) {
  return client.db(dbName).collection(collectionName);
}
