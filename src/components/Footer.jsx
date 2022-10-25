/** @format */

import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../style/Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <Container className='d-flex py-5 footer-div'>
        <div className='col-6 col-xs-6 col-md-3 d-flex flex-column footer-list-item'>
          <h5>About us</h5>
          <Link to='/'>About us</Link>
          <Link to='/'>Careers</Link>
          <Link to='/'>Media Centre</Link>
          <Link to='/'>Our planet</Link>
          <Link to='/'>Our people</Link>
        </div>
        <div className='col-6 col-xs-6 col-md-3 d-flex flex-column footer-list-item'>
          <h5>Help</h5>
          <Link to='/'>Help and Contact</Link>
          <Link to='/'>Travel Updates</Link>
          <Link to='/'>Special assistance</Link>
          <Link to='/'>Frequently asked questions</Link>
        </div>
        <div className='col-6 col-xs-6 col-md-3 d-flex flex-column footer-list-item'>
          <h5>Book</h5>
          <Link to='/'>Book flights</Link>
          <Link to='/'>Travel services</Link>
          <Link to='/'>Transportation</Link>
          <Link to='/'>Planning your trip</Link>
          <Link to='/'>Search for flights</Link>
        </div>
        <div className='col-6 col-xs-6 col-md-3 d-flex flex-column footer-list-item'>
          <h5>Manage</h5>
          <Link to='/'>Check-in</Link>
          <Link to='/'>Manage your booking</Link>
          <Link to='/'>Chauffeur drive</Link>
          <Link to='/'>Flight status</Link>
        </div>
      </Container>
      <Container className='text-center text-white all-right-div'>
        <small> &copy;2022 The Ticketing Group. All Rights Reserved.</small>
      </Container>
    </div>
  )
}

export default Footer
