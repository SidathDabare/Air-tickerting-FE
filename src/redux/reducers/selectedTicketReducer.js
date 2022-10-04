/** @format */

import { SELECTED_TICKET } from "../actions/index.js"

const initialState = {
  selectedTicket: null,
  //   loading: true,
  //   error: false,
}
export const selectedTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_TICKET:
      return {
        ...state,
        selectedTicket: action.payload,
      }

    default:
      return state
  }
}
