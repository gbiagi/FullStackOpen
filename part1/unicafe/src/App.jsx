import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad

  if (total >= 1) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>
          good: {props.good} <br />
          neutral: {props.neutral} <br />
          bad: {props.bad} <br />
          total: {total} <br />
          average: {(props.good - props.bad) / total}<br />
          positive: {props.good * 100 / total}%
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given
      </div>)
  }


}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h2>Unicafe feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
