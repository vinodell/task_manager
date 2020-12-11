import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Head from './head'
import TaskComponent from './taskComponent'
import { getTasks, updateTask } from '../redux/reducers/task'

const TaskList = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const { taskList } = useSelector((s) => s.task)
  useEffect(() => {
    dispatch(getTasks(category))
  }, [dispatch, category])
  return (
    <div>
      <Head title="Hello" />
      List of Task
      <div className="flex items-center justify-center h-screen">
        <div className="bg-tean-800 hover:text-red-500 text-black font-bold rounded-lg border shadow-lg p-10">
          {taskList.map((item) => (
            <TaskComponent task={item} key={item.taskId} />
          ))}
          <button type="button" onClick={() => dispatch(updateTask())}>
            add
          </button>
        </div>
      </div>
    </div>
  )
}

TaskList.propTypes = {}

export default TaskList
