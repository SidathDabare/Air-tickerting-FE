/** @format */

// /** @format */
/** @format */

import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import OrderComponent from "../components/OrderComponent"
import Form from "react-bootstrap/Form"
import "../style/DashboardPage.css"
import BigLogo from "../assets/logo1.png"
import CloseIcon from "@mui/icons-material/Close"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined"
import { TextField } from "@mui/material"
import LoopIcon from "@mui/icons-material/Loop"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket"
import ReportIcon from "@mui/icons-material/Report"
import { setLoggedInUserAction, setTokenAction } from "../redux/actions"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const DashboardPage = () => {
  const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
  const token = useSelector((state) => state.userReducer.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [bookingInfo, setBookingInfo] = useState({})
  // const [allUsers, setAllUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState({})

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState(loggedUser.password)
  const [role, setRole] = useState("User")
  const [avatar, setAvatar] = useState("")

  const [showDashboard, setShowDashboard] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showToggle, setShowToggle] = useState(false)

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
      Authorization: `Bearer ${token}`,
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
      dispatch(setLoggedInUserAction(data))
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async () => {
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
        setUser(data)
      } else {
        console.log("ORDER ERROR")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const userLogOut = () => {
    dispatch(setTokenAction(""))
    dispatch(setLoggedInUserAction(""))
    navigate("/")

    //navigate("/login")
  }
  useEffect(() => {
    setShowDashboard(true)
    setShowUserProfile(false)
    setShowEditProfile(false)

    getUser()
  }, [])
  return (
    <div className='d-flex col-12 bg-light px-0 user-main'>
      <div
        className={
          showSidebar
            ? "sidebar px-0 sidebar-move-right"
            : "sidebar px-0 sidebar-move-left"
        }>
        <div className='col-12 d-flex justify-content-left align-items-center sidebar-logo'>
          <div className='user-dashboard-logo-div d-flex justify-content-between align-items-center'>
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
        </div>
      </div>
      <div
        className={
          showSidebar
            ? "px-0 user-right-div user-right-div-minimize"
            : "px-0 user-right-div user-right-div-expand"
        }>
        <div className='col-12 user-nav-div border-bottom'>
          <div className='col-1'>
            <MoreVertIcon
              className='menu-icon'
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>

          <div className='col-5 col-md-3 hide-item d-flex justify-content-end align-items-center'>
            <div className='user-profile-div'>
              <img
                src={loggedUser.avatar}
                alt='user-user-pic'
                className='user-profile-pic px-0'
              />
            </div>
            <h6 className='mb-0 ml-1'>Hello, {loggedUser.firstName}</h6>
            {showToggle ? (
              <KeyboardArrowUpIcon
                style={{ cursor: "pointer" }}
                onClick={() => setShowToggle(!showToggle)}
              />
            ) : (
              <KeyboardArrowDownIcon
                style={{ cursor: "pointer" }}
                onClick={() => setShowToggle(!showToggle)}
              />
            )}
            <div className={showToggle ? "user-toggle-div" : "d-none"}>
              <button
                className='btn btn-outline-info btn-block'
                onClick={() => {
                  navigate("/")
                }}>
                Go to Home
              </button>
              <button
                className='btn btn-outline-info btn-block'
                onClick={() => {
                  userLogOut()
                }}>
                LOG OUT
              </button>
            </div>
          </div>
        </div>

        <div className={showDashboard ? "col-12 user-dashboard-div" : "d-none"}>
          <div className='user-display-main'>
            <div className='user-dashboard-display-section01'>
              <div className='user-dashboard-display-items'>
                <div className='col-12 d-flex user-dashboard-display-items-section1'>
                  <div className='col-6 px-0 d-flex align-items-center justify-content-between'>
                    <MonetizationOnIcon className='user-display-icon-big text-success' />
                  </div>
                  <div className='col-6 px-0 d-flex flex-column align-items-end justify-content-center text-success'>
                    <p className='mb-0'>Paid</p>
                    <h4>
                      {/* {orders.length} */}
                      <span className='mr-1'>
                        {user.orders && user.orders.length > 0
                          ? user.orders[0].data.flightOffers[0].price.currency
                          : "$"}
                      </span>
                      <span className='font-weight-bold'>
                        {user.orders
                          ? user.orders
                              .map((order) =>
                                Number(order.data.flightOffers[0].price.total)
                              )
                              .reduce((a, b) => a + b, 0)
                              .toFixed(2)
                          : "0"}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className='col-12 user-dashboard-display-items-section2 text-right'>
                  <span className='mx-1'>
                    <LoopIcon />
                  </span>
                  <span>
                    <small>Update Now</small>
                  </span>
                </div>
              </div>
              <div className='user-dashboard-display-items'>
                <div className='col-12 d-flex user-dashboard-display-items-section1'>
                  <div className='col-6 px-0 d-flex align-items-center justify-content-between'>
                    <AirplaneTicketIcon className='user-display-icon-big font-color' />
                  </div>
                  <div className='col-6 px-0 d-flex flex-column align-items-end justify-content-center font-color'>
                    <p className='mb-0'>Orders</p>
                    <h4>{user.orders ? user.orders.length : "0"}</h4>
                  </div>
                </div>
                <div className='col-12 user-dashboard-display-items-section2 text-right'>
                  <span className='mx-1'>
                    <LoopIcon />
                  </span>
                  <span>
                    <small>Update Now</small>
                  </span>
                </div>
              </div>
              <div className='user-dashboard-display-items'>
                <div className='col-12 d-flex user-dashboard-display-items-section1'>
                  <div className='col-6 px-0 d-flex align-items-center justify-content-between'>
                    <ReportIcon className='user-display-icon-big text-danger' />
                  </div>
                  <div className='col-6 px-0 d-flex flex-column align-items-end justify-content-center text-danger'>
                    <p className='mb-0'>Errors</p>
                    <h4>05</h4>
                  </div>
                </div>
                <div className='col-12 user-dashboard-display-items-section2 text-right'>
                  <span className='mx-1'>
                    <LoopIcon />
                  </span>
                  <span>
                    <small>Update Now</small>
                  </span>
                </div>
              </div>
            </div>
            <div className='user-dashboard-display-section02'>
              {user.orders &&
                user.orders.map((order, i) => (
                  <OrderComponent key={i} order={order} />
                ))}
            </div>
          </div>
        </div>
        <div className={showEditProfile ? "col-12" : "d-none"}>
          <>
            {loggedUser.firstName ? (
              <div className='col-12 user-edit-div-main'>
                <div className='admin-edit-section01 px-0'>
                  <div className='col-12'>
                    <div className='px-0 d-flex align-items-center justify-content-center'>
                      <img
                        className='user-edit-img'
                        src={loggedUser.avatar}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='px-0 d-flex align-items-center justify-content-center'>
                      <div className='col-12 text-center'>
                        <h5 className='text-info'>
                          <span>
                            {loggedUser.firstName} {loggedUser.lastName}
                          </span>
                        </h5>
                        <p>
                          <span>{loggedUser.email}</span>
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
                          defaultValue={loggedUser.firstName}
                          variant='outlined'
                          className='col-12 col-xs-12 col-md-6 px-1'
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                          size='small'
                          id='outlined-basic'
                          defaultValue={loggedUser.lastName}
                          label='Lastname'
                          variant='outlined'
                          className='col-12 col-xs-12 col-md-6 px-1'
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                          size='small'
                          id='outlined-basic'
                          defaultValue={loggedUser.email}
                          label='Email'
                          variant='outlined'
                          className='col-12 col-xs-12 col-md-6 px-1'
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* <TextField
                          size='small'
                          id='outlined-basic'
                          label='Password'
                          type='password'
                          defaultValue={loggedUser.password}
                          value={loggedUser.password}
                          variant='outlined'
                          className='col-12 col-xs-12 col-md-6 px-1'
                          onChange={(e) => setPassword(e.target.value)}
                        /> */}
                        <Form.Group className='col-12 col-xs-12 col-md-6 px-1'>
                          <Form.Control
                            className='col-12 px-0 py-1'
                            type='file'
                            onChange={addImage}
                          />
                        </Form.Group>
                        <div className='admin-btn-div col-12 col-xs-12 col-md-6 px-1'>
                          <button
                            disabled={
                              firstName && lastName && email && avatar
                                ? false
                                : true
                            }
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
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

// import React, { useEffect } from "react"
// import { useState } from "react"
// import { Container } from "react-bootstrap"
// import { useSelector } from "react-redux"
// import Footer from "../components/Footer"
// import MyNavbar from "../components/MyNavbar"
// import SearchIcon from "@mui/icons-material/Search"
// import { TextField } from "@mui/material"
// import "../style/DashboardPage.css"
// import OrderComponent from "../components/OrderComponent"
// import Loader from "../components/Loader"
// import UserComponents from "../components/UserComponents"
// import UserDisplayComponent from "../components/UserDisplayComponent"
// import { useNavigate } from "react-router-dom"
// import BigLogo from "../assets/logo1.png"

// const DashboardPage = () => {
//   const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
//   const token = useSelector((state) => state.userReducer.token)
//   const navigate = useNavigate()

//   const [bookingInfo, setBookingInfo] = useState({})
//   const [allUsers, setAllUsers] = useState([])

//   const getOrdersData = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_BE_URL}/users/${loggedUser._id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       if (res.ok) {
//         let data = await res.json()
//         //console.log(data)
//         setBookingInfo(data)
//       } else {
//         console.log("ORDER ERROR")
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const getAllUsers = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (res.ok) {
//         let data = await res.json()
//         console.log(data)
//         setAllUsers(data.users)
//       } else {
//         console.log("ORDER ERROR")
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     if (loggedUser.role === "Admin") {
//       getAllUsers()
//     }
//     getOrdersData()
//   }, [])
//   return (
//     <div className='d-flex'>
//       <div className='left-div'>
//         <div className='user-dashboard-logo-div'>
//           <img src={BigLogo} alt='logo' onClick={() => navigate("/")} />
//           {/* <CloseIcon
//             className='show-close-icon'
//             onClick={() => setShowSidebar(!showSidebar)}
//           /> */}
//         </div>
//       </div>
//       <div className='right-div'>
//         <div className='user-dashboard-nav d-flex justify-content-end align-items-center'>
//           <div className='col-1'>
//             <div className='admin-profile-div'>
//               <img
//                 src={loggedUser.avatar}
//                 alt='admin-user-pic'
//                 className='admin-profile-pic px-0'
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <MyNavbar /> */}

//       {/* {bookingInfo.orders ? (
//         <Container className='dashboard-container py-3'>
//           <div className='col-12 d-flex py-3'>
//             <div className='col-6 d-flex justify-content-start align-items-center text-light'></div>
//             <div className='col-6 d-flex justify-content-end align-items-center text-light'>
//               <img
//                 className='dashboard-avatar'
//                 src={bookingInfo.avatar}
//                 alt=''
//               />
//               <p className='mb-0 pl-2'>
//                 <span> Hello,</span> <span> {bookingInfo.firstName}</span>
//               </p>
//             </div>
//           </div>

//           {loggedUser.role !== "Admin" ? (
//             <>
//               <div className='col-12 bg-light text-dark py-2 rounded-top'>
//                 <div className='col-12 d-flex justify-content-between text-light rounded-top'>
//                   <div className='col-12 d-flex justify-content-between align-items-center text-dark px-0'>
//                     <h5>Done trips</h5>
//                   </div>
//                 </div>
//               </div>

//               <div className='col-12 bg-light text-dark d-flex rounded-bottom'>
//                 <div className='col-12'>
//                   <div className='col-12 d-flex py-2'>
//                     <div className='col-3 d-flex justify-content-center align-items-center'>
//                       Destination
//                     </div>
//                     <div className='col-3 d-flex justify-content-center align-items-center'>
//                       Date
//                     </div>
//                     <div className='col-3 d-flex justify-content-center align-items-center'>
//                       Price
//                     </div>
//                     <div className='col-3 d-flex justify-content-center align-items-center'>
//                       Action
//                     </div>
//                   </div>
//                   {bookingInfo.orders &&
//                     bookingInfo.orders.map((order, i) => (
//                       <OrderComponent key={i} order={order} />
//                     ))}
//                 </div>
//               </div>
//             </>
//           ) : (
//             ""
//           )}
//         </Container>
//       ) : (
//         <Loader />
//       )} */}

//       {/* <Footer /> */}
//     </div>
//   )
// }

// export default DashboardPage
