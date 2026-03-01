import { use, useState } from 'react'
import PersonList from './components/PersonList'
import AddForm from './components/AddForm'
import Filter from './components/filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const names = persons.map((person) => person.name)
  const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault() // prevents reload

    if (newName === '' || newNumber === '') {
      console.log("Empty fields error")
      alert("Fields cannot be empty")
      return
    }

    if (names.includes(newName)) {
      console.log("Name repeated error")
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChanger = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChanger = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} search={search} />
      <h2>Add new</h2>
      <AddForm
        handleNameChanger={handleNameChanger}
        handleNumberChanger={handleNumberChanger}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson} />
      <h2>Numbers</h2>
      <PersonList persons={filtered} />
    </div>
  )
}

export default App