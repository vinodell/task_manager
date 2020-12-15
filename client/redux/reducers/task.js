import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const CHANGE_STATUS = 'CHANGE_STATUS'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TITLE = 'CHANGE_TITLE'
const GET_TIMESPAN_TASK = 'GET_TIMESPAN_TASK'
const DELETE_TASK = 'DELETE_TASK'
const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST'

const initialState = {
  taskList: [],
  categoryList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
    case CHANGE_STATUS:
    case ADD_TASK:
    case CHANGE_TITLE:
    case GET_TIMESPAN_TASK:
    case DELETE_TASK: {
      return { ...state, taskList: action.taskList }
    }
    case GET_CATEGORY_LIST: {
      return {
        ...state,
        categoryList: action.data
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
    axios(`/api/v1/tasks/${category}`)
      .then(({ data }) => {
        dispatch({
          type: GET_TASKS,
          taskList: data
        })
      })
  }
}

export function changeStatus(category, id, status) {
  return (dispatch, getState) => {
    const store = getState()
    const { taskList } = store.task
    const changedStatus = taskList.map((item) => (item.taskId === id ? { ...item, status } : item))
    dispatch({
      type: CHANGE_STATUS,
      taskList: changedStatus
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

export function addTask(category, title) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/api/v1/tasks/${category}`,
      data: {
        title
      }
    }).then(({ data: taskList }) => {
      dispatch({
        type: ADD_TASK,
        taskList
      })
    })
  }
}

export function changeTitle(category, title, id) {
  return (dispatch) => {
    axios({
      method: 'patch',
      url: `/api/v1/tasks/${category}/${id}`,
      data: {
        title
      }
    }).then(({ data: taskList }) => {
      dispatch({
        type: CHANGE_TITLE,
        taskList
      })
    })
  }
}

export function getTimeSpanTask(category, timespan) {
  return (dispatch) => {
    axios(`/api/v1/tasks/${category}/${timespan}`).then(({ data: taskList }) => {
      dispatch({
        type: GET_TIMESPAN_TASK,
        taskList
      })
    })
  }
}

export function deleteTask(category, id) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `/api/v1/tasks/${category}/${id}`
    }).then(({ data: taskList }) =>
      dispatch({
        type: DELETE_TASK,
        taskList
      })
    )
  }
}

export function getCategoryList() {
  return (dispatch) => {
    axios(`/api/v1/categories`).then(({ data }) => {
      dispatch({
        type: GET_CATEGORY_LIST,
        data
      })
    })
  }
}
