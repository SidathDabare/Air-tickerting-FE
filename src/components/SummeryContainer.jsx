/** @format */

import React, { useState } from "react"
import "../style/SummeryContainer.css"
import { Col, Row } from "react-bootstrap"
import Moment from "moment"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { useSelector } from "react-redux"
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined"
import { getTime } from "../redux/actions"

const SummeryContainer = () => {
  const selectedTicket = useSelector(
    (state) => state.selectedTicketReducer.selectedTicket
  )
  //console.log(selectedTicket)
  const [showSummery, setShowSummery] = useState(false)

  return (
    <>
      {selectedTicket ? (
        <div className='d-flex col-12 py-2 summery-container'>
          <div className='col-6'>
            <div>
              <span>
                {selectedTicket.itineraries[0].segments[0].departure.iataCode}
              </span>
              <span> to </span>
              <span>
                {
                  selectedTicket.itineraries[0].segments[
                    selectedTicket.itineraries[0].segments.length - 1
                  ].arrival.iataCode
                }
              </span>
              <span></span>
            </div>
            <div>
              <span>
                {selectedTicket.itineraries[1] ? "Return" : "One Way"}
              </span>
              <span>
                {" "}
                {selectedTicket.travelerPricings.length}{" "}
                {selectedTicket.travelerPricings.length > 1
                  ? "passengers"
                  : "passenger"}
              </span>
            </div>
          </div>
          <div className='d-flex col-6 justify-content-end align-items-center'>
            <h6 className='mr-2 mb-0'>
              <span>Cost </span>
              <span>{selectedTicket.price.currency} </span>
              <span>{selectedTicket.price.total}</span>
            </h6>
            <div className='bg-info rounded'>
              <h6 className='mb-0 p-2'>
                <span> View summary</span>
                <span onClick={() => setShowSummery(!showSummery)}>
                  {showSummery ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </span>
              </h6>
            </div>
          </div>

          <div className={showSummery ? "show-summery-div" : "d-none"}>
            <Col xs={12} className='bg-light text-dark'>
              <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                <div className='pl-3'>
                  <small className='font-weight-bold'>
                    {selectedTicket.id}
                    <span> </span>
                  </small>
                  <small>
                    {Moment(
                      selectedTicket.itineraries[0].segments[0].departure.at
                    ).format("MMM Do YY")}{" "}
                  </small>
                </div>
                <div className='d-flex align-items-center'>
                  {selectedTicket.itineraries[0].segments.map((segment, i) => (
                    <div key={i} className='px-1 mr-2'>
                      <span>
                        <img
                          className='carrier-img'
                          src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_18_16_t.png?background=fffff`}
                          alt=''
                        />
                      </span>
                      <small className='font-weight-bold'>
                        <span className='ml-2'>{segment.carrierCode} </span>{" "}
                        <span>{segment.number}</span>
                      </small>
                    </div>
                  ))}
                </div>
              </Row>
              <Row
                xs={12}
                className='d-flex justify-content-between align-items-center px-3 mt-4 pb-3'>
                <div xs={3} className='w-25'>
                  <p>
                    {
                      selectedTicket.itineraries[0].segments[0].departure
                        .iataCode
                    }
                  </p>
                  <h4>
                    {Moment(
                      selectedTicket.itineraries[0].segments[0].departure.at
                    ).format("HH:mm")}
                  </h4>
                </div>
                <div xs={6} className='w-50'>
                  <div className='text-center'>
                    <small>
                      {getTime(selectedTicket.itineraries[0].duration)}
                    </small>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <div className='line'></div>
                    <ConnectingAirportsOutlinedIcon />
                    <div className='line'></div>
                  </div>
                  <div className='text-center'>
                    <small className='connection'>
                      {selectedTicket.itineraries[0].segments.length} connection
                    </small>
                  </div>
                </div>
                <div xs={3} className='w-25 text-right'>
                  <p>
                    {
                      selectedTicket.itineraries[0].segments[
                        selectedTicket.itineraries[0].segments.length - 1
                      ].arrival.iataCode
                    }
                  </p>
                  <h4>
                    {Moment(
                      selectedTicket.itineraries[0].segments[
                        selectedTicket.itineraries[0].segments.length - 1
                      ].arrival.at
                    ).format("HH:mm")}
                  </h4>
                </div>
              </Row>
            </Col>
            {selectedTicket.itineraries[1] ? (
              <Col xs={12} className='bg-light text-dark'>
                <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                  <div className='pl-3'>
                    <small className='font-weight-bold'>
                      {selectedTicket.id}
                      <span> </span>
                    </small>
                    <small>
                      {Moment(
                        selectedTicket.itineraries[1].segments[0].departure.at
                      ).format("MMM Do YY")}{" "}
                    </small>
                  </div>
                  <div className='d-flex align-items-center'>
                    {selectedTicket.itineraries[1].segments.map(
                      (segment, i) => (
                        <div key={i} className='px-1 mr-2'>
                          <span>
                            <img
                              className='carrier-img'
                              src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_18_16_t.png?background=fffff`}
                              alt=''
                            />
                          </span>
                          <small className='font-weight-bold'>
                            <span className='ml-2'>{segment.carrierCode} </span>{" "}
                            <span>{segment.number}</span>
                          </small>
                        </div>
                      )
                    )}
                  </div>
                </Row>
                <Row
                  xs={12}
                  className='d-flex justify-content-between align-items-center px-3 mt-4 pb-3'>
                  <div xs={3} className='w-25'>
                    <p>
                      {
                        selectedTicket.itineraries[1].segments[0].departure
                          .iataCode
                      }
                    </p>
                    <h4>
                      {Moment(
                        selectedTicket.itineraries[1].segments[0].departure.at
                      ).format("HH:mm")}
                    </h4>
                  </div>
                  <div xs={6} className='w-50'>
                    <div className='text-center'>
                      <small>
                        {getTime(selectedTicket.itineraries[1].duration)}
                      </small>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                      <div className='line'></div>
                      <ConnectingAirportsOutlinedIcon />
                      <div className='line'></div>
                    </div>
                    <div className='text-center'>
                      <small className='connection'>
                        {selectedTicket.itineraries[1].segments.length}{" "}
                        connection
                      </small>
                    </div>
                  </div>
                  <div xs={3} className='w-25 text-right'>
                    <p>
                      {
                        selectedTicket.itineraries[1].segments[
                          selectedTicket.itineraries[1].segments.length - 1
                        ].arrival.iataCode
                      }
                    </p>
                    <h4>
                      {Moment(
                        selectedTicket.itineraries[1].segments[
                          selectedTicket.itineraries[1].segments.length - 1
                        ].arrival.at
                      ).format("HH:mm")}
                    </h4>
                  </div>
                </Row>
              </Col>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div>No data</div>
      )}
    </>
  )
}

export default SummeryContainer
