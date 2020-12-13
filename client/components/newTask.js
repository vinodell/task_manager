import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addTask } from '../redux/reducers/task'

const NewTask = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)
  return (
    <div>
      <input
        type="text"
        className="text-gray-700"
        value={value}
        onChange={onChange}
      />
      <button type="button" className="border rounded" onClick={() => dispatch(addTask())}>
        Add
      </button>
    </div>
  )
}

NewTask.propTypes = {}

export default React.memo(NewTask)
