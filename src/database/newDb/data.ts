// or as an es module:
import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "usersProject";

// Use connect method to connect to the server
async function connection() {
  await client.connect();
  console.log("done");
}
connection();
const db = client.db(dbName);
const collection = db.collection("users");
// the following code examples can be pasted here...
export default collection;
