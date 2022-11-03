/** @format */

import React, { useEffect, useState } from "react"
import { InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import UserComponents from "../components/UserComponents"
import UserDisplayComponent from "../components/UserDisplayComponent"
import SearchIcon from "@mui/icons-material/Search"
import Form from "react-bootstrap/Form"
import "../style/AdminDashBoard.css"
import { selectedUser } from "../redux/actions"
import AdminDisplayComponent from "../components/AdminDisplayComponent"
import AdminEditComponent from "../components/AdminEditComponent"
import BigLogo from "../assets/logo1.png"
import CloseIcon from "@mui/icons-material/Close"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined"

const AdminDashBoard = () => {
  const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
  const token = useSelector((state) => state.userReducer.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [bookingInfo, setBookingInfo] = useState({})
  const [allUsers, setAllUsers] = useState([])

  const [showDashboard, setShowDashboard] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  //console.log(showSidebar)

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
        //console.log(data)
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
    setShowEditProfile(false)
    // if (loggedUser.role === "Admin") {
    //   getOrdersData()
    // }
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
        <div className='col-12 d-flex justify-content-left align-items-center sidebar-logo'>
          <div className='admin-dashboard-logo-div d-flex justify-content-between align-items-center'>
            <img src={BigLogo} alt='logo' onClick={() => navigate("/")} />
            <CloseIcon
              className='show-close-icon'
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
        </div>
        <div className='col-12'>
          <div
            className='col-12 sidebar-items'
            onClick={() => {
              setShowUserProfile(false)
              setShowEditProfile(false)
              setShowSidebar(false)
              setShowDashboard(!showDashboard)
            }}>
            <h6 className='d-flex align-items-center'>
              <span>
                <DashboardCustomizeOutlinedIcon className='make-icon-bigger' />
              </span>
              <span className='pl-2'>DASHBOARD</span>
            </h6>
          </div>
          <div
            className='col-12 sidebar-items'
            onClick={() => {
              setShowDashboard(false)
              setShowUserProfile(false)
              setShowSidebar(false)
              setShowEditProfile(!showEditProfile)
            }}>
            <h6 className='d-flex align-items-center'>
              <span>
                <BorderColorOutlinedIcon className='make-icon-bigger' />
              </span>
              <span className='pl-2'>EDIT DETAILS</span>
            </h6>
          </div>
          <div
            className='col-12 sidebar-items'
            onClick={() => {
              setShowDashboard(false)
              setShowEditProfile(false)
              setShowUserProfile(!showUserProfile)
            }}>
            <h6 className='d-flex align-items-center'>
              <span>
                <AccountCircleIcon className='make-icon-bigger' />
              </span>
              <span className='pl-2'>USERS PROFILES</span>
            </h6>
          </div>
          <div
            className={
              showUserProfile ? "col-12 px-0 admin-user-div" : "d-none"
            }>
            <div className='col-12 d-flex py-2 px-2'>
              <h6>USERS</h6>
            </div>
            {allUsers.length > 0 ? (
              <div className='user-name-display'>
                {allUsers.map((user, i) => (
                  <div key={user._id}>
                    <UserComponents
                      user={user}
                      i={i}
                      setShowSidebar={setShowSidebar}
                    />
                    {/* {user.role !== "Admin" ? (
                      <UserComponents user={user} i={i} />
                    ) : (
                      <div>{allUsers.slice(0, i)}</div>
                    )} */}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
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
          <div className='col-1 d-flex justify-content-center px-0'>
            <MoreVertIcon
              className='menu-icon'
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
          <div className='col-11 col-md-8 d-flex justify-content-end align-items-center px-0'>
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
            <div className='col-1 hide-item d-flex justify-content-end'>
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
        <div className={showEditProfile ? "col-12" : "d-none"}>
          <AdminEditComponent
            setShowDashboard={setShowDashboard}
            getAllUsers={getAllUsers}
          />
        </div>
        <div className={showUserProfile ? "col-12" : "d-none"}>
          <UserDisplayComponent
            setShowDashboard={setShowDashboard}
            getAllUsers={getAllUsers}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard
