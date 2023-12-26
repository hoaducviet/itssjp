//describe your actions here
import * as types from "./actionTypes";
import axios from "axios";


const getWorkSpace = () => (dispatch) => {
  dispatch({ type: types.GET_TASKS_REQUEST });
  return axios
    .get(`https://6586fd43468ef171392f1856.mockapi.io/workspace`)
    .then((res) => {
      dispatch({ type: types.GET_WORKSPACE_SUCCESS, payload: res.data });

    })
    .catch((e) => {
      dispatch({ type: types.GET_WORKSPACE_FAILURE, payload: e });

    });
};


const createWorkSpace = (payload) => (dispatch) => {
  dispatch({ type: types.CREATE_WORKSPACE_REQUEST });
  return axios
    .post(`https://6586fd43468ef171392f1856.mockapi.io/workspace`, payload)
    .then((res) => {
      console.log(res);
      dispatch({ type: types.CREATE_WORKSPACE_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.CREATE_WORKSPACE_FAILURE, payload: e });
    });
}

const updateWorkSpace = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_WORKSPACE_REQUEST });
  return axios
    .put(`https://6586fd43468ef171392f1856.mockapi.io/workspace/${id}`, payload)
    .then((r) => {
      dispatch({ type: types.UPDATE_WORKSPACE_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.UPDATE_WORKSPACE_FAILURE, payload: e });
    });
};

const deleteWorkSpace = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_WORKSPACE_REQUEST });
  return axios
    .delete(`https://6586fd43468ef171392f1856.mockapi.io/workspace/${id}`)
    .then((res) => {
      dispatch({ type: types.DELETE_WORKSPACE_SUCCESS, payload: res });
    })
    .catch((e) => {
      dispatch({ type: types.DELETE_WORKSPACE_FAILURE, payload: e });
    });
};

const getTasks = () => (dispatch) => {
  dispatch({ type: types.GET_TASKS_REQUEST });
  return axios
    .get(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks`)
    .then((res) => {
      console.log("tasks: ", res.data);
      dispatch({ type: types.GET_TASKS_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_TASKS_FAILURE, payload: e });
    });
};

const getTagsList = () => (dispatch) => {
  dispatch({ type: types.GET_TAGS_REQUEST });
  return axios
    .get(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tagList`)
    .then((r) => {
      dispatch({ type: types.GET_TAGS_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_TAGS_FAILURE, payload: e });
    });
};

const updateSubtasksList = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_SUBTASKS_REQUEST });
  return axios
    .put(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks/${id}`, payload)
    .then((r) => {
      dispatch({ type: types.UPDATE_SUBTASKS_SUCCESS, payload: r });
    })
    .catch((e) => {
      dispatch({ type: types.UPDATE_SUBTASKS_FAILURE, payload: e });
    });
};

const updateTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });
  return axios
    .put(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks/${id}`, payload)
    .then((r) => {
      dispatch({ type: types.UPDATE_TASK_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.UPDATE_TASK_FAILURE, payload: e });
    });
};

const addTags = (tag) => (dispatch) => {
  dispatch({ type: types.ADD_TAGS_REQUEST });
  return axios
    .post(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tagList`, { tag })
    .then((r) => {
      dispatch({ type: types.ADD_TAGS_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.ADD_TAGS_FAILURE, payload: e });
    });
};

const createTasks = (payload) => (dispatch) => {
  dispatch({ type: types.CREATE_TASK_REQUEST });
  return axios
    .post(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks`, payload)
    .then((res) => {
      dispatch({ type: types.CREATE_TASK_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.CREATE_TASK_FAILURE, payload: e });
    });
};

const deleteTasks = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_TASK_REQUEST });
  return axios
    .delete(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks/${id}`)
    .then((res) => {
      dispatch({ type: types.DELETE_TASK_SUCCESS, payload: res });
    })
    .catch((e) => {
      dispatch({ type: types.DELETE_TASK_FAILURE, payload: e });
    });
};

/* Events */

const getEvents = () => (dispatch) => {
  dispatch({ type: types.GET_EVENTS_REQUEST });
  return axios
    .get(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks`)
    .then((res) => {
      res.data = res.data.map((item) => ({
        title: item.title,
        id: item.id,
        start: new Date(item.DateStart),
        end: new Date(item.DateEnd),
        start_time: item.TimeStart,
        end_time: item.TimeEnd,
        description: item.description,
        userID: item.userID,
      }));
      dispatch({ type: types.GET_EVENTS_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_EVENTS_FAILURE, payload: e });
    });
};

const addEvents = (event) => (dispatch) => {
  dispatch({ type: types.ADD_EVENTS_REQUEST });
  return axios
    .post("https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks", event)
    .then((r) => {
      dispatch({ type: types.ADD_EVENTS_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.ADD_EVENTS_FAILURE, payload: e });
    });
};

const updateEvent = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_EVENT_REQUEST });
  return axios
    .put(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks/${id}`, payload)
    .then((r) => {
      dispatch({ type: types.UPDATE_EVENT_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.UPDATE_EVENT_FAILURE, payload: e });
    });
};

const deleteEvent = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_EVENT_REQUEST });
  return axios
    .delete(`https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks/${id}`)
    .then((res) => {
      dispatch({ type: types.DELETE_EVENT_SUCCESS, payload: res });
    })
    .catch((e) => {
      dispatch({ type: types.DELETE_EVENT_FAILURE, payload: e });
    });
};

const getCheckPoint = () => (dispatch) => {
  dispatch({ type: types.GET_CHECKPOINT_REQUEST });
  return axios
    .get(`https://639a7c9f3a5fbccb5267f6a0.mockapi.io/checkpoint`)
    .then((res) => {
      dispatch({ type: types.GET_CHECKPOINT_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_CHECKPOINT_FAILURE, payload: e });
    });
};

const addCheckPoint = (payload) => (dispatch) => {
  dispatch({ type: types.GET_CHECKPOINT_REQUEST });
  return axios
    .post(`https://639a7c9f3a5fbccb5267f6a0.mockapi.io/checkpoint`, payload)
    .then((res) => {
      dispatch({ type: types.GET_CHECKPOINT_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_CHECKPOINT_FAILURE, payload: e });
    });
};

const updateCheckPoints = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_CHECKPOINT_REQUEST });
  return axios
    .put(
      `https://639a7c9f3a5fbccb5267f6a0.mockapi.io/checkpoint/${id}`,
      payload
    )
    .then((r) => {
      dispatch({ type: types.UPDATE_CHECKPOINT_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.UPDATE_CHECKPOINT_FAILURE, payload: e });
    });
};

export {
  getWorkSpace,
  createWorkSpace,
  updateWorkSpace,
  deleteWorkSpace,
  getTasks,
  getTagsList,
  updateSubtasksList,
  updateTasks,
  addTags,
  createTasks,
  deleteTasks,
  getCheckPoint,
  addCheckPoint,
  updateCheckPoints,
  getEvents,
  addEvents,
  updateEvent,
  deleteEvent,
};
