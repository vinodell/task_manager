import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import task from './task'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    task
  })

export default createRootReducer
