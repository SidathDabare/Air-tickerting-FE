/** @format */

import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

const ContactUsPage = () => {
  return (
    <div>
      <Container>
        <div className='col-12 mt-5'>
          <h3>Contact Me</h3>
        </div>
        <div className='col-12'>
          <div className='col-4'></div>
          <div className='col-8'>
            <a href='https://github.com/SidathDabare'>
              <GitHubIcon />
              <span className='ml-3'>https://github.com/SidathDabare</span>
            </a>
          </div>
        </div>
        <div className='col-12'>
          <div className='col-4'></div>
          <div className='col-8'>
            <a href='https://www.linkedin.com/in/sidath-dabare-591063b8'>
              <LinkedInIcon />
              <span className='ml-3'>
                https://www.linkedin.com/in/sidath-dabare-591063b8/
              </span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ContactUsPage
