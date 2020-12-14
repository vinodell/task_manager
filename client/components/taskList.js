import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Head from './head'
import NewTask from './newTask'
import TaskComponent from './taskComponent'
import { getTasks, getTimeSpanTask } from '../redux/reducers/task'

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
      <div>List of Task</div>
      <div className="flex">
        <button type="button" onClick={() => dispatch(getTasks(category))}>
          All
        </button>
        <button type="button" onClick={() => dispatch(getTimeSpanTask(category, 'day'))}>
          day
        </button>
        <button type="button" onClick={() => dispatch(getTimeSpanTask(category, 'week'))}>
          week
        </button>
        <button type="button" onClick={() => dispatch(getTimeSpanTask(category, 'month'))}>
          month
        </button>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-teal-900 hover:text-yellow-300 text-gray-300 font-bold rounded-lg border shadow-lg p-10">
          {taskList.map((item) => (
            <TaskComponent task={item} key={item.taskId} category={category} />
          ))}
          <NewTask category={category} />
        </div>
      </div>
    </div>
  )
}

TaskList.propTypes = {}

export default TaskList
