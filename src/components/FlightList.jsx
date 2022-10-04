/** @format */

import React, { useEffect, useState } from "react"
import { Alert, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import "../style/FlightList.css"

import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import FlightItemDeparture from "./FlightItemDeparture"
import FlightItemArrival from "./FlightItemArrival"
import Loader from "./Loader"

const FlightList = () => {
  const listItems = useSelector((state) => state.searchReducer.searchData)
  const isLoading = useSelector((state) => state.searchReducer.loading)
  const isError = useSelector((state) => state.searchReducer.error)

  const [flightData, setFlightData] = useState({})

  useEffect(() => {
    //localStorage.clear()

    setFlightData(listItems)
    //console.log(flightData)
    // console.log(isLoading)
    //console.log(isError)
  }, [listItems, flightData])
  return (
    <Container className='mt-3 bg-tranperent flight-list px-0'>
      {isLoading && (
        <div
          className='text-center rounded'
          style={{ backgroundColor: "#002741f0" }}>
          <Loader />
        </div>
      )}
      {isLoading ? (
        <Alert variant='danger'>An error happened :(</Alert>
      ) : (
        <>
          {flightData.data &&
            flightData.data.length > 0 &&
            flightData.data[0].itineraries[0] &&
            flightData.data[0].itineraries.length > 0 && (
              <>
                <div className='pb-3 bg-light rounded'>
                  <div className='d-flex justify-content-center align-items-center py-3 flight-list-header1 '>
                    <FlightTakeoffSharpIcon />
                    <h6 className='mb-0 mx-2'>Outbound,</h6>
                    <div className='align-items-center mb-0'>
                      <span>
                        {
                          flightData.data[0].itineraries[0].segments[0]
                            .departure.iataCode
                        }
                      </span>
                      <span> to </span>
                      <span>
                        {
                          flightData.data[0].itineraries[0].segments[
                            flightData.data[0].itineraries[0].segments.length -
                              1
                          ].arrival.iataCode
                        }
                      </span>

                      <span> {flightData.data.length}</span>
                      <span> options</span>
                    </div>
                  </div>
                  {flightData.data.map((listItem, i) => (
                    <FlightItemDeparture key={i} listItem={listItem} />
                  ))}
                </div>
              </>
            )}

          {flightData.data &&
            flightData.data.length > 0 &&
            flightData.data[0].itineraries[0] &&
            flightData.data[0].itineraries[1] &&
            flightData.data[0].itineraries.length > 0 && (
              <div className='pb-3 bg-light rounded'>
                <div className='d-flex justify-content-center align-items-center py-3 flight-list-header2 mt-3'>
                  <FlightTakeoffSharpIcon />
                  <h6 className='mb-0 mx-2'>Inbound,</h6>
                  <div className='align-items-center mb-0'>
                    <span>
                      {
                        flightData.data[0].itineraries[1].segments[0].departure
                          .iataCode
                      }
                    </span>
                    <span> to </span>
                    <span>
                      {
                        flightData.data[0].itineraries[1].segments[
                          flightData.data[0].itineraries[1].segments.length - 1
                        ].arrival.iataCode
                      }
                    </span>
                    <span> {flightData.data.length}</span>
                    <span> options</span>
                  </div>
                </div>
                {flightData.data.map((listItem, i) => (
                  <FlightItemArrival key={i} listItem={listItem} />
                ))}
              </div>
            )}
        </>
      )}
    </Container>
  )
}

export default FlightList
