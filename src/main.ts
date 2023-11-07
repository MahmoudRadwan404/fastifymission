import "./routes"
import {connection} from"./database/connection"
//import {loadEnv} from '@mongez/dotenv'
//loadEnv()
import dotenv from 'dotenv'
dotenv.config()

const key=process.env.testData
console.log(key)
connection()

