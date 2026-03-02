import { use, useEffect, useState } from 'react'
import axios from 'axios'
import PersonList from './components/PersonList'
import AddForm from './components/AddForm'
import Filter from './components/filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const names = persons.map((person) => person.name)
  const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    console.log('Fetching list from server')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('List fetched')
        setPersons(response.data)
      })
  }, [])

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