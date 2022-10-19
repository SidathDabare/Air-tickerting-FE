/** @format */

import { SEARCH_TICKET, SET_LOADING, GET_DATA_ERROR } from "../actions"

const initialState = {
  searchData: {},
  loading: false,
  error: false,
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TICKET:
      return {
        ...state,
        searchData: action.payload,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: false,
      }
    case GET_DATA_ERROR:
      return {
        ...state,
        error: false,
      }
    // case DELETE_TICKET_DATA:
    //   return {
    //     ...state,
    //     searchData: {},
    //     loading: true,
    //   }
    default:
      return state
  }
}
