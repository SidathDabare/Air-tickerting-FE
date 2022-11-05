/** @format */

import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"

import "../style/FlightItem.css"
import Moment from "moment"
import { useDispatch, useSelector } from "react-redux"

import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined"
import FlightItemModel from "./FlightItemModel"
import Loader from "./Loader"
import { selectedSegmentsAction, selectedTicketAction } from "../redux/actions"
import { getTime } from "../redux/actions"
import ConnectionComponents from "./ConnectionComponents"

const FlightItemDeparture = ({ listItem }) => {
  const selectedTicket = useSelector(
    (state) => state.selectedTicketReducer.selectedTicket
  )
  const selectedTicketSegments = useSelector(
    (state) => state.selectedTicketSegmentsReducer.selectedTicketSegments
  )
  const [modalShow, setModalShow] = useState(false)
  const [connectionModalShow, setConnectionModalShow] = useState(false)
  const [showSelected, setShowSelected] = useState(false)
  console.log(showSelected)
  const dispatch = useDispatch()

  useEffect(() => {
    // setDetails(listItem)
    // console.log(details.id)
  }, [listItem, modalShow])
  return (
    <div
      className={
        showSelected
          ? "d-flex flight-item px-0 col-12 add-background"
          : "d-flex flight-item px-0 col-12"
      }>
      {listItem &&
      listItem.itineraries &&
      listItem.itineraries.length > 0 &&
      listItem.itineraries[0].segments.length > 0 &&
      listItem.itineraries[0].segments[0].arrival ? (
        <>
          <>
            <Col
              className='col-12 col-xs-12 col-md-8 flight-item-section01'
              onClick={() => setShowSelected(!showSelected)}>
              <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
                <div className='pl-3'>
                  <small className='font-weight-bold'>{listItem.id}</small>
                </div>
                <div className='d-flex align-items-center'>
                  {listItem.itineraries[0].segments.map((segment, i) => (
                    <div key={i} className='px-1 mr-2'>
                      <span>
                        <img
                          className='carrier-img'
                          src={`${process.env.REACT_APP_AIRLINE_LOGO_URL}/airlines_${segment.carrierCode}_18_16_t.png?background=fffff`}
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
                    {listItem.itineraries[0].segments[0].departure.iataCode}
                  </p>
                  <h4>
                    {Moment(
                      listItem.itineraries[0].segments[0].departure.at
                    ).format("HH:mm")}
                  </h4>
                </div>
                <div xs={6} className='w-50'>
                  <div className='text-center'>
                    <small>{getTime(listItem.itineraries[0].duration)}</small>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <div className='line'></div>
                    <ConnectingAirportsOutlinedIcon />
                    <div className='line'></div>
                  </div>
                  <div className='text-center'>
                    <small
                      className='connection'
                      onClick={() => {
                        dispatch(
                          selectedSegmentsAction(
                            listItem.itineraries[0].segments
                          )
                        )
                        setConnectionModalShow(true)
                      }}>
                      {listItem.itineraries[0].segments.length} connection
                    </small>
                    {selectedTicketSegments && (
                      <ConnectionComponents
                        show={connectionModalShow}
                        listitem={listItem.itineraries[0].segments}
                        key={listItem.id}
                        onHide={() => setConnectionModalShow(false)}
                      />
                    )}
                  </div>
                </div>
                <div xs={3} className='w-25 text-right'>
                  <p>
                    {
                      listItem.itineraries[0].segments[
                        listItem.itineraries[0].segments.length - 1
                      ].arrival.iataCode
                    }
                  </p>
                  <h4>
                    {Moment(
                      listItem.itineraries[0].segments[
                        listItem.itineraries[0].segments.length - 1
                      ].arrival.at
                    ).format("HH:mm")}
                  </h4>
                </div>
              </Row>
            </Col>
            <Col
              onClick={() => setShowSelected(!showSelected)}
              className={
                showSelected
                  ? "col-12 col-xs-12 col-md-4 flight-item-section02"
                  : "col-12 col-xs-12 col-md-4 flight-item-section02-hide"
              }>
              <Row>
                <Col className='col-12 text-center economy px-0 pb-4'>
                  <div className='py-2'>
                    <h6>Economy</h6>
                  </div>
                  <h4 className='mt-3'>
                    {listItem.price.currency} {listItem.price.total}
                  </h4>
                  <Button
                    onClick={() => {
                      setModalShow(true)
                      dispatch(selectedTicketAction(listItem))
                    }}
                    variant='outline-primary'
                    className='py-1 px-4 mt-2'>
                    Select
                  </Button>
                  {selectedTicket && (
                    <FlightItemModel
                      show={modalShow}
                      listitem={listItem}
                      key={listItem.id}
                      onHide={() => setModalShow(false)}
                    />
                  )}
                </Col>
                {/* <Col xs={4} className='text-center bussness px-0'>
                  <div className='py-2'>
                    <h6>Business</h6>
                  </div>
                  <h4 className='mt-3'>
                    {listItem.price.currency}{" "}
                    {((listItem.price.total / 100) * 120).toFixed(2)}
                  </h4>
                  <Button
                    disabled
                    onClick={() => setModalShow(true)}
                    variant='outline-primary'
                    className='py-1 px-4 mt-2'>
                    Select
                  </Button>
             
                </Col>
                <Col xs={4} className='text-center first px-0'>
                  <div className='py-2'>
                    <h6>First</h6>
                  </div>
                  <h4 className='mt-3'>
                    {listItem.price.currency}{" "}
                    {((listItem.price.total / 100) * 170).toFixed(2)}
                  </h4>
                  <Button
                    disabled
                    onClick={() => setModalShow(true)}
                    variant='outline-primary'
                    className='py-1 px-4 mt-2'>
                    Select
                  </Button>
                </Col> */}
              </Row>
            </Col>
          </>
          <>
            {/* <Col xs={5} className='bg-light'>
            <Row className='d-flex justify-content-between align-items-center section01 pt-1 pb-3'>
              <div className='pl-3'>
                <small className='font-weight-bold'>
                  {listItem && listItem.id}
                </small>
              </div>
              <div className='d-flex align-items-center'>
                {listItem &&
                  listItem.itineraries &&
                  listItem.itineraries.length > 0 &&
                  listItem.itineraries[0].segments.map((segment, i) => (
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
                  {listItem &&
                    listItem.itineraries[0].segments[0].departure.iataCode}
                </p>
                <h4>
                  {Moment(
                    listItem.itineraries[0].segments[0].departure.at
                  ).format("HH:mm")}
                </h4>
              </div>
              <div xs={6} className='w-50'>
                <div className='text-center'>
                  <small>{getTime(listItem.itineraries[0].duration)}</small>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='line'></div>
                  <ConnectingAirportsOutlinedIcon />
                  <div className='line'></div>
                </div>
                <div className='text-center'>
                  <small
                    className='connection'
                    onClick={() => setModalShow(true)}>
                    {listItem.itineraries[0].segments.length} connection
                  </small>
                  <FlightItemModel
                    show={modalShow}
                    listitem={listItem}
                    key={listItem.id}
                    onHide={() => setModalShow(false)}
                  />
                </div>
              </div>
              <div xs={3} className='w-25 text-right'>
                <p>
                  {listItem.itineraries[0] &&
                    listItem.itineraries[0].segments[1].arrival &&
                    listItem.itineraries[0].segments.length > 0 &&
                    listItem.itineraries[0].segments[
                      listItem.itineraries[0].segments.length - 1
                    ].arrival.iataCode}
                </p>
                <h4>
                  {listItem.itineraries[0] &&
                    listItem.itineraries[0].segments[1].arrival &&
                    Moment(
                      listItem.itineraries[0].segments[1].arrival.at
                    ).format("HH:mm")}
                </h4>
              </div>
            </Row>
          </Col>
          <Col xs={7} className='bg-light'>
            <Row xs={12}>
              <Col xs={4} className='text-center economy px-0 pb-4'>
                <div className='py-2'>
                  <h6>Economy</h6>
                </div>
                <h4 className='mt-3'>
                  {listItem.price.currency} {listItem.price.total}
                </h4>
                <Button
                  onClick={() => setModalShow(true)}
                  variant='outline-primary'
                  className='py-1 px-4 mt-2'>
                  Select
                </Button>
              </Col>
              <Col xs={4} className='text-center bussness px-0'>
                <div className='py-2'>
                  <h6>Business</h6>
                </div>
                <h4 className='mt-3'>
                  {listItem.price.currency}{" "}
                  {((listItem.price.total / 100) * 120).toFixed(2)}
                </h4>
                <Button
                  onClick={() => setModalShow(true)}
                  variant='outline-primary'
                  className='py-1 px-4 mt-2'>
                  Select
                </Button>
              </Col>
              <Col xs={4} className='text-center first px-0'>
                <div className='py-2'>
                  <h6>First</h6>
                </div>
                <h4 className='mt-3'>
                  {listItem.price.currency}{" "}
                  {((listItem.price.total / 100) * 170).toFixed(2)}
                </h4>
                <Button
                  onClick={() => setModalShow(true)}
                  variant='outline-primary'
                  className='py-1 px-4 mt-2'>
                  Select
                </Button>
              </Col>
            </Row>
          </Col> */}
          </>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default FlightItemDeparture
