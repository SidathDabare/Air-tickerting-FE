/** @format */

import React, { useEffect, useState } from "react"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import "../style/OrderComponent.css"
import { format, parseISO } from "date-fns"

import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import { Col, Row } from "react-bootstrap"
import Moment from "moment"
import Loader from "../components/Loader"

const OrderComponent = (props) => {
  //console.log(props.order)
  const [showInfo, setShowInfo] = useState(false)
  useEffect(() => {
    // setShowInfo(false)
  }, [props, showInfo])
  return (
    <>
      <div
        className={
          showInfo
            ? "col-11 mx-auto d-flex py-2 my-2 px-0 text-dark order-item add-thick-border add-background"
            : "col-11 mx-auto d-flex py-2 my-2 px-0 text-dark order-item border"
        }>
        <div className='col-3 d-flex justify-content-center align-items-center'>
          <span>
            {
              props.order.data.flightOffers[0].itineraries[0].segments[0]
                .departure.iataCode
            }
          </span>
          <span className='mx-1'>to</span>
          <span>
            {" "}
            {
              props.order.data.flightOffers[0].itineraries[0].segments[
                props.order.data.flightOffers[0].itineraries[0].segments
                  .length - 1
              ].arrival.iataCode
            }
          </span>
        </div>
        <div className='col-3 d-flex justify-content-center align-items-center'>
          {format(
            parseISO(
              props.order.data.flightOffers[0].itineraries[0].segments[0]
                .departure.at
            ),
            "qo MMM yy"
          )}
        </div>
        <div className='col-3 d-flex justify-content-center align-items-center'>
          <span className='mx-1'>
            {props.order.data.flightOffers[0].price.billingCurrency}
          </span>
          <span>{props.order.data.flightOffers[0].price.total}</span>
        </div>
        <div className='col-3 d-flex justify-content-center align-items-center'>
          <span className='mx-2'>info</span>
          {showInfo ? (
            <KeyboardArrowUpIcon onClick={() => setShowInfo(!showInfo)} />
          ) : (
            <ArrowDropDownIcon onClick={() => setShowInfo(!showInfo)} />
          )}
        </div>
      </div>
      <div
        className={
          showInfo
            ? "col-11 mx-auto animation py-2 order-item-show add-thick-border add-background "
            : "col-11 mx-auto d-none animation"
        }
        style={{ height: "auto" }}>
        <div className='col-12'>
          {props.order.data.flightOffers[0] ? (
            <>
              <div className='d-flex justify-content-center mt-2 passenger-flight-list-header1 py-2'>
                <FlightTakeoffSharpIcon />
                <h6 className='mb-0 mx-2'>Outbound,</h6>
              </div>

              <Col xs={12} className='bg-light text-dark'>
                <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                  <div className='pl-3'>
                    <small className='font-weight-bold'>
                      {props.order.data.flightOffers[0].id}
                      <span> </span>
                    </small>
                    <small>
                      {Moment(
                        props.order.data.flightOffers[0].itineraries[0]
                          .segments[0].departure.at
                      ).format("MMM Do YY")}{" "}
                    </small>
                  </div>
                  <div className='d-flex align-items-center'>
                    {props.order.data.flightOffers[0].itineraries[0].segments.map(
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
                        props.order.data.flightOffers[0].itineraries[0]
                          .segments[0].departure.iataCode
                      }
                    </p>
                    <h4>
                      {Moment(
                        props.order.data.flightOffers[0].itineraries[0]
                          .segments[0].departure.at
                      ).format("HH:mm")}
                    </h4>
                  </div>
                  <div xs={6} className='w-50'>
                    <div className='text-center'>
                      {/* <small>
                              {getTime(
                                props.order.data.flightOffers[0].itineraries[0]
                                  .segments[0].duration
                              )}
                            </small> */}
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                      <div className='line'></div>
                      <ConnectingAirportsOutlinedIcon />
                      <div className='line'></div>
                    </div>
                    <div className='text-center'>
                      <small>
                        {
                          props.order.data.flightOffers[0].itineraries[0]
                            .segments.length
                        }{" "}
                        connection
                      </small>
                    </div>
                  </div>
                  <div xs={3} className='w-25 text-right'>
                    <p>
                      {
                        props.order.data.flightOffers[0].itineraries[0]
                          .segments[
                          props.order.data.flightOffers[0].itineraries[0]
                            .segments.length - 1
                        ].arrival.iataCode
                      }
                    </p>
                    <h4>
                      {Moment(
                        props.order.data.flightOffers[0].itineraries[0]
                          .segments[
                          props.order.data.flightOffers[0].itineraries[0]
                            .segments.length - 1
                        ].arrival.at
                      ).format("HH:mm")}
                    </h4>
                  </div>
                </Row>
              </Col>
              {props.order.data.flightOffers[0].itineraries[1] ? (
                <>
                  <div className='d-flex justify-content-center mt-2 passenger-flight-list-header1 py-2'>
                    <FlightTakeoffSharpIcon />
                    <h6 className='mb-0 mx-2'>Intbound,</h6>
                  </div>
                  <Col xs={12} className='bg-light text-dark'>
                    <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                      <div className='pl-3'>
                        <small className='font-weight-bold'>
                          {props.order.data.flightOffers[0].id}
                          <span> </span>
                        </small>
                        <small>
                          {Moment(
                            props.order.data.flightOffers[0].itineraries[1]
                              .segments[0].departure.at
                          ).format("MMM Do YY")}{" "}
                        </small>
                      </div>
                      <div className='d-flex align-items-center'>
                        {props.order.data.flightOffers[0].itineraries[1].segments.map(
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
                                <span className='ml-2'>
                                  {segment.carrierCode}{" "}
                                </span>{" "}
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
                            props.order.data.flightOffers[0].itineraries[1]
                              .segments[0].departure.iataCode
                          }
                        </p>
                        <h4>
                          {Moment(
                            props.order.data.flightOffers[0].itineraries[1]
                              .segments[0].departure.at
                          ).format("HH:mm")}
                        </h4>
                      </div>
                      <div xs={6} className='w-50'>
                        <div className='text-center'>
                          <small>
                            {/* {getTime(
                                    props.order.data.flightOffers[0]
                                      .itineraries[1].duration
                                  )} */}
                          </small>
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                          <div className='line'></div>
                          <ConnectingAirportsOutlinedIcon />
                          <div className='line'></div>
                        </div>
                        <div className='text-center'>
                          <small>
                            {
                              props.order.data.flightOffers[0].itineraries[1]
                                .segments.length
                            }{" "}
                            connection
                          </small>
                        </div>
                      </div>
                      <div xs={3} className='w-25 text-right'>
                        <p>
                          {
                            props.order.data.flightOffers[0].itineraries[1]
                              .segments[
                              props.order.data.flightOffers[0].itineraries[1]
                                .segments.length - 1
                            ].arrival.iataCode
                          }
                        </p>
                        <h4>
                          {Moment(
                            props.order.data.flightOffers[0].itineraries[1]
                              .segments[
                              props.order.data.flightOffers[0].itineraries[1]
                                .segments.length - 1
                            ].arrival.at
                          ).format("HH:mm")}
                        </h4>
                      </div>
                    </Row>
                  </Col>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>
    </>
  )
}

export default OrderComponent
