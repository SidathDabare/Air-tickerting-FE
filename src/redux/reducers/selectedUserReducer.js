/** @format */

import { SELECTED_USER } from "../actions/index.js"

const initialState = {
  selectedUser: null,
  //   loading: true,
  //   error: false,
}
export const selectedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      }

    default:
      return state
  }
}
