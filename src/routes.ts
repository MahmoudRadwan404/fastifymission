import app from "./server";
import getAllUsers from "./controllers/getAllUsers";
import getSingleUser from "./controllers/getSingleUser";
import addUser from "./controllers/addUser";
import updateUser from "./controllers/updateUser";
import deleteUser from "./controllers/deleteUser";
import logIn from "./controllers/logIn"
import verifyToken from './controllers/compareToken'
import forget from "./controllers/forgetPass";
import reset from "./controllers/resetPass";

app.get("/users", {preHandler: verifyToken },getAllUsers);
app.get("/users/:id", getSingleUser);
app.post("/users",  addUser);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);
app.post("/users/logIn", logIn)
app.post("/users/forget",forget)//taking email and send random number of words and update field in the database of the code 
app.post("/users/reset",reset)//taking email code the new password the chick using find in db about email and code if success modify password
