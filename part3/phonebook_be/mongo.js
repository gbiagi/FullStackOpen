const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://gzfullstack:${password}@cluster0.u1vwd66.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length == 3) {
    console.log('Phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close()
    })
}
if (process.argv.length >= 4) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
