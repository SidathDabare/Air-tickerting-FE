/** @format */

import React, { useEffect, useState } from "react"
import { Container, InputGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import UserComponents from "../components/UserComponents"
import UserDisplayComponent from "../components/UserDisplayComponent"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import SearchIcon from "@mui/icons-material/Search"
import Form from "react-bootstrap/Form"
import "../style/AdminDashBoard.css"

const AdminDashBoard = () => {
  const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
  const token = useSelector((state) => state.userReducer.token)

  const [bookingInfo, setBookingInfo] = useState({})
  const [allUsers, setAllUsers] = useState([])

  const [showDashboard, setShowDashboard] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)

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
    setShowDashboard(true)
    setShowUserProfile(false)
    if (loggedUser.role === "Admin") {
      getOrdersData()
    }
    getAllUsers()
  }, [])
  return (
    <div className='d-flex col-12 bg-light px-0 admin-main'>
      <div className='col-4 col-xs-4 col-md-2 sidebar px-0'>
        <div className='col-12 px-3 d-flex justify-content-left align-items-center sidebar-logo'>
          <h4>TICKETING </h4>
          <span className='pb-2 ml-2'>
            <FlightTakeoffSharpIcon />
          </span>
        </div>
        <div className='col-12'>
          <div
            className='col-12 px-0 sidebar-items'
            onClick={() => {
              setShowUserProfile(false)
              setShowDashboard(!showDashboard)
            }}>
            <h5 className='d-flex align-items-center'>
              <span>
                <DashboardIcon />
              </span>
              <span className='pl-2'>Dashboard</span>
            </h5>
          </div>
          <div
            className='col-12 px-0 sidebar-items'
            onClick={() => {
              setShowDashboard(false)
              setShowUserProfile(!showUserProfile)
            }}>
            <h5 className='d-flex align-items-center'>
              <span>
                <AccountBoxIcon />
              </span>
              <span className='pl-2'>User profile</span>
            </h5>
          </div>
          <div
            className={
              showUserProfile ? "col-12 px-0 admin-user-div" : "d-none"
            }>
            <div className='col-12 d-flex py-2'>
              <h5>Users</h5>
            </div>
            <div className='user-name-display'>
              {/* {allUsers.map((user, i) => (
                <UserComponents key={i} user={user} i={i} />
              ))} */}
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
          </div>
          {/* <div className='col-12 sidebar-items'>
            <h5>Dashboard</h5>
          </div>
          <div className='col-12 sidebar-items'>
            <h5>Dashboard</h5>
          </div>
          <div className='col-12 sidebar-items'>
            <h5>Dashboard</h5>
          </div> */}
        </div>
      </div>
      <div className='col-md-10 px-0 admin-right-div'>
        <div className='col-12 admin-nav-div border-bottom'>
          <div className='col-10 col-10 col-md-4 d-flex justify-content-end align-items-center'>
            <InputGroup className='col-12 admin-search'>
              {/* <InputGroup.Text id='basic-addon1'></InputGroup.Text> */}
              <SearchIcon className='admin-search-icon' />
              <Form.Control
                placeholder='Search'
                // aria-label='Search'
                aria-describedby='basic-addon1'
                className='admin-search-input'
              />
            </InputGroup>
            <div className='col-3'>
              <div className='admin-profile-div'>
                <img
                  src={loggedUser.avatar}
                  alt='admin-user-pic'
                  className='admin-profile-pic px-0'
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={showDashboard ? "col-12 admin-dashboard-div" : "d-none"}>
          <h1>Dashboard</h1>
        </div>

        <div
          className={
            showUserProfile ? "col-12 admin-user-div bg-info" : "d-none"
          }>
          <UserDisplayComponent />
          {/* <div className='col-12 admin-users-display'>
            <UserDisplayComponent />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard
