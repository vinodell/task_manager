import React from 'react'

const TaskComponent = (props) => {
  const { task } = props
  return (
    <div className="flex text-gray-700">
      <div>{task.title}</div>
      <div>{task.status}</div>
  <button type="button">{task.status}</button>
    </div>
  )
}

TaskComponent.propTypes = {}

export default React.memo(TaskComponent)