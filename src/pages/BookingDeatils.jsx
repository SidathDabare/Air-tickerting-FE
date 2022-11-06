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
import { getTime } from "../redux/actions"
import { format, parseISO } from "date-fns"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import AttachEmailIcon from "@mui/icons-material/AttachEmail"

const BookingDeatils = () => {
  const bookedTicket = useSelector(
    (state) => state.bookedTicketReducer.bookedTicket
  )
  const newBookedTicketId = useSelector(
    (state) => state.orderTicketIdReducer.orderTicketId
  )
  //console.log(bookedTicket.data)

  const details = {
    data: bookedTicket.data,
    orderId: newBookedTicketId._id,
  }
  const emailBody = {
    email: "sidath2007@yahoo.com",
    subject: "TICKET BOOKING CONFIRMATION",
    text: "Your booking is confirmed",
    html: `<div style="width:100%;height:100%;background-image: url('https://i.pinimg.com/736x/b4/fd/19/b4fd1931195476bd79231f76f915670c.jpg');background-size:cover">
    <div style="width:30%;padding:10px;background-color:#ffffff96">
      <h4>hello Sir/Madam</h4>    
      <p>Your flight from <span><h5>${
        details.data.flightOffers[0].itineraries[0].segments[0].departure
          .iataCode
      }</span> to <span>${
      details.data.flightOffers[0].itineraries[0].segments[
        details.data.flightOffers[0].itineraries[0].segments.length - 1
      ].arrival.iataCode
    }</h5></span> at <span><h5>${format(
      parseISO(
        details.data.flightOffers[0].itineraries[0].segments[0].departure.at
      ),
      "PPpp"
    )}</h5></span> has been confirmed</p>
      <p>Thank you</p>
    </div>
    </div> `,
    id: newBookedTicketId._id,
  }
  const createAndDownloadPdf = () => {
    axios
      .post(`${process.env.REACT_APP_BE_URL}/files/pdf`, details)
      .then(() =>
        axios.get(
          `${process.env.REACT_APP_BE_URL}/files/fetch-pdf/${newBookedTicketId._id}`,
          {
            responseType: "blob",
          }
        )
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" })

        saveAs(pdfBlob, `${newBookedTicketId._id}`)
      })
  }

  const sendEmailWithAttachmhment = async () => {
    //createAndDownloadPdf()
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BE_URL}/files/email`,
        emailBody
      )
    } catch (error) {
      console.log(error)
    }

    //console.log(res.data)
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
              <div className='px-1 booking-flight-list-header1'>
                {" "}
                <h6 className='ml-2 my-0 py-2'>Passengers</h6>
              </div>
              <div className='col-12 d-flex'>
                <div className='col-6'>
                  {bookedTicket.data.travelers.map((traveler, i) => (
                    <div key={i} className='px-1 py-1'>
                      <small className='mb-0'>
                        <span>{traveler.id}. </span>
                        <span>
                          {traveler.gender === "MALE" ? "Mr" : "Miss"}{" "}
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
                      <Container key={i} className='col-12 mb-3'>
                        <Row className='flex-column mt-2 booking-details mx-auto'>
                          <div className='col-12 d-flex flex-column px-0 border-bottom'>
                            <p className='d-flex mb-0'>
                              <small>
                                {Moment(segment.departure.at).format(
                                  "MMM Do YY"
                                )}{" "}
                              </small>
                              <small className='ml-2'>
                                Total duration:{" "}
                                <span>{getTime(segment.duration)} </span>
                              </small>
                            </p>

                            <h6>
                              <span>{segment.departure.iataCode} </span>
                              <span>to </span>
                              <span>{segment.arrival.iataCode} </span>
                            </h6>
                          </div>
                          <div className='mt-2 px-0 booking-details-section01 border-bottom'>
                            <div className='col-12 col-xs-12 col-md-6 px-0 booking-details-item1'>
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
                            <div className='col-12 col-xs-12 col-md-6  px-0 booking-details-item2'>
                              <div className='col-6 d-flex'>
                                <div className='col-3 d-flex justify-content-around align-items-center'>
                                  <img
                                    className='carrier-img-model'
                                    src={`${process.env.REACT_APP_AIRLINE_LOGO_URL}/airlines_${segment.carrierCode}_22_27_t.png?background=fffff`}
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
                      <Container key={i} className='col-12 mb-3'>
                        <Row className='flex-column mt-2 booking-details mx-auto'>
                          <div className='col-12 d-flex flex-column px-0 border-bottom'>
                            <p className='d-flex mb-0'>
                              <small>
                                {Moment(segment.departure.at).format(
                                  "MMM Do YY"
                                )}{" "}
                              </small>
                              <small className='ml-2'>
                                Total duration:{" "}
                                <span>{getTime(segment.duration)} </span>
                              </small>
                            </p>
                            <h6>
                              <span>{segment.departure.iataCode} </span>
                              <span>to </span>
                              <span>{segment.arrival.iataCode} </span>
                            </h6>
                          </div>
                          <div className='mt-2 px-0 booking-details-section01'>
                            <div className='col-12 col-xs-12 col-md-6 px-0 booking-details-item1'>
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
                            <div className='col-12 col-xs-12 col-md-6 px-0 booking-details-item2'>
                              <div className='col-6 d-flex'>
                                <div className='col-3 d-flex justify-content-around align-items-center'>
                                  <img
                                    className='carrier-img-model'
                                    src={`${process.env.REACT_APP_AIRLINE_LOGO_URL}/airlines_${segment.carrierCode}_22_27_t.png?background=fffff`}
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
              <div className='px-1 booking-flight-list-header1 py-1'>
                {" "}
                <h6 className='ml-2'>Contacts</h6>
              </div>
              <div className='col-12 col-md-6'>
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
            </div>
          </div>
          <div className='mt-3 d-flex justify-content-end bg-light py-3 rounded'>
            <Button onClick={createAndDownloadPdf}>
              <span>Download PDF </span>
              <span>
                <PictureAsPdfIcon />
              </span>
            </Button>
            <Button className='mx-1' onClick={sendEmailWithAttachmhment}>
              <span>Send email </span>
              <span>
                <AttachEmailIcon />
              </span>
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default BookingDeatils
