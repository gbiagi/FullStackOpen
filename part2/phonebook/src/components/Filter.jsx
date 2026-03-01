const Filter = ({ handleSearch, search }) => {
    return (
        <div>
            Filter shown list <input onChange={handleSearch} value={search} />
        </div>
    )
}

export default Filter