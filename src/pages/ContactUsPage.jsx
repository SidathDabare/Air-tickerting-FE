/** @format */

import React from "react"
import { Container } from "react-bootstrap"
import QRCode from "qrcode"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const ContactUsPage = () => {
  const [src, setSrc] = useState([])

  let text = "https://www.linkedin.com/in/sidath-dabare-591063b8"

  useEffect(() => {
    QRCode.toDataURL(text).then((data) => {
      setSrc(data)
    })
  }, [])
  return (
    <div>
      <Container>
        <div className='col-12 col-md-8 mx-auto mt-2 '>
          <Link to='../' className='d-flex align-items-center'>
            <span>
              <FirstPageIcon />
            </span>
            <span>GO BACK</span>
          </Link>
        </div>
        <div className='col-12 mt-5'>
          <h3>Contact Me</h3>
        </div>
        <div className='col-12 col-md-8 mx-auto d-flex flex-wrap mt-5'>
          <div className='col-12 col-md-9 px-0'>
            <div className='py-2'>
              <a href='https://github.com/SidathDabare'>
                <GitHubIcon />
                <span className='ml-3'>https://github.com/SidathDabare</span>
              </a>
            </div>
            <div className='py-2'>
              <a href='https://www.linkedin.com/in/sidath-dabare-591063b8'>
                <LinkedInIcon />
                <span className='ml-3'>
                  https://www.linkedin.com/in/sidath-dabare-591063b8/
                </span>
              </a>
            </div>
            <div className='py-2'>
              <a href='mailto:sidath2007@gmail.com'>
                <AlternateEmailIcon />
                <span className='ml-3'>sidath2007@gmail.com</span>
              </a>
            </div>
          </div>
          <div className='col-12 col-md-3 px-0 d-flex justify-content-center align-items-center'>
            <img
              src={src}
              className='col-12 px-0'
              style={{
                height: "150px",
                width: "150px",
                maxWidth: "150px",
                maxHeight: "150px",
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ContactUsPage
