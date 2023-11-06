import app from "./server";
import getAllUsers from "./controllers/get-all-users";
import getSingleUser from "./controllers/get-single-user";
import addUser from "./controllers/add-user";
import updateUser from "./controllers/update-user";
import deleteUser from "./controllers/delete-user";
import logIn from "./controllers/log-in"
import verifyToken from './validation/compare-token'
import forget from "./controllers/forget-pass";
import reset from "./controllers/reset-pass";

app.get("/users", {preHandler: verifyToken },getAllUsers);
app.get("/users/:id", getSingleUser);
app.post("/users",  addUser);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);
app.post("/users/logIn", logIn)
app.post("/users/forget",forget)//taking email and send random number of words and update field in the database of the code 
app.post("/users/reset",reset)//taking email code the new password the chick using find in db about email and code if success modify password
