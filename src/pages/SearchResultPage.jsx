/** @format */

import React from "react"
import MyNavbar from "../components/MyNavbar"
import FlightList from "../components/FlightList"
import Footer from "../components/Footer"
import StepComponent from "../components/StepComponent"
import { Container } from "react-bootstrap"
import "../style/SearchResultPage.css"

const SearchResultPage = () => {
  return (
    <div>
      <MyNavbar />
      <Container className='flight-result-conatiner'>
        <StepComponent ticketSelect={true} />
        <FlightList />
      </Container>

      <Footer />
    </div>
  )
}

export default SearchResultPage
