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

export const searchAction = (
  originLocationCode,
  destinationLocationCode,
  departureDate,
  tripType,
  returnDate,
  adults
) => {
  return async (dispatch) => {
    let token = await getAmadeusToken()
    //console.log(token)
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }

    if (tripType === "One way") {
      let response = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=5`,
        {
          method: "GET",
          headers,
        }
      )
      if (response.ok) {
        let searchData = await response.json()
        //console.log(searchData)
        dispatch({
          type: SEARCH_TICKET,
          payload: searchData,
        })
        dispatch({
          type: SET_LOADING,
        })
      } else {
        console.log("Error")
        dispatch({
          type: GET_DATA_ERROR,
        })
      }
    } else {
      let response = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&max=3`,
        {
          method: "GET",
          headers,
        }
      )
      if (response.ok) {
        let searchData = await response.json()
        //console.log(searchData)
        dispatch({
          type: SEARCH_TICKET,
          payload: searchData,
        })
        dispatch({
          type: SET_LOADING,
        })
      } else {
        console.log("Error")
        dispatch({
          type: GET_DATA_ERROR,
        })
        dispatch({
          type: SET_LOADING,
        })
      }
    }
  }
}

export const selectedTicketAction = (ticket) => {
  return {
    type: SELECTED_TICKET,
    payload: ticket,
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
