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

Person.find({}).then(result => {
    result.forEach(person => {
        persons.push(person.toJSON())
    })
    console.log('Phonebook fetched from db');
})
// const generateId = () => {
//     const id = Math.floor(Math.random() * 1000)
//     return id.toString()
// }

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
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
    console.log('persons list lenght:', persons.length);
    response.json(persons)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    console.log('deleting person with id:', id);

    // const person = persons.find((person) => person.id === id)
    // if (!person) {
    //     console.log('Person not found');
    //     return response.status(404).json({ error: 'Person not found' })
    // }

    // 

    Person.findByIdAndDelete(id)
        .then(result => {
            persons = persons.filter((person) => person.id !== id)
            response.status(204).end()
        })
        .catch(error => next(error))

    console.log(`Deleted person with id ${id}`);
    console.log('list containts now:', persons.length);

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log('Error adding person: missing information');
        return response.status(400).json({ error: 'Missing information' })
    }

    // const person = {
    //     "name": body.name,
    //     "number": body.number,
    //     "id": generateId(),
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(result => {
        persons.push(result)
        console.log(`added ${result.name} number ${result.number} to phonebook, list containts now:`, persons.length)
        response.json(person)
    })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})