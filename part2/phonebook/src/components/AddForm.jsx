const AddForm = ({ handleNameChanger, handleNumberChanger, newName, newNumber, addPerson }) => {
    return (
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
    )
}

export default AddForm