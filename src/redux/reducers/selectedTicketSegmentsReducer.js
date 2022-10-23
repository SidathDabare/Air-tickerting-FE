/** @format */

import { SELECTED_TICKET_SEGMENTS } from "../actions/index.js"

const initialState = {
  selectedTicketSegments: [],
  //   loading: true,
  //   error: false,
}
export const selectedTicketSegmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_TICKET_SEGMENTS:
      return {
        ...state,
        selectedTicketSegments: [...action.payload],
      }

    default:
      return state
  }
}
