/** @format */

import {
  SET_PASSENGER_DETAILS,
  EDIT_PASSENGER_DETAILS,
  DELETE_PASSENGER_DETAILS,
} from "../actions/index.js"

const initialState = {
  passengerDetails: [],
}
export const passengerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSENGER_DETAILS:
      return {
        ...state,
        passengerDetails: [...state.passengerDetails, action.payload],
      }
    case EDIT_PASSENGER_DETAILS: {
      const index = state.passengerDetails.findIndex(
        (item) => item.id !== action.payload
      )
      const newArray = [...state.passengerDetails]
      newArray[index] = action.payload
      return {
        ...state, //copying the orignal state
        passengerDetails: newArray, //reassingning todos to new array
      }
    }
    case DELETE_PASSENGER_DETAILS: {
      const filterPassenger = state.passengerDetails.filter(
        (item) => item.id !== action.payload
      )
      return { ...state, passengerDetails: filterPassenger }
    }

    default:
      return state
  }
}
