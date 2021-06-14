import express from 'express'
import knex from 'knex'
import cors from 'cors'
import dotenv from 'dotenv'
import { signup } from './controller/signup'


dotenv.config()

export const connection = knex({
   client: 'mysql',
   connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 3306
   }
})


const app = express()
app.use(express.json())
app.use(cors())

app.get("/signup", signup)


app.listen(3003, () => {
   console.log('Servidor rodando na porta 3003')
})
