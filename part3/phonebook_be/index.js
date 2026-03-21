const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": "5",
        "name": "Mr Deleted",
        "number": "12122-12-1234"
    }
]

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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find((person) => person.id === id)
    response.send(`
        <p>
        Id: ${person.id} </br>
        Name: ${person.name} </br>
        Number: ${person.number} </br>
        </p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    console.log('deleting');
    const id = request.params.id
    persons = persons.filter((person) => person.id !== id)
    console.log(`Deleted person with id ${id}`);

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log('Error adding person: missing information');
        return response.status(400).json({ error: 'Missing information' })
    }

    const person = {
        "name": body.name,
        "number": body.number,
        "id": generateId(),
    }
    persons = persons.concat(person)
    console.log('person id:', person.id, 'list containts now:', persons.length);

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})