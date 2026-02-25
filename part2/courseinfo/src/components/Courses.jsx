const Courses = ({ courses }) => {
    const courseList = courses.map(course =>
        <div key={course.id}>
            <Course course={course} />
        </div>
    )
    return (courseList)
}

const Course = ({ course }) => {
    console.log("Name:", course.name)
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => {
    const courseParts = props.parts.map(part =>
        <li key={part.id}>
            <Part part={part} />
        </li>
    )
    return (
        <div>
            {courseParts}
        </div>)
}

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

const Total = (props) => {
    const exList = props.parts.map(part => part.exercises)
    const totalEx = exList.reduce((sum, current) => (sum + current))
    console.log("total", totalEx)
    return (
        <h3>Total of {totalEx} exercises</h3>)
}

export default Courses