import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const UPDATE_TASK = 'UPDATE_TASK'

const initialState = {
  taskList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        taskList: action.data
      }
    }
    case UPDATE_TASK: {
      return {
        ...state,
        taskList: [...state.taskList, action.lol]
      }
    }
    default:
      return {
        ...state
      }
  }
}

export function getTasks(category) {
  return (dispatch) => {
    axios(`http://localhost:8087/api/v1/tasks/${category}`)
      .then(({ data }) => {
        dispatch({
          type: GET_TASKS,
          data
        })
      })
      .catch(() =>
        dispatch({
          type: GET_TASKS,
          taskList: ['Error']
        })
      )
  }
}

export function updateTask() {
  return {
    type: UPDATE_TASK,
    lol: ['lalka']
  }
}
