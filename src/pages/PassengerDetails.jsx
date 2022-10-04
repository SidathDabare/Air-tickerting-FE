/** @format */

import React, { useEffect, useState } from "react"
import { Button, Container, Form, Stack } from "react-bootstrap"
import StepComponent from "../components/StepComponent"
import MyNavbar from "../components/MyNavbar"
import SummeryContainer from "../components/SummeryContainer"
import Accordion from "react-bootstrap/Accordion"
import Footer from "../components/Footer"
import AddIcon from "@mui/icons-material/Add"
import "../style/PassengerDetails.css"
import { MenuItem, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { format } from "date-fns"
import { MuiTelInput } from "mui-tel-input"
import { getAmadeusToken, setPassengerDetailsAction } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import PassengerDetailsEdit from "../components/PassengerDetailsEdit"
import ClearIcon from "@mui/icons-material/Clear"

const PassengerDetails = () => {
  const ticket = useSelector(
    (state) => state.selectedTicketReducer.selectedTicket
  )
  const passengerDetails = useSelector(
    (state) => state.passengerDetailsReducer.passengerDetails
  )

  const dispatch = useDispatch()
  const [makeBooking, setMakeBooking] = useState(null)
  const [selectTicket, setSelectTicket] = useState(null)
  const [passengers, setPassengers] = useState([])
  const [showPassengerDetails, setShowPassengerDetails] = useState(false)
  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)

  const [title, setTitle] = useState("Mr")
  const [firstName, setFirstName] = useState("Sidath")
  const [lastName, setLastName] = useState("Dabare")
  const [birthday, setBirthDay] = useState("13-03-1984")
  const [email, setEmail] = useState("sidath@email.com")
  const [countryCode, setCountryCode] = useState("+39")
  const [phoneNumber, setPhoneNumber] = useState("3154154151")
  const [passport, setPassport] = useState("x15151515")
  const [birthPlace, setBirthPlace] = useState("Italy")

  const traveler = {
    id: passengerDetails.length + 1,
    dateOfBirth: birthday,
    name: {
      firstName: firstName,
      lastName: lastName,
    },
    gender: title,
    contact: {
      emailAddress: email,
      phones: [
        {
          deviceType: "MOBILE",
          countryCallingCode: countryCode,
          number: phoneNumber,
        },
      ],
    },
    documents: [
      {
        documentType: "PASSPORT",
        birthPlace: birthPlace,
        issuanceLocation: "Madrid",
        issuanceDate: "2015-04-14",
        number: passport,
        expiryDate: "2025-04-14",
        issuanceCountry: "ES",
        validityCountry: "ES",
        nationality: "ES",
        holder: true,
      },
    ],
  }

  const addPassengerDetails = (e) => {
    e.preventDefault()
    dispatch(setPassengerDetailsAction(traveler))
    setShowPassengerDetails(!showPassengerDetails)
  }
  const makeTicketBooking = async () => {
    let token = await getAmadeusToken()
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }
    try {
      let res = await fetch(
        `https://test.api.amadeus.com/v1/shopping/flight-offers/pricing`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            data: {
              type: "flight-offers-pricing",
              flightOffers: [ticket],
            },
          }),
        }
      )
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        if (data.warnings) {
          setMakeBooking(false)
        } else {
          setMakeBooking(true)
        }
      } else {
        setError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (passengerDetails.length >= ticket.travelerPricings.length) {
      setDisable(false)
    } else {
      setDisable(true)
    }
    setSelectTicket(ticket)
    setPassengers([...passengerDetails])
    //console.log(selectTicket)
    console.log(passengerDetails.length)
    console.log(passengers.length)
  }, [ticket, selectTicket, passengerDetails, disable])

  return (
    <>
      <MyNavbar />
      <Container>
        <SummeryContainer />
        <StepComponent ticketSelect={true} passenger={true} />
        <div className='add-details-div'>
          <div className='add-passeger-div px-3'>
            <h5 className='text-light'>Passenger List</h5>
            <button
              //disabled={disable === true ? true : false}
              className={
                disable === true ? "add-passenger-btn bg-danger" : "d-none"
              }
              onClick={() => setShowPassengerDetails(!showPassengerDetails)}>
              <span className='align-items-center'>
                {showPassengerDetails ? <ClearIcon /> : <AddIcon />}
              </span>
              <span className='ml-2'>Add passenger details</span>
            </button>
          </div>

          <div
            className={
              showPassengerDetails ? "show-add-passenger-details" : "d-none"
            }>
            <div className='px-2'>
              <div className='col-12 py-1 mt-1'>
                <h5 className='mb-0'>Passenger Details</h5>
              </div>
              <div className='col-12 py-2 mt-1'>
                <TextField
                  className='w-25 passeneger-details-input px-1'
                  label='Title'
                  select
                  size='small'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}>
                  <MenuItem value='MALE'>Mr</MenuItem>
                  <MenuItem value='FEMALE'>Mrs</MenuItem>
                  <MenuItem value='FEMALE'>Miss</MenuItem>
                  <MenuItem value='MALE'>Ms</MenuItem>
                </TextField>
              </div>
              <div className='col-12 py-2 mt-1 d-flex'>
                <TextField
                  size='small'
                  id='outlined-basic'
                  label='Firstname'
                  value={firstName}
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1'
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  size='small'
                  id='outlined-basic'
                  value={lastName}
                  label='Lastname'
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1'
                  onChange={(e) => setLastName(e.target.value)}
                />

                <DatePicker
                  size='small'
                  className='col-6 col-xs-6 col-md-4 px-1'
                  label='Birthday'
                  variant='outlined'
                  value={birthday}
                  onChange={(newValue) => {
                    setBirthDay(format(newValue, "yyyy-MM-dd"))
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size='small'
                      className='col-6 col-xs-6 col-md-4 px-1'
                    />
                  )}
                />
              </div>
              <div className='col-12 py-2 mt-1 d-flex'>
                <TextField
                  size='small'
                  id='outlined-basic'
                  value={email}
                  label='Email'
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className='col-6 col-xs-6 col-md-4 px-1'>
                  <TextField
                    size='small'
                    id='outlined-basic'
                    label='Country'
                    value={countryCode}
                    variant='outlined'
                    className='col-4 pr-1'
                    onChange={(e) => setCountryCode(e.target.value)}
                  />
                  <TextField
                    size='small'
                    id='outlined-basic'
                    label='Number'
                    value={phoneNumber}
                    variant='outlined'
                    className='col-8'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                {/* <MuiTelInput
                  size='small'
                  id='outlined-basic'
                  value={phone}
                  onChange={handleChange}
                  className='col-6 col-xs-6 col-md-4 px-1'
                /> */}
              </div>
              <div className='col-12 py-1 mt-1'>
                <h5 className='mb-0'>Passport Details</h5>
              </div>
              <div className='col-12 py-2 mt-1'>
                <TextField
                  size='small'
                  id='outlined-basic'
                  label='Passport number'
                  value={passport}
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1'
                  onChange={(e) => setPassport(e.target.value)}
                />
                <TextField
                  size='small'
                  id='outlined-basic'
                  value={birthPlace}
                  label='Birth place'
                  variant='outlined'
                  className='col-6 col-xs-6 col-md-4 px-1'
                  onChange={(e) => setBirthPlace(e.target.value)}
                />
                <Button
                  type='submit'
                  className='col-6 col-xs-6 col-md-4 px-1'
                  onClick={addPassengerDetails}>
                  Add Details
                </Button>
              </div>
              <div className='col-12 py-1 mt-1'></div>
            </div>
          </div>
        </div>

        <Accordion>
          {passengers ? (
            passengers.map((passenger, index) => (
              <PassengerDetailsEdit
                passenger={passenger}
                index={index}
                key={index}
                setDisable={setDisable}
              />
              // <Accordion.Item
              //   key={index}
              //   eventKey={index}
              //   className='according-item my-1'>
              //   <div className='d-flex justify-content-between px-3'>
              //     <h6 className='d-flex align-items-center'>
              //       <span> {index + 1}</span>
              //       <span className='mx-2'> {passenger.gender}</span>
              //       <span className='mr-2'> {passenger.name.firstName}</span>
              //       <span> {passenger.name.lastName}</span>
              //     </h6>
              //     <Accordion.Header
              //       className='according-item-header'
              //       onClick={(e) => {
              //         e.preventDefault()
              //         setShowContent(!showContent)
              //       }}>
              //       {showContent ? (
              //         <KeyboardArrowUpIcon />
              //       ) : (
              //         <KeyboardArrowDownIcon />
              //       )}
              //     </Accordion.Header>
              //   </div>

              //   <Accordion.Body className='px-3 pb-2'>
              //     <div className='col-12'>
              //       <div className='col-12 px-0'>
              //         {/* <p>
              //           <span className='mx-1'>
              //             {passenger.contact.emailAddress}
              //           </span>
              //           <span className='mr-2'>
              //             {" "}
              //             {passenger.name.firstName}
              //           </span>
              //         </p> */}
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4'
              //           defaultValue={title}
              //         />
              //       </div>
              //       <div className='col-12 px-0 d-flex justify-content-between'>
              //         {/* <p>
              //           <span className='mx-1'>
              //             {passenger.contact.emailAddress}
              //           </span>
              //           <span className='mr-2'>
              //             {" "}
              //             {passenger.name.firstName}
              //           </span>
              //         </p> */}
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={title}
              //         />
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={firstName}
              //         />
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={lastName}
              //         />
              //       </div>
              //       <div className='col-12 px-0'>
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={birthday}
              //         />
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={email}
              //         />
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={countryCode}
              //         />
              //       </div>
              //       <div className='col-12 px-0 d-flex justify-content-between'>
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={phoneNumber}
              //         />
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={passport}
              //         />
              //         <input
              //           type='text'
              //           className='col-6 col-xs-6 col-md-4 passenger-input-edit'
              //           defaultValue={birthPlace}
              //         />
              //       </div>
              //     </div>
              //   </Accordion.Body>
              // </Accordion.Item>
            ))
          ) : (
            <div>No data</div>
          )}
        </Accordion>
      </Container>
      <Footer />
    </>
  )
}

export default PassengerDetails
