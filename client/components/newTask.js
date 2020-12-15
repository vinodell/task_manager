import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addTask } from '../redux/reducers/task'

const NewTask = (props) => {
  const { category } = props
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const onChange = (e) => setTitle(e.target.value)
  return (
    <div>
      <input type="text" className="text-gray-700 bg-gray-300" value={title} onChange={onChange} />
      <button
        type="button"
        className="border rounded"
        onClick={() => dispatch(addTask(category, title))}
      >
        Add
      </button>
    </div>
  )
}

NewTask.propTypes = {}

export default React.memo(NewTask)
