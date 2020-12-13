import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const UPDATE_TASK = 'UPDATE_TASK'
const CHANGE_STATUS = 'CHANGE_STATUS'
const ADD_TASK = 'ADD_TASK'

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
    case CHANGE_STATUS: {
      return {
        ...state,
        taskList: action.changedStatus
      }
    }
    case ADD_TASK : {
      return {
        ...state,
        taskList: [...state.taskList, action.data]
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

export function changeStatus(category, id, status) {
  return (dispatch, getState) => {
    const store = getState()
    const { taskList } = store.task
    const changedStatus = taskList.map((item) => (item.taskId === id ? { ...item, status } : item))
    dispatch({
      type: CHANGE_STATUS,
      changedStatus
    })
    axios({
      method: 'patch',
      url: `/api/v1/tasks/${category}/${id}`,
      data: {
        status
      }
    })
  }
}

export function addTask (category, title) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/api/v1/tasks/${category}`,
      data: {
        title
      }
    }).then(({ data }) => {
      dispatch({
        type: ADD_TASK,
        data
      })
    })
  }
}