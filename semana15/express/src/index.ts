import express, {Request, Response} from 'express'
import cors from 'cors'
import {countries as countriesDefault, country} from './countries'

let countries = countriesDefault

const app = express()

app.use(express.json())
app.use(cors())

//Endpoint 1
app.get("/countries/all", (req: Request, res: Response) => {
    //res.status(200).send(countries.map(country => {return {id: country.id, name: country.name}}))
    res.status(200).send(countries)
})

//Endpoint 3
app.get("/countries/search", (req: Request, res: Response) => {

    const name = String(req.query.name)
    const capital = String(req.query.capital)
    const continent = String(req.query.continent)
    let result = countries

    if (name !== "undefined") { result = result.filter(country => { return country.name.includes(name) })}
    if (capital !== "undefined") { result = result.filter(country => { return country.capital.includes(capital) })}
    if (continent !== "undefined") { result = result.filter(country => { return country.continent.includes(continent) })}

    if (result.length > 0) { res.status(200).send(result) }
    else { res.status(404).send("Not Found")}
})

//Endpoint 2
app.get("/countries/:id", (req: Request, res: Response) => {

    const response = countries.find(country => {return country.id === Number(req.params.id)})

    if (response !== undefined) { res.status(200).send(response) }
    else { res.status(404).send("Not Found") }
})

//Endpoint 4
app.put("/countries/edit/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id)
    const name: string = req.body.name
    const capital: string = req.body.capital
    let found: boolean = false

    if (!name && !capital) { res.status(401).send("Body is missing.") ; return }
    
    countries = countries.map(country => {

        if (country.id === id) {

            found = true
            if (name && capital) { return {...country, name, capital}}
            else if (name && !capital) { return {...country, name}}
            else { return {...country, capital}}
        }
        else {

            return country
        }
    })

    if (!found) {
        res.status(404).send("Not Found")
    }
    res.status(200).send("List Changed")
})


app.listen(3007, () => {
    console.log("Server is running in http://localhost:3007")
})