import express, { Express, Request, Response } from "express"
import knex from "knex"
import cors from "cors"
import dotenv from "dotenv"
import { AddressInfo } from "net"
import { recipe } from "./types/recipe"

dotenv.config()

export const connection = knex({
   client: "mysql",
   connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
   }
})

const app: Express = express()
app.use(express.json())
app.use(cors())

// Exercicio 1
app.get("/workers", async (req: Request, res: Response) => {

   try {

      const nome = req.query.nome
      const tipo = req.query.tipo
      let result = []

      if (nome) {

         result = await connection.raw(`SELECT * FROM aula48_exercicio WHERE name LIKE "%${nome}%"`)
      }
      else if (tipo) {

         result = await connection.raw(`SELECT * FROM aula48_exercicio WHERE type LIKE "%${tipo}%"`)
      }
      else {

         result = await connection.raw(`SELECT * FROM aula48_exercicio`)
      }

      res.status(200).send(result[0])
   }
   catch(err) {

      res.status(400).send({ message: err.message })
   }
})

// Exercicio 2
app.get("/workers2", async (req: Request, res: Response) => {

   try {

      const nome = req.query.nome
      const tipo = req.query.tipo
      const orderBy = req.query.orderBy || "email"
      const orderDirection = req.query.orderDirection || "ASC"
      let result = []

      if (nome) {

         result = await connection.raw(`SELECT * FROM aula48_exercicio WHERE name LIKE "%${nome}%"
         ORDER BY ${orderBy} ${orderDirection}`)
      }
      else if (tipo) {

         result = await connection.raw(`SELECT * FROM aula48_exercicio WHERE type LIKE "%${tipo}%"
         ORDER BY ${orderBy} ${orderDirection}`)
      }
      else {

         result = await connection.raw(`SELECT * FROM aula48_exercicio
         ORDER BY ${orderBy} ${orderDirection}`)
      }

      res.status(200).send(result[0])
   }
   catch(err) {

      res.status(400).send({ message: err.message })
   }
})

// Exercicio 1
app.get("/workers3", async (req: Request, res: Response) => {

   try {

      const nome = req.query.nome
      const tipo = req.query.tipo
      const pagina = Number(req.query.pagina) || 1
      let result = []

      if (nome) {

         result = await connection.raw(`SELECT * FROM aula48_exercicio WHERE name LIKE "%${nome}%"
         LIMIT 5 OFFSET ${5 * (pagina - 1)}`)
      }
      else if (tipo) {

         result = await connection.raw(`SELECT * FROM aula48_exercicio WHERE type LIKE "%${tipo}%"
         LIMIT 5 OFFSET ${5 * (pagina - 1)}`)
      }
      else {

         result = await connection.raw(`SELECT * FROM aula48_exercicio
         LIMIT 5 OFFSET ${5 * (pagina - 1)}`)
      }

      res.status(200).send(result[0])
   }
   catch(err) {

      res.status(400).send({ message: err.message })
   }
})

// Exercicio 4
app.get("/workers4", async (req: Request, res: Response) => {

   try {

      const nome = req.query.nome
      const tipo = req.query.tipo
      const orderBy = req.query.orderBy || "name"
      const orderDirection = req.query.orderDirection || "DESC"
      const pagina = Number(req.query.pagina) || 1
      let result = []

      if (nome) {

         result = await connection.raw(`SELECT * FROM aula48_exercicio WHERE name LIKE "%${nome}%"
         ORDER BY ${orderBy} ${orderDirection} LIMIT 5 OFFSET ${5 * (pagina - 1)}`)
      }
      else if (tipo) {

         result = await connection.raw(`SELECT * FROM aula48_exercicio WHERE type LIKE "%${tipo}%"
         ORDER BY ${orderBy} ${orderDirection} LIMIT 5 OFFSET ${5 * (pagina - 1)}`)
      }
      else {

         result = await connection.raw(`SELECT * FROM aula48_exercicio
         ORDER BY ${orderBy} ${orderDirection} LIMIT 5 OFFSET ${5 * (pagina - 1)}`)
      }

      res.status(200).send(result[0])
   }
   catch(err) {

      res.status(400).send({ message: err.message })
   }
})

const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
})
