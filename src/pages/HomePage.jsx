/** @format */

import React from "react"
import Footer from "../components/Footer"
import MyNavbar from "../components/MyNavbar"
import SearchComponent from "../components/SearchComponent"
import "../style/HomePage.css"
import { Container } from "react-bootstrap"

const HomePage = () => {
  return (
    <div className='home-div-main'>
      <MyNavbar />
      <div className='home-div-container'>
        <div className='HomeHeaderComponent'>
          <div className='home-header-overlay'></div>
          <Container className='text-white home-header-content px-2'>
            <h1>NEED A TICKET?</h1>
          </Container>
        </div>
        <Container className='home-div-content'>
          <SearchComponent />
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
