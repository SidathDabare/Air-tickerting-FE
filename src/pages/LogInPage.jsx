/** @format */

import React, { useEffect, useState } from "react"
import { Alert, Button, Container, Form, Row } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import "../style/LogInPage.css"

import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import Footer from "../components/Footer"

import { useNavigate } from "react-router-dom"
import { setLoggedInUserAction, setTokenAction } from "../redux/actions"

const LogInPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const userDetails = useSelector((state) => state.userReducer.userDetails)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

  const logInUser = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      )
      if (response.ok) {
        let data = await response.json()
        //console.log(data)
        dispatch(setTokenAction(data.token))
        dispatch(setLoggedInUserAction(data.user))
        //localStorage.setItem("token", data.token)
        navigate("/")
      } else {
        setMessage(response.statusText)
        setError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    logInUser()
  }

  return (
    <div>
      <div className='login-nav-div'>
        <Container className='d-flex justify-content-between align-items-center text-white login-nav-section01'>
          <div className='login-nav-left-div '>
            <h4>TICKETING </h4>
            <span className='pb-2 ml-2'>
              <FlightTakeoffSharpIcon />
            </span>
          </div>
        </Container>
      </div>
      <div className='text-center text-white login-nav-section02'>
        <div className='login-nav-section02-overlay'></div>
        <Container className='pt-5'>
          <h1> Log in to TICKETING</h1>
          <p className='py-0 mb-0'>
            Earn Miles every time you fly with us and our partners. And
          </p>
          <p>spend your Skywards Miles on a world of rewards.</p>
        </Container>
      </div>

      <Container className='text-white mb-5  py-5 login-nav-section03 flex-column'>
        <Row className='col-12 '>
          {error && (
            <div className='pb-2 border border-danger col-6'>
              <small className='text-danger' id='alert-paragrph'>
                {message + ", Please provide correct credential"}
              </small>

              <br />
            </div>
          )}
        </Row>
        <Row className='col-12 '>
          <div className='col-6'>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Check me out' />
              </Form.Group>
              <Button
                variant='warning btn-block'
                type='submit'
                onClick={handleSubmit}>
                <span className='font-weight-bold mr-1'>Log in</span>
                <FlightTakeoffSharpIcon />
              </Button>
              <div className='text-center mt-3 register-div'>
                <p onClick={() => navigate("/register")}>Click here to join</p>
              </div>
            </Form>
          </div>
          <div className='col-6 px-5'></div>
        </Row>
      </Container>

      <Footer />
    </div>
  )
}

export default LogInPage
