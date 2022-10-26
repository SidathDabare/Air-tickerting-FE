/** @format */

import { SET_BOOKED_TICKET_ID } from "../actions/index.js"

const initialState = {
  orderTicketId: {},
  //   loading: true,
  //   error: false,
}
export const orderTicketIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKED_TICKET_ID:
      return {
        ...state,
        orderTicketId: action.payload,
      }

    default:
      return state
  }
}
