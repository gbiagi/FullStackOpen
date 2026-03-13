const Notification = ({ message, error }) => {
    if (message != null && error === null) {
        return (
            <div className="notification">
                {message}
            </div>
        )
    } else if (message === null && error != null) {
        return (
            <div className="error">
                {error}
            </div>
        )
    } else {
        (message === null && error === null)
        return null
    }
}

export default Notification