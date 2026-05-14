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

function updateList() {
    persons = []
    Person.find({})
        .then(result => {
            result.forEach(person => {
                persons.push(person.toJSON())
            })
            console.log('Phonebook fetched from db, list lenght:', persons.length);
        })
        .catch(error => next(error))
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

updateList()

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

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }
            person.name = name
            person.number = number

            console.log('Changed', name, 'number to:', number);
            return person.save().then((updatedPerson) => {
                updateList()
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            updateList()
            console.log(`Deleted person with id ${id}`);
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log('Error adding person: missing information');
        return response.status(400).json({ error: 'Missing information' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(result => {
        updateList()
        console.log(`added ${result.name} number ${result.number} to phonebook, list containts now:`, persons.length)
        response.json(person)
    })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})