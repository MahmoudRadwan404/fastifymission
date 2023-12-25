import "./routes";
import { connection } from "./database/connection";
import { collection } from "./database/connection";

//import {loadEnv} from '@mongez/dotenv'
//loadEnv()
import dotenv from "dotenv";
dotenv.config();
connection();

