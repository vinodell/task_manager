import React from 'react'
import { useDispatch } from 'react-redux'
import { getTimeSpanTask, getTasks } from '../redux/reducers/task'

const TimeSpanButton = ({ category, title, setActiveButton, isActive }) => {
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      className={`border rounded m-2 px-2 ${isActive ? 'bg-blue-500' : 'bg-green-500'}`}
      onClick={() => {
        dispatch(title === 'all' ? getTasks(category) : getTimeSpanTask(category, title))
        setActiveButton(title)
      }}
    >
      {title}
    </button>
  )
}

TimeSpanButton.propTypes = {}

export default TimeSpanButton
