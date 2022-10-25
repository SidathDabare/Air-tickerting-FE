/** @format */

import React, { useEffect } from "react"
import { useState } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import MyNavbar from "../components/MyNavbar"
import SearchIcon from "@mui/icons-material/Search"
import { TextField } from "@mui/material"
import "../style/DashboardPage.css"
import OrderComponent from "../components/OrderComponent"
import Loader from "../components/Loader"
import UserComponents from "../components/UserComponents"
import UserDisplayComponent from "../components/UserDisplayComponent"

const DashboardPage = () => {
  const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
  const token = useSelector((state) => state.userReducer.token)

  const [bookingInfo, setBookingInfo] = useState({})
  const [allUsers, setAllUsers] = useState([])

  const getOrdersData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/${loggedUser._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      if (res.ok) {
        let data = await res.json()
        //console.log(data)
        setBookingInfo(data)
      } else {
        console.log("ORDER ERROR")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllUsers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        setAllUsers(data.users)
      } else {
        console.log("ORDER ERROR")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (loggedUser.role === "Admin") {
      getAllUsers()
    }
    getOrdersData()
  }, [])
  return (
    <div>
      <MyNavbar />

      {bookingInfo.orders ? (
        <Container className='dashboard-container py-3'>
          <div className='col-12 d-flex py-3'>
            <div className='col-6 d-flex justify-content-start align-items-center text-light'>
              {/* <TextField
              id='outlined-size-small'
              label={
                <span>
                  <SearchIcon className='mb-1' /> Search
                </span>
              }
              variant='outlined'
              size='small'
            /> */}
            </div>
            <div className='col-6 d-flex justify-content-end align-items-center text-light'>
              <img
                className='dashboard-avatar'
                src={bookingInfo.avatar}
                alt=''
              />
              <p className='mb-0 pl-2'>
                <span> Hello,</span> <span> {bookingInfo.firstName}</span>
              </p>
            </div>
          </div>
          {/* {loggedUser.role === "Admin" ? (
            <div className='d-flex col-12 px-0'>
              <div className='col-6 col-xs-6 col-md-4 bg-light text-dark py-2 rounded mb-2'>
                <div className='col-12 d-flex border-bottom'>
                  <h6>Users details</h6>
                </div>
                {allUsers.map((user, i) => (
                  <div key={i}>
                    {user.role !== "Admin" ? (
                      <UserComponents user={user} i={i} />
                    ) : (
                      <div>{allUsers.slice(0, i)}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className='col-6 col-xs-6 col-md-8'>
                <UserDisplayComponent />
              </div>
            </div>
          ) : (
            ""
          )} */}
          {loggedUser.role !== "Admin" ? (
            <>
              <div className='col-12 bg-light text-dark py-2 rounded-top'>
                <div className='col-12 d-flex justify-content-between text-light rounded-top'>
                  <div className='col-12 d-flex justify-content-between align-items-center text-dark px-0'>
                    <h5>Done trips</h5>
                    {/* <small className='font-weight-bold'>SEE ALL</small> */}
                  </div>
                  {/* <div className='col-12 d-flex justify-content-between align-items-center'>
              <h5>Upcoming trips</h5>
              <small className='font-weight-bold'>SEE ALL</small>
            </div> */}
                </div>
              </div>

              <div className='col-12 bg-light text-dark d-flex rounded-bottom'>
                <div className='col-12'>
                  <div className='col-12 d-flex py-2'>
                    <div className='col-3 d-flex justify-content-center align-items-center'>
                      Destination
                    </div>
                    <div className='col-3 d-flex justify-content-center align-items-center'>
                      Date
                    </div>
                    <div className='col-3 d-flex justify-content-center align-items-center'>
                      Price
                    </div>
                    <div className='col-3 d-flex justify-content-center align-items-center'>
                      Action
                    </div>
                  </div>
                  {bookingInfo.orders &&
                    bookingInfo.orders.map((order, i) => (
                      <OrderComponent key={i} order={order} />
                    ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </Container>
      ) : (
        <Loader />
      )}

      <Footer />
    </div>
  )
}

export default DashboardPage
