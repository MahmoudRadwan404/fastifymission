import users from "./database/users.json";
import app from "./server";
import getAllUsers from "./controllers/getAllUsers";
import getSingleUser from "./controllers/getSingleUser";
import addUser from "./controllers/addUser";
import updateUser from "./controllers/updateUser";
import deleteUser from "./controllers/deleteUser";
import schema from "./controllers/validationSchema";
import createUser from "./createUser";

app.get("/users", getAllUsers);
app.get("/users/:id", getSingleUser);
app.post("/users", { schema }, addUser);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);
app.post("/usersN", createUser)