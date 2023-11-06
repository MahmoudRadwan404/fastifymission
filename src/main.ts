import "./routes"
import {connection} from"./database/connection"
import {loadEnv} from '@mongez/dotenv'
loadEnv()


const key=process.env.testData
console.log(key)
connection()

