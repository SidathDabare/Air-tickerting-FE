/** @format */

import React, { useEffect, useState } from "react"
import { Button, Container, Dropdown, Form, Row, Stack } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { searchAction } from "../redux/actions"
import "../style/SearchComponent.css"

import { useSelector } from "react-redux"
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
import { format, compareAsc } from "date-fns"

const SearchComponent = () => {
  //let defaultDate = Moment(new Date()).format("YYYY-MM-DD")
  let defaultDate = format(new Date(2014, 1, 11), "MM/dd/yyyy")
  let listItems = useSelector((state) => state.searchReducer.searchData)
  let isLoading = useSelector((state) => state.searchReducer.loading)

  const [originLocationCode, setOriginLocationCode] = useState("")
  const [destinationLocationCode, setDestinationLocationCode] = useState("")
  const [departureDate, setDepartureDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [tripType, setTripType] = useState("")
  const [adults, setAdults] = useState("")

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    const items = JSON.parse(localStorage.getItem("persist:root"))

    //localStorage.clear()

    dispatch(
      searchAction(
        originLocationCode,
        destinationLocationCode,
        departureDate,
        tripType,
        returnDate,
        adults
      )
    )
    navigate("/search-result")
  }
  useEffect(() => {
    console.log(adults)
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container className='search-componet col-12 col-xs-12 col-md-11 col-lg-8'>
        <Row className='d-flex justify-content-between'>
          <div className='col-3 header-btn active-btn'>
            <FlightTakeoffSharpIcon className='header-btn-icon' />
            <span>Book</span>
          </div>
          <div className='col-3 header-btn'>
            <DocumentScannerSharpIcon className='header-btn-icon' />
            <span className='text-truncate'>Manage booking</span>
          </div>
          <div className='col-3 header-btn'>
            <CheckCircleOutlineSharpIcon className='header-btn-icon' />
            <span>Check-in</span>
          </div>
          <div className='col-3 header-btn'>
            <ModeOfTravelSharpIcon className='header-btn-icon' />
            <span>Flight status</span>
          </div>
        </Row>
        <Row className='mt-4 mx-2'>
          <Form className='col-12'>
            <Row xs={12} className='d-flex justify-content-between'>
              <div className='col-6 col-xs-6 col-md-4 mb-3 px-1'>
                <InputAutoComplete
                  getInput={setOriginLocationCode}
                  label={"Departure"}
                />
              </div>
              <div className='col-6 col-xs-6 col-md-4 mb-3 px-1'>
                <InputAutoComplete
                  getInput={setDestinationLocationCode}
                  label={"Arrival"}
                />
              </div>
              <div className='col-6 col-xs-6 col-md-4 mb-3 px-1'>
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
                    <MenuItem value='3' disabled>
                      Multi-city
                    </MenuItem>
                  </TextField>
                </Stack>
              </div>

              <div className='d-flex justify-content-between px-0 col-6 col-xs-6 col-md-4 mb-3 px-1'>
                <Stack spacing={1} className='col-6 px-0'>
                  <DatePicker
                    className='trxt-trunucate'
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
                    disabled={tripType === "One way" ? true : false}
                    label='Arrival'
                    value={returnDate}
                    onChange={(newValue) => {
                      setReturnDate(format(newValue, "yyyy-MM-dd"))
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </div>
              <div className='d-flex justify-content-between px-0 col-6 col-xs-6 col-md-4 mb-3 px-1'>
                <Stack spacing={2} className='border-0 col-6 px-0 '>
                  <TextField
                    className='w-100 input-select'
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
                    <MenuItem value='3' disabled>
                      Multi-city
                    </MenuItem>
                  </TextField>
                </Stack>
              </div>

              <div className='d-flex justify-content-center align-items-center col-6 col-xs-6 col-md-4 mb-3 px-1'>
                <Button
                  id='search-button'
                  type='submit'
                  className='w-100 h-100 bg-warning border-0 text-dark'
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
  )
}

export default SearchComponent
