import { combineReducers } from "redux"

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILD,
  USER_ADD,
  USER_ADD_SUCCESS,
  USER_ADD_FAILD,
  USER_DETAILS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILD,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILD
} from "../constants" //Import the actions types constant we defined in our actions

let userLoginData = { data: [], loading: false, error: false };
let signupLoginData = { data: [], loading: false, error: false };
let getuserData = { data: [], loading: false, error: false };
let updateuserData = { data: [], loading: false, error: false };

/**
 * loginDataReducer
 * @param {*} state
 * @param {*} action
 */
const loginDataReducer = (state = userLoginData, action) => {
  switch (action.type) {
    case USER_LOGIN:
      state = Object.assign({}, state, { loading: true });
      return state;
    case USER_LOGIN_SUCCESS:
      state = Object.assign({}, state, { data: action.data, loading: false });
      return state;
    case USER_LOGIN_FAILD:
      state = Object.assign({}, state, { error: true, loading: false });
      return state;
    default:
      return state;
  }
};

/**
 * signupDataReducer
 * @param {*} state
 * @param {*} action
 */
const signupDataReducer = (state = signupLoginData, action) => {
  switch (action.type) {
    case USER_ADD:
      state = Object.assign({}, state, { loading: true });
      return state;
    case USER_ADD_SUCCESS:
      state = Object.assign({}, state, { data: action.data, loading: false });
      return state;
    case USER_ADD_FAILD:
      state = Object.assign({}, state, { error: true, loading: false });
      return state;
    default:
      return state;
  }
};

/**
 * getuserDataReducer
 * @param {*} state
 * @param {*} action
 */
const getuserDataReducer = (state = getuserData, action) => {
  switch (action.type) {
    case USER_DETAILS:
      state = Object.assign({}, state, { loading: true });
      return state;
    case USER_DETAILS_SUCCESS:
      state = Object.assign({}, state, { data: action.data, loading: false });
      return state;
    case USER_DETAILS_FAILD:
      state = Object.assign({}, state, { error: true, loading: false });
      return state;
    default:
      return state;
  }
};

/**
 * updateuserDataReducer
 * @param {*} state
 * @param {*} action
 */
const updateuserDataReducer = (state = updateuserData, action) => {
  switch (action.type) {
    case USER_UPDATE:
      state = Object.assign({}, state, { loading: true });
      return state;
    case USER_UPDATE_SUCCESS:
      state = Object.assign({}, state, { data: action.data, loading: false });
      return state;
    case USER_UPDATE_FAILD:
      state = Object.assign({}, state, { error: true, loading: false });
      return state;
    default:
      return state;
  }
};

// Combine all the reducers
const rootReducer = combineReducers({
  loginDataReducer,
  signupDataReducer,
  getuserDataReducer,
  updateuserDataReducer
});

export default rootReducer
