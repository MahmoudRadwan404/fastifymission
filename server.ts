import users from "./database/users.json";
import app from "./plugins/plugins";
import getAllUsers from "./controller/getAllUsers";
import getSingleUser from "./controller/getSingleUser";
import { json } from "stream/consumers";
import addUser from "./controller/addUser";
import updateUser from "./controller/updateUser";
import deleteUser from "./controller/deleteUser";
import schema from "./controller/validationSchema";

console.log(users);
app.get("/", (request, reply) => {
  reply.send({ ok: "OK" });
});
app.get("/users", getAllUsers);
app.get("/users/:id", getSingleUser);
app.post("/users", { schema }, addUser);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
