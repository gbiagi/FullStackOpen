import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>
      {props.text}: {props.value}
    </div>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / total
  const positive = props.good * 100 / total

  if (total >= 1) {
    return (
      <div>
        <h2>Statistics</h2>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='total' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={`${positive} %`} />
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
