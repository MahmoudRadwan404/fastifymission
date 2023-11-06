// or as an es module:
import { MongoClient, Db } from "mongodb";
// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "usersProject";
// Use connect method to connect to the server
export async function connection() {
  await client.connect();
  console.log("done");
}
//connection();
/*export async function db() {
   const db=client.db(dbName);
 // const collection = db.collection("users");
return db;
}
// the following code examples can be pasted here...
export function db() {
  const db = client.db(dbName);
  return db;
}*/
export function collection(collectionName: string) {
  return client.db(dbName).collection(collectionName);
}
