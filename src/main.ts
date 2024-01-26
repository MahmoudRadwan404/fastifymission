import "./routes";
import { connection } from "./database/connection";
import { collection } from "./database/connection";
import dotenv from "dotenv";
dotenv.config();
connection();
