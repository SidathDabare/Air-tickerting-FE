/** @format */
import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import OrderComponent from "../components/OrderComponent"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import CloseIcon from "@mui/icons-material/Close"
import "../style/AdminEditComponent.css"
import Modal from "react-bootstrap/Modal"
import { MenuItem, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { format } from "date-fns"

const AdminEditComponent = (props) => {
  const user = useSelector((state) => state.selectedUserReducer.selectedUser)
  const admin = useSelector((state) => state.userReducer)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Admin")
  const [avatar, setAvatar] = useState("")

  // const deleteUser = async () => {
  //   let headers = {
  //     Authorization: `Bearer ${admin.token}`,
  //     "Content-type": "application/json",
  //   }
  //   try {
  //     let res = await fetch(
  //       `${process.env.REACT_APP_BE_URL}/users/${user._id}`,
  //       {
  //         method: "DELETE",
  //         headers,
  //       }
  //     )
  //     console.log(res)
  //     handleClose()
  //     props.setShowDashboard(true)
  //     props.getAllUsers()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
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
  const editAdminDetails = async () => {
    let headers = {
      Authorization: `Bearer ${admin.token}`,
      "Content-type": "application/json",
    }
    let url = `${process.env.REACT_APP_BE_URL}/users/me`
    try {
      let res = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
          avatar,
        }),
      })
      let data = await res.json()
      console.log(data)

      return data
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {admin.loggedInUser.firstName ? (
        <div className='col-12 admin-edit-div-main'>
          <div className='admin-edit-section01 px-0'>
            <div className='col-12'>
              <div className='px-0 d-flex align-items-center justify-content-center'>
                <img
                  className='admin-edit-img'
                  src={admin.loggedInUser.avatar}
                  alt=''
                />
              </div>
            </div>
            <div className='col-12'>
              <div className='px-0 d-flex align-items-center justify-content-center'>
                <div className='col-12 text-center'>
                  <h5 className='text-info'>
                    <span>
                      {admin.loggedInUser.firstName}{" "}
                      {admin.loggedInUser.lastName}
                    </span>
                  </h5>
                  <p>
                    <span>{admin.loggedInUser.email}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='px-0 admin-edit-section02'>
            <div className='col-12 '>
              <div className='col-12 py-2 border-bottom px-3'>
                <h5>Edit Profile</h5>
              </div>
              <div className='px-0 py-2'>
                <div className='py-2 mt-1 admin-edit-div'>
                  <TextField
                    size='small'
                    id='outlined-basic'
                    label='Firstname'
                    defaultValue={admin.loggedInUser.firstName}
                    variant='outlined'
                    className='col-12 col-xs-12 col-md-6 px-1'
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    size='small'
                    id='outlined-basic'
                    defaultValue={admin.loggedInUser.lastName}
                    label='Lastname'
                    variant='outlined'
                    className='col-12 col-xs-12 col-md-6 px-1'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    size='small'
                    id='outlined-basic'
                    defaultValue={admin.loggedInUser.email}
                    label='Email'
                    variant='outlined'
                    className='col-12 col-xs-12 col-md-6 px-1'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    size='small'
                    id='outlined-basic'
                    label='Password'
                    type='password'
                    defaultValue={""}
                    variant='outlined'
                    className='col-12 col-xs-12 col-md-6 px-1'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Group className='col-12 col-xs-12 col-md-6 px-1'>
                    <Form.Control
                      className='col-12 px-0 py-1'
                      type='file'
                      onChange={addImage}
                    />
                  </Form.Group>
                  <div className='admin-btn-div col-12 col-xs-12 col-md-6 px-1'>
                    <button
                      type='submit'
                      className='btn btn-outline-info btn-block'
                      onClick={editAdminDetails}>
                      Edit Details
                    </button>
                  </div>
                </div>
                <div className='col-12 d-flex'>
                  <small className='text-info text-truncate'>
                    {avatar ? avatar : ""}
                  </small>
                </div>
                <div className='col-12 py-2 mt-1 d-flex'></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4>Please Select User...</h4>
        </div>
      )}
    </>
  )
}

export default AdminEditComponent
