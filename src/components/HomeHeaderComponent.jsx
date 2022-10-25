/** @format */

import React from "react"
import { Container } from "react-bootstrap"
import "../style/HomeHeaderComponent.css"

const HomeHeaderComponent = () => {
  return (
    <div className='HomeHeaderComponent'>
      <div className='home-header-overlay'></div>
      <Container className='text-white home-header-content px-2'>
        <h1>NEED A TICKET?</h1>
      </Container>
    </div>
  )
}

export default HomeHeaderComponent
