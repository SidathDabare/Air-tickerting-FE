/** @format */

import React, { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import "../style/RegisterPage.css"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import Footer from "../components/Footer"

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [avatar, setAvatar] = useState("")
  console.log(role)

  const addNewUser = async () => {
    let url = `${process.env.REACT_APP_BE_URL}/users`
    // let imagePath = await addImage(imageUrl)
    // console.log(imagePath)

    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
          avatar,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      let data = await res.json()
      console.log(data)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  const addImage = async (e) => {
    let str = e.target.files[0]
    let url = `${process.env.REACT_APP_BE_URL}/files/cloudinary`
    var formData = new FormData()
    formData.append("image", str)
    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    }
    try {
      let res = await fetch(url, requestOptions)
      let data = await res.json()
      console.log(data)
      setAvatar(data.url)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewUser()
  }
  useEffect(() => {}, [role])
  return (
    <div>
      <div className='register-nav-div'>
        <Container className='d-flex justify-content-between align-items-center text-white register-nav-section01'>
          <div className='register-nav-left-div '>
            <h4>TICKETING </h4>
            <span className='pb-2 ml-2'>
              <FlightTakeoffSharpIcon />
            </span>
          </div>
        </Container>
      </div>
      <div className='text-center text-white register-nav-section02'>
        <div className='register-nav-section02-overlay'></div>
        <Container className='pt-5'>
          <h1> Log in to TICKETING</h1>
          <p className='py-0 mb-0'>
            Earn Miles every time you fly with us and our partners. And
          </p>
          <p>spend your Skywards Miles on a world of rewards.</p>
        </Container>
      </div>

      <Container className='text-white mb-5  py-5 register-nav-section03'>
        <Form className='w-100'>
          <div className='col-12 d-flex flex-wrap'>
            <Form.Group className='mb-3 col-12 col-xs-12 col-md-6'>
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type='text'
                placeholder='FirstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3 col-12 col-xs-12 col-md-6'>
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type='text'
                placeholder='LastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className='mb-3 col-12 col-xs-12 col-md-6'
              controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className='mb-3 col-12 col-xs-12 col-md-6'
              controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3 col-12 col-xs-12 col-md-6'>
              {/* <Form.Label>Role</Form.Label> */}
              <Form.Select
                size='lg'
                className='w-100 py-2 rounded px-1 mt-2'
                type='text'
                placeholder='Role'
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value='User'>User</option>
                <option value='Admin'>Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3 col-12 col-xs-12 col-md-6'>
              <Form.Label className='col-12 d-flex'>
                {avatar ? (
                  <span className='text-truncate text-info'>{avatar}</span>
                ) : (
                  <span></span>
                )}
              </Form.Label>
              {/* <Form.Control
                className='col-6 mr-1'
                type='text'
                placeholder='ImageUrl'
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              /> */}
              <Form.Control
                className='col-12 px-0 py-1'
                type='file'
                onChange={addImage}
              />
            </Form.Group>
          </div>
          <Button
            className='col-7 mx-auto mt-3'
            variant='warning btn-block'
            type='submit'
            onClick={handleSubmit}>
            <span className='font-weight-bold mr-1'>Sign up</span>
            <FlightTakeoffSharpIcon />
          </Button>
        </Form>
      </Container>

      <Footer />
    </div>
  )
}

export default RegisterPage
