/** @format */

import { SET_LOGGED_IN_USER, SET_TOKEN } from "../actions"

const initialState = {
  loggedInUser: null,
  token: "",
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      }

    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload,
      }
    }

    default:
      return state
  }
}

export default userReducer
