/** @format */
import "../style/MyNavbar.css"
import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import BigLogo from "../assets/logo1.png"

import { setLoggedInUserAction, setTokenAction } from "../redux/actions"

const MyNavbar = () => {
  const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
  const dispatch = useDispatch()
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [toggleBtn, setToggleBtn] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  const userLogOut = () => {
    dispatch(setTokenAction(""))
    dispatch(setLoggedInUserAction(""))

    //navigate("/login")
  }
  useEffect(() => {
    setShowUserProfile(false)
    setToggleBtn(false)
    setShowMenu(false)
  }, [])

  return (
    <div className='navbar-div-main'>
      <Container className='navbar-div-container px-0'>
        <div className='logo-div' onClick={() => navigate("/")}>
          <img src={BigLogo} alt='logo' />
        </div>
        <div className='nav-menu-div'>
          <div className='nav-menu'>
            {/* <Link to='/' className='nav-menu-items'>
              Home
            </Link>
            <Link to='/' className='nav-menu-items'>
              Home
            </Link> */}
            {/* <p
              className='nav-menu-items mb-0'
              onClick={() => {
                navigate(
                  loggedUser.role === "Admin" ? "../admin" : "../dashboard"
                )
              }}>
              Dashboard
            </p> */}
            <p
              className='nav-menu-items mb-0'
              onClick={() => {
                navigate("./contact-us")
              }}>
              Contact Us
            </p>
          </div>
          <div className='user-profile'>
            {loggedUser ? (
              <>
                <div className='profile-div mr-2'>
                  <img
                    src={loggedUser.avatar}
                    alt=''
                    className='profile-image'
                  />
                </div>{" "}
                <span className='text-truncate'>
                  {" "}
                  Hello, {loggedUser.firstName}
                </span>
                {!showUserProfile ? (
                  <KeyboardArrowDownIcon
                    className='profile-toggle-btn'
                    onClick={() => setShowUserProfile(!showUserProfile)}
                  />
                ) : (
                  <KeyboardArrowUpIcon
                    className='profile-toggle-btn'
                    onClick={() => setShowUserProfile(!showUserProfile)}
                  />
                )}
              </>
            ) : (
              <div className='col-12 d-flex justify-content-end user-logout-div'>
                <AccountCircleIcon className='mx-2' />
                <Link to='./login'>LOGIN</Link>
              </div>
            )}
            {loggedUser ? (
              <div
                className={
                  !showUserProfile
                    ? "user-profile-details-hide"
                    : "user-profile-details-show"
                }>
                <div className='col-12 d-flex p-2'>
                  <div className='col-3'>
                    <img
                      src={loggedUser.avatar}
                      alt=''
                      className='menu-profile-image'
                    />
                  </div>
                  <div className='col-9 d-flex justify-content-center align-items-start flex-column'>
                    <h6 className='text-truncate mb-0'>
                      {" "}
                      {loggedUser.firstName} {loggedUser.lastName}
                    </h6>

                    <small>{loggedUser.email}</small>
                  </div>
                </div>
                <div className='col-12 py-2'>
                  <small>User role : {loggedUser.role}</small>
                </div>
                <div className='col-12 mb-auto'>
                  <button
                    className='btn btn-outline-info btn-block'
                    onClick={() => {
                      navigate(
                        loggedUser.role === "Admin"
                          ? "../admin"
                          : "../dashboard"
                      )
                    }}>
                    Go to dashboard
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
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          className='toggle-btn'
          onClick={() => {
            setToggleBtn(!toggleBtn)
            setShowMenu(!showMenu)
          }}>
          <div
            className={
              !toggleBtn
                ? "line1 back-toggle-btn-left"
                : "line1 toggle-btn-left"
            }></div>
          <div className={!toggleBtn ? "line2" : "toggle-btn-hide"}></div>
          <div
            className={
              !toggleBtn
                ? "line3 back-toggle-btn-right"
                : "line3 toggle-btn-right"
            }></div>
        </div>
        <div
          className={
            showMenu
              ? "nav-menu-small hide-nav-menu"
              : "nav-menu-small show-nav-menu"
          }>
          <div className='nav-menu-small-item'>
            {/* <span
              className='small-nav-menu-items'
              onClick={() => {
                navigate(
                  loggedUser.role === "Admin" ? "../admin" : "../dashboard"
                )
              }}>
              Dashboard
            </span> */}
            <span
              className='small-nav-menu-items'
              onClick={() => {
                navigate("../contact-us")
              }}>
              Contact Us
            </span>
          </div>
          {loggedUser ? (
            <div className='col-12 px-0 nav-menu-small-profile-div'>
              <div className='col-12 nav-menu-small-profile'>
                <img
                  src={loggedUser.avatar}
                  alt=''
                  className='small-menu-profile-image'
                />
              </div>
              <div className='col-12 small-menu-profile-info px-0'>
                <h6 className='text-truncate mb-0 py-2 text-info'>
                  {" "}
                  {loggedUser.firstName} {loggedUser.lastName}
                </h6>

                <small className='py-2'>{loggedUser.email}</small>
                {loggedUser ? (
                  <button
                    className='btn btn-outline-info'
                    onClick={() => {
                      navigate(
                        loggedUser.role === "Admin"
                          ? "../admin"
                          : "../dashboard"
                      )
                    }}>
                    Go to dashboard
                  </button>
                ) : (
                  ""
                )}
                <button
                  className='btn btn-outline-info mt-3'
                  onClick={() => {
                    userLogOut()
                  }}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className='col-12 px-0 small-user-logout-div'>
              <div className='logout-item'>
                <AccountCircleIcon className='logout-icon' />
                <Link to='./login' className='mx-1'>
                  LOGIN
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default MyNavbar
