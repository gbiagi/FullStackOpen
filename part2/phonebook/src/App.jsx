import { use, useEffect, useState } from 'react'
import axios from 'axios'
import PersonList from './components/PersonList'
import AddForm from './components/AddForm'
import Filter from './components/filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const names = persons.map((person) => person.name)
  const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  // Get list of numbers from server
  useEffect(() => {
    console.log('Fetching list from server')
    personService.getAll().then((initialPersons) => { setPersons(initialPersons) })
  }
    , [])

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
    }

    personService.create(newPerson).then((returnedPerson) => {
      console.log('Person: ', returnedPerson)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })

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

  const handleDelete = (id) => {
    const person = persons.find((n) => n.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id).then((returnedPerson) =>
        console.log('Deleted person:', returnedPerson))
      const updatedPersons = persons.filter((person) => person.id !== id)
      setPersons(updatedPersons)
    } else {
      console.log("Delete action cancelled")
    }
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
      <PersonList persons={filtered} deletePerson={handleDelete} />
    </div>
  )
}

export default App