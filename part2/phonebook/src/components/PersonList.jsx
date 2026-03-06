const PersonList = ({ persons, deletePerson }) => {
    return (
        <div>
            {persons.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>Delete</button>
                </li>

            ))}
        </div>)
}

export default PersonList