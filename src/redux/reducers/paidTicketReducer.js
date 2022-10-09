/** @format */

import { TICKET_PAID } from "../actions"
const initialState = {
  paidTicket: {},
  //   loading: true,
  //   error: false,
}

export const paidTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_PAID:
      return {
        ...state,
        paidTicket: action.payload,
      }

    default:
      return state
  }
}
