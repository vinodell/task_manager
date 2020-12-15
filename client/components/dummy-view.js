import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getCategoryList } from '../redux/reducers/task'
import Head from './head'

const Dummy = () => {
  const dispatch = useDispatch()
  const { categoryList } = useSelector((s) => s.task)
  useEffect(() => {
    dispatch(getCategoryList())
  }, [dispatch])
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          {categoryList.map((item, index) => {
            return (
              <div key={item}>
                <Link className="flex flex-col hover:text-red-500 py-2" to={`/${item}`}>
                  {index + 1}) {item}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
