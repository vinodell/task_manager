import React from 'react'
import { useDispatch } from 'react-redux'

import { changeStatus } from '../redux/reducers/task'

const TaskComponent = (props) => {
  const dispatch = useDispatch()
  const { task, category } = props
  let status
  switch (task.status) {
    case 'new':
    case 'done': {
      status = 'in progress'
      break
    }
    case 'in progress':
    case 'blocked': {
      status = 'done'
      break
    }
    default:
      status = 'in progress'
  }
  const blocked = task.status === 'blocked' ? 'in progress' : 'blocked'

  return (
    <div className="text-gray-700">
      <div>{task.title}</div>
      <div>{task.status}</div>
      <button
        type="button"
        className="border rounded"
        onClick={() => dispatch(changeStatus(category, task.taskId, status))}
      >
        {status}
      </button>
      {(task.status === 'in progress' || task.status === 'blocked') && (
        <button
          type="button"
          onClick={() => dispatch(changeStatus(category, task.taskId, blocked))}
        >
          {blocked}
        </button>
      )}
    </div>
  )
}

TaskComponent.propTypes = {}

export default React.memo(TaskComponent)  
