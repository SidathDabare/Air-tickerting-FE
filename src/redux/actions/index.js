/** @format */
export const SET_USER_DETAILS = "SET_USER_DETAILS"
export const SEARCH_TICKET = "SEARCH_TICKET"
export const SET_LOADING = "SET_LOADING"
export const GET_DATA_ERROR = "GET_DATA_ERROR"
export const SELECTED_TICKET = "SELECTED_TICKET"
export const SET_TOKEN = "SET_TOKEN"
export const SET_LOGGED_IN_USER = "SET_LOGGED_IN_USER"
export const SET_PASSENGER_DETAILS = "SET_PASSENGER_DETAILS"
export const EDIT_PASSENGER_DETAILS = "EDIT_PASSENGER_DETAILS"
export const DELETE_PASSENGER_DETAILS = "DELETE_PASSENGER_DETAILS"
export const SET_BOOKED_TICKET = "SET_BOOKED_TICKET"
export const DELETE_TICKET_DATA = "DELETE_TICKET_DATA"
export const SELECTED_TICKET_SEGMENTS = "SELECTED_TICKET_SEGMENTS"
export const SELECTED_USER = "SELECTED_USER"
export const TICKET_PAID = "TICKET_PAID"
export const SET_BOOKED_TICKET_ID = "SET_BOOKED_TICKET_ID"

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET

export const getAmadeusToken = async () => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

  var urlencoded = new URLSearchParams()
  urlencoded.append("client_id", clientId)
  urlencoded.append("client_secret", clientSecret)
  urlencoded.append("grant_type", "client_credentials")

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  }
  try {
    const response = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      requestOptions
    )
    let token = await response.json()
    //console.log(token.access_token)

    return token.access_token
  } catch (error) {
    console.log(error)
  }
}

// export const searchAction = (
//   originLocationCode,
//   destinationLocationCode,
//   departureDate,
//   tripType,
//   returnDate,
//   adults
// ) => {
//   return async (dispatch) => {
//     let token = await getAmadeusToken()
//     //console.log(token)
//     let headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-type": "application/json",
//     }

//     if (tripType === "One way") {
//       let response = await fetch(
//         `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=5`,
//         {
//           method: "GET",
//           headers,
//         }
//       )
//       if (response.ok) {
//         let searchData = await response.json()

//         dispatch({
//           type: SEARCH_TICKET,
//           payload: searchData,
//         })
//         dispatch({
//           type: SET_LOADING,
//         })
//       } else {
//         console.log("Error")
//         dispatch({
//           type: GET_DATA_ERROR,
//         })
//       }
//     } else {
//       let response = await fetch(
//         `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&max=5`,
//         {
//           method: "GET",
//           headers,
//         }
//       )
//       if (response.ok) {
//         let searchData = await response.json()

//         dispatch({
//           type: SEARCH_TICKET,
//           payload: searchData,
//         })
//         dispatch({
//           type: SET_LOADING,
//         })
//       } else {
//         console.log("Error")
//         dispatch({
//           type: GET_DATA_ERROR,
//         })
//         dispatch({
//           type: SET_LOADING,
//         })
//       }
//     }
//   }
// }
export const searchAction = (data) => {
  return async (dispatch) => {
    try {
      let ticketData = await data
      dispatch({
        type: SEARCH_TICKET,
        payload: ticketData,
      })
      dispatch({
        type: SET_LOADING,
      })
    } catch (error) {
      dispatch({
        type: GET_DATA_ERROR,
      })
    }
  }
}
// export const searchAction = (data) => {
//   return {
//     type: SEARCH_TICKET,
//     payload: data,
//   }
// }
export const isLoading = (data) => {
  return {
    type: SEARCH_TICKET,
    payload: data,
  }
}

export const deleteTicketDataAction = (data) => {
  return {
    type: DELETE_TICKET_DATA,
    payload: data,
  }
}

export const getTime = (str) => {
  let numbers = str.slice(2, str.length).toLowerCase()
  return numbers
}
export const selectedTicketAction = (ticket) => {
  return {
    type: SELECTED_TICKET,
    payload: ticket,
  }
}
export const selectedSegmentsAction = (segments) => {
  return {
    type: SELECTED_TICKET_SEGMENTS,
    payload: segments,
  }
}
export const selectedUser = (user) => {
  return {
    type: SELECTED_USER,
    payload: user,
  }
}
export const setTokenAction = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  }
}
export const setLoggedInUserAction = (user) => {
  return {
    type: SET_LOGGED_IN_USER,
    payload: user,
  }
}
export const setPassengerDetailsAction = (passenger) => {
  return {
    type: SET_PASSENGER_DETAILS,
    payload: passenger,
  }
}
export const editPassengerDetailsAction = (passenger) => {
  return {
    type: EDIT_PASSENGER_DETAILS,
    payload: passenger,
  }
}
export const deletePassengerDetailsAction = (passenger) => {
  return {
    type: DELETE_PASSENGER_DETAILS,
    payload: passenger,
  }
}
export const setBookedTicket = (ticket) => {
  return {
    type: SET_BOOKED_TICKET,
    payload: ticket,
  }
}
export const setBookedTicketId = (id) => {
  return {
    type: SET_BOOKED_TICKET_ID,
    payload: id,
  }
}
// export const ticketPaidAction = (ticketPaid) => {
//   return {
//     type: TICKET_PAID,
//     payload: ticketPaid,
//   }
// }
