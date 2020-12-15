import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import Head from './head'
import NewTask from './newTask'
import TaskComponent from './taskComponent'
import { getTasks } from '../redux/reducers/task'
import TimeSpanButton from './timeSpanButton'

const TaskList = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const { taskList } = useSelector((s) => s.task)
  const timeSpanArr = ['day', 'week', 'month']
  useEffect(() => {
    dispatch(getTasks(category))
  }, [dispatch, category])
  const [activeButton, setActiveButton] = useState('all')
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-teal-900 text-gray-300 font-bold rounded-lg border shadow-lg p-10">
          <div className="flex mx-2 py-2 justify-between font-bold">
            {['all', ...timeSpanArr].map((timespan) => (
              <TimeSpanButton
                category={category}
                title={timespan}
                key={timespan}
                isActive={activeButton === timespan}
                setActiveButton={setActiveButton}
              />
            ))}
          </div>
          {taskList.map((item) => (
            <TaskComponent task={item} key={item.taskId} category={category} />
          ))}
          <NewTask category={category} />
          <div className="flex hover:text-yellow-300">
            <Link to="/">back</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

TaskList.propTypes = {}

export default TaskList
