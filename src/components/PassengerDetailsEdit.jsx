/** @format */

import { MenuItem, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import Accordion from "react-bootstrap/Accordion"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { useDispatch, useSelector } from "react-redux"
import ClearIcon from "@mui/icons-material/Clear"
import {
  deletePassengerDetailsAction,
  editPassengerDetailsAction,
} from "../redux/actions"

const PassengerDetailsEdit = (props) => {
  const dispatch = useDispatch()
  // const passengerDetails = useSelector(
  //   (state) => state.passengerDetailsReducer.passengerDetails
  // )
  const [showContent, setShowContent] = useState(false)

  const [title, setTitle] = useState(props.passenger.gender)
  const [firstName, setFirstName] = useState(props.passenger.name.firstName)
  const [lastName, setLastName] = useState(props.passenger.name.lastName)
  const [birthday, setBirthDay] = useState(props.passenger.birthday)
  const [email, setEmail] = useState(props.passenger.contact.emailAddress)
  const [countryCode, setCountryCode] = useState(
    props.passenger.contact.phones[0].countryCallingCode
  )
  const [phoneNumber, setPhoneNumber] = useState(
    props.passenger.contact.phones[0].number
  )
  const [passport, setPassport] = useState(props.passenger.documents[0].number)
  const [birthPlace, setBirthPlace] = useState(
    props.passenger.documents[0].birthPlace
  )

  const editTraveler = {
    id: props.index + 1,
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
  const editPassengerDetails = (e) => {
    e.preventDefault()
    dispatch(editPassengerDetailsAction(editTraveler))
    props.setDisable(false)
  }
  const deletePassenger = () => {
    dispatch(deletePassengerDetailsAction(props.passenger.id))
  }
  useEffect(() => {}, [props.passenger])
  return (
    <>
      {props.passenger ? (
        <Accordion.Item
          key={props.index}
          eventKey={props.index}
          className='according-item my-1'>
          <div className='d-flex justify-content-between px-3'>
            <h6 className='d-flex align-items-center'>
              <span> {props.index + 1}</span>
              <span className='mx-2'>
                {" "}
                {props.passenger.gender === "MALE" ? "Mr" : "Mrs"}
              </span>
              <span className='mr-2'> {props.passenger.name.firstName}</span>
              <span> {props.passenger.name.lastName}</span>
            </h6>
            <div className='d-flex align-items-center'>
              <ClearIcon className='text-danger' onClick={deletePassenger} />
              <Accordion.Header
                className='according-item-header'
                onClick={(e) => {
                  e.preventDefault()
                  setShowContent(!showContent)
                }}>
                {showContent ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </Accordion.Header>
            </div>
          </div>

          <Accordion.Body className='px-3 pb-2'>
            <div className='px-2 bg-light rounded'>
              <div className='col-12 py-2 mt-1 border-bottom'>
                <h5 className='mb-0 text-dark'>Passenger Details</h5>
              </div>
              <div className='col-12 py-2 mt-1 bg-light'>
                <TextField
                  className='w-25 px-1'
                  label='Title'
                  select
                  size='small'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}>
                  <MenuItem value='MALE'>Mr</MenuItem>
                  <MenuItem value='FEMALE'>Mrs</MenuItem>
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
              <div className='col-12 py-1 mt-1 border-bottom'>
                <h5 className='mb-0 text-dark'>Passport Details</h5>
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
                  onClick={editPassengerDetails}>
                  Edit Details
                </Button>
              </div>
              <div className='col-12 py-1 mt-1'></div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ) : (
        <div>No data</div>
      )}
    </>
  )
}

export default PassengerDetailsEdit
