import "./routes"
import {connection} from"./database/connection"
import dotenv from 'dotenv'
dotenv.config()
const key=process.env.jwt_key
console.log(key)
connection()

