import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { changeStatus, changeTitle, deleteTask } from '../redux/reducers/task'

const TaskComponent = (props) => {
  const { task, category } = props
  const [isEditMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const dispatch = useDispatch()
  const onChange = (e) => {
    setNewTitle(e.target.value)
  }
  const editSaveClick = () => {
    if (isEditMode) {
      dispatch(changeTitle(category, newTitle, task.taskId))
    }
    setEditMode(!isEditMode)
  }
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
  const buttonEdit = isEditMode ? 'save' : 'edit'

  return (
    <div className="text-gray-400">
      <button type="button" className="border rounded" onClick={editSaveClick}>
        {buttonEdit}
      </button>
      {isEditMode && (
        <input
          type="text"
          className="text-gray-300 text-gray-700"
          onChange={onChange}
          value={newTitle}
        />
      )}
      {!isEditMode && (
        // react-fragment. отрисует, но не будет класть в отдельный div при true
        <>
          <div className="font bold hover:text-gray-100">{task.title}</div>
          <div>{task.status}</div>
        </>
      )}
      <button
        type="button"
        className="border rounded bg-yellow-900 border-yellow-700"
        onClick={() => dispatch(changeStatus(category, task.taskId, status))}
      >
        {status}
      </button>
      {(task.status === 'in progress' || task.status === 'blocked') && (
        <button
          type="button"
          className="border rounded bg-red-900 border-red-700"
          onClick={() => dispatch(changeStatus(category, task.taskId, blocked))}
        >
          {blocked}
        </button>
      )}
      <button
        type="button"
        className="border rounded"
        onClick={() => dispatch(deleteTask(category, task.taskId))}
      >
        delete
      </button>
    </div>
  )
}

TaskComponent.propTypes = {}

export default React.memo(TaskComponent)
