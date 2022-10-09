/** @format */

import { SET_BOOKED_TICKET } from "../actions/index.js"

const initialState = {
  bookedTicket: {},
  //   loading: true,
  //   error: false,
}
export const bookedTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKED_TICKET:
      return {
        ...state,
        bookedTicket: action.payload,
      }

    default:
      return state
  }
}
