require('dotenv').config();

const express = require('express')
var morgan = require('morgan')
const Person = require('./models/person')
const app = express()

morgan.token('person', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = []
let namesList = []
Person.find({}).then(result => {
    result.forEach(person => {
        persons.push(person.toJSON())
    })
    console.log('Phonebook fetched from db');
    namesList = persons.map((person) => person.name)
})
const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
    return id.toString()
}


app.get('/', (request, response) => {
    response.send('<h1>Phonebook Backend in NodeJS</h1>')
})


app.get('/info', (request, response) => {
    response.send(`
        <p>
        Phonebook has info for ${persons.length} people </br>
        ${new Date()}
        </p>`)
})

app.get('/api/persons', (request, response) => {
    console.log(persons);
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find((person) => person.id === id)
    if (!person) {
        console.log('Person not found');
        response.status(404).end()
    } else {
        response.send(`
        <p>
        Id: ${person.id} </br>
        Name: ${person.name} </br>
        Number: ${person.number} </br>
        </p>`)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    console.log('deleting');
    const id = request.params.id
    const person = persons.find((person) => person.id === id)
    if (!person) {
        console.log('Person not found');
        return response.status(404).json({ error: 'Person not found' })
    }

    namesList = namesList.filter((name) => name !== person.name)
    persons = persons.filter((person) => person.id !== id)

    console.log(`Deleted person with id ${id}`);
    console.log('person id:', person.id, 'list containts now:', persons.length);
    console.log('nameList contains now: ', namesList.length);

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log('Error adding person: missing information');
        return response.status(400).json({ error: 'Missing information' })
    }
    if (namesList.includes(body.name)) {
        console.log('Duplicated name error');
        return response.status(400).json({ error: 'Duplicated name' })
    }

    const person = {
        "name": body.name,
        "number": body.number,
        "id": generateId(),
    }
    persons = persons.concat(person)
    namesList.push(body.name)
    console.log('person id:', person.id, 'list containts now:', persons.length);
    console.log('nameList contains now: ', namesList.length);

    response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})