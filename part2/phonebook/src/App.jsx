import { use, useState } from 'react'

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
      <div>
        Filter shown list <input onChange={handleSearch} value={search} />
      </div>

      <h2>Add new</h2>
      <form>
        <div>
          name: <input onChange={handleNameChanger} value={newName} />
          <br />
          number: <input onChange={handleNumberChanger} value={newNumber} />
        </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filtered.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </div>
    </div>
  )
}

export default App