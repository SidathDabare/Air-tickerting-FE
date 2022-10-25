/** @format */

import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import OrderComponent from "../components/OrderComponent"
import UserComponents from "../components/UserComponents"
import UserDisplayComponent from "../components/UserDisplayComponent"

const AdminDashBoard = () => {
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
      getOrdersData()
    }
  }, [])
  return (
    <Container>
      {loggedUser.role === "Admin" ? (
        <div className='d-flex col-12 px-0'>
          <div className='col-6 col-xs-6 col-md-4 bg-light text-dark py-2 rounded mb-2'>
            <div className='col-12 d-flex border-bottom'>
              <h6>Users details</h6>
              {/* <div className='col-4'>
                    <h6>User</h6>
                  </div> */}
              {/* <div className='col-4 text-center'>
                    <h6>Joined Date</h6>
                  </div>
                  <div className='col-4 text-right'>
                    <h6>Action</h6>
                  </div> */}
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
      )}
      {loggedUser.orders.length > 0 ? (
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
  )
}

export default AdminDashBoard
