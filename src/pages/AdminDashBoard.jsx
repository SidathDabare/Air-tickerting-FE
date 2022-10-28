/** @format */

import React, { useEffect, useState } from "react"
import { Container, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import UserComponents from "../components/UserComponents"
import UserDisplayComponent from "../components/UserDisplayComponent"
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import WidgetsIcon from "@mui/icons-material/Widgets"
import SearchIcon from "@mui/icons-material/Search"
import Form from "react-bootstrap/Form"
import "../style/AdminDashBoard.css"
import { selectedUser } from "../redux/actions"
import AdminDisplayComponent from "../components/AdminDisplayComponent"

const AdminDashBoard = () => {
  const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
  const token = useSelector((state) => state.userReducer.token)
  const dispatch = useDispatch()

  const [bookingInfo, setBookingInfo] = useState({})
  const [allUsers, setAllUsers] = useState([])

  const [showDashboard, setShowDashboard] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  console.log(showSidebar)

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

        dispatch(selectedUser(data.users[1]))
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
      <div
        className={
          showSidebar
            ? "sidebar px-0 sidebar-move-right"
            : "sidebar px-0 sidebar-move-left"
        }>
        <div className='col-12 d-flex justify-content-left align-items-center sidebar-logo add-margin'>
          <Link to={"/"}>
            <h4 className='hide-item mr-2'>TICKETING </h4>
            <span className='pb-2'>
              <FlightTakeoffSharpIcon className='make-icon-bigger' />
            </span>
          </Link>
        </div>
        <div className='col-12'>
          <div
            className='col-12 px-0 sidebar-items'
            onClick={() => {
              setShowUserProfile(false)
              setShowDashboard(!showDashboard)
            }}>
            <h6 className='d-flex align-items-center add-margin'>
              <span>
                <DashboardIcon className='make-icon-bigger' />
              </span>
              <span className='pl-2 hide-item'>DASHBOARD</span>
            </h6>
          </div>
          <div
            className='col-12 px-0 sidebar-items'
            onClick={() => {
              setShowDashboard(false)
              setShowUserProfile(!showUserProfile)
            }}>
            <h6 className='d-flex align-items-center add-margin'>
              <span>
                <AccountBoxIcon className='make-icon-bigger' />
              </span>
              <span className='pl-2 hide-item'>USER PROFILE</span>
            </h6>
          </div>
          <div
            className={
              showUserProfile ? "col-12 px-0 admin-user-div" : "d-none"
            }>
            <div className='col-12 d-flex py-2 px-0 add-margin'>
              <h6>USERS</h6>
            </div>
            <div className='user-name-display'>
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
        </div>
      </div>
      <div
        className={
          showSidebar
            ? "px-0 admin-right-div admin-right-div-minimize"
            : "px-0 admin-right-div admin-right-div-expand"
        }>
        <div className='col-12 admin-nav-div border-bottom'>
          <div className='col-2'>
            <WidgetsIcon
              className='menu-icon'
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
          <div className='col-8 d-flex justify-content-end align-items-center'>
            <InputGroup className='col-10 col-md-7 admin-search flex-grow-1 px-0'>
              {/* <InputGroup.Text id='basic-addon1'></InputGroup.Text> */}
              <SearchIcon className='admin-search-icon' />
              <Form.Control
                placeholder='Search'
                // aria-label='Search'
                aria-describedby='basic-addon1'
                className='admin-search-input'
              />
            </InputGroup>
            <div className='col-2 hide-item'>
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
          <AdminDisplayComponent />
        </div>

        <div className={showUserProfile ? "col-12" : "d-none"}>
          <UserDisplayComponent
            setShowDashboard={setShowDashboard}
            getAllUsers={getAllUsers}
          />
          {/* <div className='col-12 admin-users-display'>
            <UserDisplayComponent />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard
