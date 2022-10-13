/** @format */

import React from "react"
import "../style/BookingDetails.css"
import { Button, Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import MyNavbar from "../components/MyNavbar"
import StepComponent from "../components/StepComponent"
import SummeryContainer from "../components/SummeryContainer"

import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import { Col, Row } from "react-bootstrap"
import Moment from "moment"
import axios from "axios"
import { saveAs } from "file-saver"

const BookingDeatils = () => {
  const bookedTicket = useSelector(
    (state) => state.bookedTicketReducer.bookedTicket
  )
  console.log(bookedTicket.data)

  const getTime = (str) => {
    let numbers = str.slice(2, str.length).toLowerCase()
    let firstNumbers = numbers.slice(0, 2)
    let secondNumbers = numbers.slice(2, 4)
    //console.log(firstNumbers)
    return (
      firstNumbers +
      " " +
      (secondNumbers !== "" ? secondNumbers + "m" : secondNumbers + "00m")
    )
  }
  const details = {
    data: bookedTicket.data,
  }
  const emailBody = {
    email: "sidath2007@yahoo.com",
    subject: "TICKET BOOKING",
    text: "Your booking is confirmed",
    html: "<p>hello Sir</p>",
  }
  const createAndDownloadPdf = () => {
    axios
      .post(`${process.env.REACT_APP_BE_URL}/files/pdf`, details)
      .then(() =>
        axios.get(`${process.env.REACT_APP_BE_URL}/files/fetch-pdf`, {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" })

        saveAs(pdfBlob, "newPdf.pdf")
      })
  }

  const sendEmailWithAttachmhment = async () => {
    createAndDownloadPdf()
    let res = await axios.post(
      `${process.env.REACT_APP_BE_URL}/users/register`,
      emailBody
    )

    console.log(res.data)
  }
  return (
    <>
      <MyNavbar />
      <Container>
        <SummeryContainer />
        <StepComponent
          ticketSelect={true}
          passenger={true}
          option={true}
          payment={true}
          confirm={true}
        />
        <div className='booking-details-container'>
          <div className='col-12 bg-light py-3' style={{ height: "auto" }}>
            <div>
              <div className='px-1 passenger-flight-list-header1 py-1'>
                {" "}
                <h6 className='ml-2'>Passengers</h6>
              </div>
              <div className='col-12 d-flex'>
                <div className='col-6'>
                  {bookedTicket.data.travelers.map((traveler, i) => (
                    <div key={i} className='px-1'>
                      <small>
                        <span>{traveler.id}. </span>
                        <span>
                          {traveler.gender === "MALE" ? "Mr" : "Mrs"}{" "}
                        </span>
                        <span>{traveler.name.firstName} </span>
                        <span>{traveler.name.lastName}</span>
                      </small>
                    </div>
                  ))}
                </div>
                <div className='col-6'>
                  <small>Issued by/Date</small>
                  <br />
                  <small>
                    <span>
                      {Moment(
                        bookedTicket.data.associatedRecords[0].creationDate
                      ).format("MMM Do YY")}
                      {" - "}
                    </span>
                    <span className='font-weight-bold'>
                      {" "}
                      {bookedTicket.data.contacts[0].companyName}
                    </span>
                  </small>
                </div>
              </div>
            </div>

            <div>
              <div className='show-grid'>
                <div className='depature-details'>
                  <h5>Departure Details</h5>
                </div>
                {bookedTicket.data.flightOffers[0].itineraries[0] &&
                  bookedTicket.data.flightOffers[0].itineraries[0].segments.map(
                    (segment, i) => (
                      <Container key={i} xs={12} className='mb-3'>
                        <Row xs={12} className='d-flex flex-column px-1'>
                          <h5 className='mb-0'>
                            <span>From </span>
                            <span>{segment.departure.iataCode} </span>
                            <span>to </span>
                            <span>{segment.arrival.iataCode} </span>
                          </h5>
                          <p className='mb-0'>
                            <small>
                              Total duration:{" "}
                              <span>{getTime(segment.duration)} </span>
                            </small>
                          </p>
                        </Row>
                        <Row xs={12} className='flex-column mt-2 info-div'>
                          <div xs={12} className='d-flex flex-column'>
                            <small>
                              {Moment(segment.departure.at).format("MMM Do YY")}{" "}
                            </small>
                            <h6>
                              <span>{segment.departure.iataCode} </span>
                              <span>to </span>
                              <span>{segment.arrival.iataCode} </span>
                            </h6>
                          </div>
                          <div xs={12} className='mt-2 px-0 d-flex'>
                            <div className='col-6 d-flex px-0'>
                              <div className='col-3 px-0'>
                                <p className='mb-1'>
                                  {segment.departure.iataCode}{" "}
                                </p>
                                <h5>
                                  {Moment(segment.departure.at).format("HH:mm")}{" "}
                                </h5>
                              </div>
                              <div className='col-6 d-flex justify-content-center align-items-center px-0'>
                                <AirplanemodeActiveIcon className='AirplanemodeActiveIcon' />
                                <div className='single-line'></div>
                                <div className='circle'></div>
                              </div>
                              <div className='col-3 px-0 text-right'>
                                <p className='mb-1'>
                                  {segment.arrival.iataCode}
                                </p>
                                <h5>
                                  {Moment(segment.arrival.at).format("HH:mm")}{" "}
                                </h5>
                              </div>
                            </div>
                            <div className='col-6 d-flex px-0'>
                              <div className='col-6 d-flex'>
                                <div className='col-3 d-flex justify-content-around align-items-center'>
                                  <img
                                    className='carrier-img-model'
                                    src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_22_27_t.png?background=fffff`}
                                    alt=''
                                  />
                                </div>
                                <div className='col-9 px-0'>
                                  <small>Flight number</small>
                                  <h6>
                                    {segment.carrierCode} {segment.number}
                                  </h6>
                                </div>
                              </div>
                              <div className='col-6'>
                                <small>Aircraft type</small>
                                <h6>Boeing {segment.aircraft.code} </h6>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </Container>
                    )
                  )}
                {bookedTicket.data.flightOffers[0].itineraries[1] && (
                  <div className='depature-details'>
                    <h5>Arrival Details</h5>
                  </div>
                )}

                {bookedTicket.data.flightOffers[0].itineraries[1] &&
                  bookedTicket.data.flightOffers[0].itineraries[1].segments.map(
                    (segment, i) => (
                      <Container key={i} xs={12} className='mb-3'>
                        <Row xs={12} className='d-flex flex-column px-1'>
                          <h5 className='mb-0'>
                            <span>From </span>
                            <span>{segment.departure.iataCode} </span>
                            <span>to </span>
                            <span>{segment.arrival.iataCode} </span>
                          </h5>
                          <p className='mb-0'>
                            <small>
                              Total duration:{" "}
                              <span>{getTime(segment.duration)} </span>
                            </small>
                          </p>
                        </Row>
                        <Row xs={12} className='flex-column mt-2 info-div'>
                          <div xs={12} className='d-flex flex-column'>
                            <small>
                              {Moment(segment.departure.at).format("MMM Do YY")}{" "}
                            </small>
                            <h6>
                              <span>{segment.departure.iataCode} </span>
                              <span>to </span>
                              <span>{segment.arrival.iataCode} </span>
                            </h6>
                          </div>
                          <div xs={12} className='mt-2 px-0 d-flex'>
                            <div className='col-6 d-flex px-0'>
                              <div className='col-3 px-0'>
                                <p className='mb-1'>
                                  {segment.departure.iataCode}{" "}
                                </p>
                                <h5>
                                  {Moment(segment.departure.at).format("HH:mm")}{" "}
                                </h5>
                              </div>
                              <div className='col-6 d-flex justify-content-center align-items-center px-0'>
                                <AirplanemodeActiveIcon className='AirplanemodeActiveIcon' />
                                <div className='single-line'></div>
                                <div className='circle'></div>
                              </div>
                              <div className='col-3 px-0 text-right'>
                                <p className='mb-1'>
                                  {segment.arrival.iataCode}
                                </p>
                                <h5>
                                  {Moment(segment.arrival.at).format("HH:mm")}{" "}
                                </h5>
                              </div>
                            </div>
                            <div className='col-6 d-flex px-0'>
                              <div className='col-6 d-flex'>
                                <div className='col-3 d-flex justify-content-around align-items-center'>
                                  <img
                                    className='carrier-img-model'
                                    src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_22_27_t.png?background=fffff`}
                                    alt=''
                                  />
                                </div>
                                <div className='col-9 px-0'>
                                  <small>Flight number</small>
                                  <h6>
                                    {segment.carrierCode} {segment.number}
                                  </h6>
                                </div>
                              </div>
                              <div className='col-6'>
                                <small>Aircraft type</small>
                                <h6>Boeing {segment.aircraft.code} </h6>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </Container>
                    )
                  )}
              </div>
            </div>
            <div>
              <div className='px-1 passenger-flight-list-header1 py-1'>
                {" "}
                <h6 className='ml-2'>Contacts</h6>
              </div>
              <div className='col-6'>
                <h6 className='pt-2'>
                  <span>Company Name : </span>
                  <span>{bookedTicket.data.contacts[0].companyName}</span>
                </h6>
                <small>
                  <span>Full Name : </span>
                  <span>
                    {bookedTicket.data.contacts[0].addresseeName.firstName}
                  </span>
                </small>
                <br />
                <small>
                  <span>Address : </span>
                  <span>
                    {bookedTicket.data.contacts[0].address.lines[0]},{" "}
                  </span>
                  <span>
                    {bookedTicket.data.contacts[0].address.cityName},{" "}
                  </span>
                  <span>
                    {bookedTicket.data.contacts[0].address.postalCode},{" "}
                  </span>
                  <span>
                    {bookedTicket.data.contacts[0].address.countryCode}.{" "}
                  </span>
                </small>
                <br />
                <small>
                  <span>Telopone : </span>
                  <span>
                    +
                    {bookedTicket.data.contacts[0].phones[0].countryCallingCode}
                    -
                  </span>
                  <span>{bookedTicket.data.contacts[0].phones[0].number} </span>
                </small>
                <br />
                <small>
                  <span>Email : </span>

                  <span>{bookedTicket.data.contacts[0].emailAddress} </span>
                </small>
              </div>
              <div className='col-6'></div>
            </div>
          </div>
          <div>
            <Button onClick={createAndDownloadPdf}>PDF</Button>
            <Button onClick={sendEmailWithAttachmhment}>Email</Button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default BookingDeatils
