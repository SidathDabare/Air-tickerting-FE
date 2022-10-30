/** @format */

import React, { useEffect, useState } from "react"
import { Button, Container, Dropdown, Form, Row, Stack } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { searchAction, getAmadeusToken } from "../redux/actions"
import "../style/SearchComponent.css"
import { useNavigate } from "react-router-dom"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import DocumentScannerSharpIcon from "@mui/icons-material/DocumentScannerSharp"
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp"
import ModeOfTravelSharpIcon from "@mui/icons-material/ModeOfTravelSharp"
import Loader from "./Loader"
import InputAutoComplete from "./InputAutoComplete"
import { MenuItem, TextField } from "@mui/material"
// import { DatePicker } from "@mui/lab"
import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { format } from "date-fns"

const SearchComponent = () => {
  const [originLocationCode, setOriginLocationCode] = useState("")
  const [destinationLocationCode, setDestinationLocationCode] = useState("")
  const [departureDate, setDepartureDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [tripType, setTripType] = useState("")
  const [adults, setAdults] = useState("")

  const [loader, setLoader] = useState(false)
  const [searchDisabled, setSearchDisabled] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchData = async (url) => {
    let token = await getAmadeusToken()
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }
    let res = await fetch(url, {
      method: "GET",
      headers,
    })
    if (res.ok) {
      let data = await res.json()
      setLoader(false)
      dispatch(searchAction(data))
      navigate("/search-result")
    } else {
      setLoader(true)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoader(true)

    if (tripType === "One way") {
      fetchData(
        `${process.env.REACT_APP_AMADEUS_URL}/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=5`
      )
    } else {
      fetchData(
        `${process.env.REACT_APP_AMADEUS_URL}/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&max=5`
      )
    }
  }

  useEffect(() => {
    if (
      originLocationCode &&
      destinationLocationCode &&
      departureDate &&
      adults
    ) {
      setSearchDisabled(false)
    } else {
      setSearchDisabled(true)
    }
  }, [
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults,
    searchDisabled,
  ])

  return (
    <>
      {loader ? (
        <Container>
          <Loader />
        </Container>
      ) : (
        ""
      )}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container className='search-componet col-12 mt-3'>
          <Row className='d-flex justify-content-center'>
            <div className='col-6 col-xs-6 col-md-3 header-btn active-btn'>
              <FlightTakeoffSharpIcon className='header-btn-icon' />
              <span>Book</span>
            </div>
            <div className='col-6 col-xs-6 col-md-3 header-btn'>
              <DocumentScannerSharpIcon className='header-btn-icon' />
              <span className='text-truncate'>Manage booking</span>
            </div>
            <div className='col-6 col-xs-6 col-md-3 header-btn'>
              <CheckCircleOutlineSharpIcon className='header-btn-icon' />
              <span>Check-in</span>
            </div>
            <div className='col-6 col-xs-6 col-md-3 header-btn'>
              <ModeOfTravelSharpIcon className='header-btn-icon' />
              <span>Flight status</span>
            </div>
          </Row>
          <Row className='mt-4 mx-2'>
            <Form className='col-12'>
              <Row xs={12} className='d-flex justify-content-between'>
                <div className='col-12 col-xs-12 col-md-6 col-lg-4 mb-3 px-1'>
                  <InputAutoComplete
                    getInput={setOriginLocationCode}
                    label={"Departure"}
                  />
                </div>
                <div className='col-12 col-xs-12 col-md-6 col-lg-4 mb-3 px-1'>
                  <InputAutoComplete
                    getInput={setDestinationLocationCode}
                    label={"Arrival"}
                  />
                </div>
                <div className='col-12 col-xs-12 col-md-6 col-lg-4 mb-3 px-1'>
                  <Stack spacing={2} className='border-0'>
                    <TextField
                      className='w-100 input-select'
                      label='Trip type'
                      select
                      // SelectProps={{
                      //   multiple: true,
                      // }}
                      size='large'
                      color='info'
                      // helperText='Please select your country'
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}>
                      <MenuItem value='returnDate'>Return</MenuItem>
                      <MenuItem value='One way'>One way</MenuItem>
                    </TextField>
                  </Stack>
                  {/* <Form.Select aria-label='Default select example'>
                    <option>Open this select menu</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </Form.Select> */}
                </div>

                <div className='d-flex justify-content-between px-0 col-12 col-xs-12 col-md-6 col-lg-4 mb-3 px-1'>
                  <Stack spacing={1} className='col-6 px-0'>
                    <DatePicker
                      className='text-trunucate'
                      label='Departure'
                      value={departureDate}
                      onChange={(newValue) => {
                        setDepartureDate(format(newValue, "yyyy-MM-dd"))
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                  <Stack spacing={1} className='col-6 px-0'>
                    <DatePicker
                      className='text-trunucate'
                      disabled={tripType === "One way" ? true : false}
                      label='Arrival'
                      value={returnDate}
                      onChange={(newValue) => {
                        setReturnDate(format(newValue, "yyyy-MM-dd"))
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                  {/* <Stack spacing={1} className='col-12 px-0'>
                    <TextField
                      className='w-100 input-select'
                      // label={departureDate}
                      select
                      size='large'
                      color='info'>
                      <MenuItem className='date-select-div'>
                        <div className='d-flex'>
                          <DatePicker
                            className='text-trunucate'
                            label='Departure'
                            value={departureDate}
                            onChange={(newValue) => {
                              setDepartureDate(format(newValue, "yyyy-MM-dd"))
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                          <DatePicker
                            className='text-trunucate'
                            label='Departure'
                            value={departureDate}
                            onChange={(newValue) => {
                              setDepartureDate(format(newValue, "yyyy-MM-dd"))
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </div>
                      </MenuItem>
                    </TextField>
                  </Stack> */}
                </div>
                <div className='d-flex justify-content-between px-0 col-12 col-xs-12 col-md-6 col-lg-4 mb-3 px-1'>
                  <Stack spacing={2} className='border-0 col-6 px-0 '>
                    <TextField
                      className='w-100 input-select text-trunucate'
                      label='Passenger'
                      select
                      size='large'
                      color='info'
                      // helperText='Please select your country'
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}>
                      <MenuItem value='1'>One</MenuItem>
                      <MenuItem value='2'>Two</MenuItem>
                      <MenuItem value='3'>Three</MenuItem>
                    </TextField>
                  </Stack>
                  <Stack spacing={2} className='border-0 col-6 px-0'>
                    <TextField
                      className='w-100 input-select'
                      label='Class'
                      select
                      disabled
                      // SelectProps={{
                      //   multiple: true,
                      // }}
                      size='large'
                      color='info'
                      // helperText='Please select your country'
                    >
                      <MenuItem value='returnDate'>Return</MenuItem>
                      <MenuItem value='2'>One way</MenuItem>
                    </TextField>
                  </Stack>
                </div>

                <div className='d-flex justify-content-center align-items-center col-12 col-xs-12 col-md-6 col-lg-4 mb-3 px-1'>
                  <Button
                    disabled={searchDisabled ? true : false}
                    id='search-button'
                    type='submit'
                    className={
                      searchDisabled
                        ? "w-100 h-100 bg-secondary border-0 py-3"
                        : "w-100 h-100 bg-info font-weight-bold"
                    }
                    onClick={handleSearch}>
                    <span className='mr-2'>Show flights</span>
                    <FlightTakeoffSharpIcon />
                  </Button>
                </div>
              </Row>
            </Form>
          </Row>
        </Container>
      </LocalizationProvider>
    </>
  )
}

export default SearchComponent
