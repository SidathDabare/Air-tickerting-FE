/** @format */
import "../style/MyNavbar.css"
import React, { useEffect } from "react"
import { Container, Button, Dropdown, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import { setLoggedInUserAction, setTokenAction } from "../redux/actions"

const MyNavbar = () => {
  const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const navSlide = () => {
    const toggleBtn = document.querySelector(".toggle-btn")
    const navDiv = document.querySelector(".nav-center-div")
    const navDivLinks = document.querySelectorAll(".nav-center-div a")
    // toggle nav -------------
    toggleBtn.addEventListener("click", () => {
      navDiv.classList.toggle("nav-links-active")
      //animation btn------------------
      toggleBtn.classList.toggle("toggle-btn-animate")

      // animate links -------------
      navDivLinks.forEach((link, index) => {
        //link.classList.add("nav-links-animation")
        // if (link.style.animation) {
        //     link.style.animation = ""
        // } else {
        //     link.style.animation = `navLinksFade 0.5s ease forwords ${index / 7 + 1}s`
        // }
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.classList.add("nav-links-animation")
        }
      })
    })
  }
  const userLogOut = () => {
    dispatch(setTokenAction(""))
    dispatch(setLoggedInUserAction(""))

    //navigate("/login")
  }
  useEffect(() => {
    navSlide()
  }, [])

  return (
    <div className='nav-div'>
      <Container className='d-flex justify-content-between align-items-center nav-container'>
        <div className='nav-left-div'>
          <h4>TICKETING </h4>
          <span className='pb-2 ml-2'>
            <FlightTakeoffSharpIcon />
          </span>
        </div>
        <div className='nav-center-div'>
          <div className='toggle-btn-div pt-4'>
            {loggedUser ? (
              <div className='profile-div'>
                <img src={loggedUser.avatar} alt='' className='profile-image' />
              </div>
            ) : (
              ""
            )}

            <div className='text-white d-flex align-items-center justify-content-right'>
              <p className='mb-0 ml-3'>
                {loggedUser ? (
                  <span>
                    Welcome, {loggedUser.firstName} {loggedUser.lastName}
                    <Button
                      className='py-1 ml-3'
                      variant='outline-warning'
                      onClick={() => {
                        userLogOut()
                      }}>
                      <LogoutOutlinedIcon />
                      <span className='ml-1'>Log out</span>
                    </Button>
                  </span>
                ) : (
                  <Button
                    variant='outline-primary'
                    onClick={() => {
                      navigate("../login")
                    }}>
                    Log In
                  </Button>
                )}
              </p>
            </div>
          </div>

          <Link to='/'>Home</Link>
          <Link to='/'>About</Link>
          <Link to='/'>Tickets</Link>
          <Link to='/'>Travels</Link>
          <Link to='/'>
            <span>More</span>
            <span className='mb-n1 ml-1'>
              <i className='bi bi-chevron-down  down-btn'></i>
            </span>
          </Link>
        </div>
        <div className='nav-right-div d-flex align-items-center justify-content-right'>
          {loggedUser ? (
            <div className='profile-div mr-2'>
              <img src={loggedUser.avatar} alt='' className='profile-image' />
            </div>
          ) : (
            ""
          )}
          <div className='text-white'>
            <p className='mb-0'>
              {loggedUser ? (
                <span>
                  {loggedUser.firstName} {loggedUser.lastName}
                </span>
              ) : (
                <Button
                  variant='outline-primary'
                  onClick={() => {
                    navigate("../login")
                  }}>
                  Log In
                </Button>
              )}
            </p>
          </div>
          <Dropdown>
            {loggedUser ? (
              <Dropdown.Toggle
                split
                variant='tranparent'
                id='dropdown-basic'
                className='text-white pb-0'
              />
            ) : (
              " "
            )}
            {loggedUser ? (
              <Dropdown.Menu className='nav-drop-menu'>
                <Container>
                  <div className='mt-3 col-12 border-bottom'>
                    <h5 className='mb-0 py-0'>
                      Welcome to TICKERTING skywards
                    </h5>
                    <br></br>
                    <p className=''>
                      Mr {loggedUser.firstName} {loggedUser.lastName}
                    </p>
                  </div>
                  <div className='col-12'>
                    <div className='col-7'>
                      {/* <Dropdown.Item>
                        <Link to='/dashboard'>
                          Hello,{loggedUser.firstName} {loggedUser.lastName}
                        </Link>
                      </Dropdown.Item> */}
                      <Dropdown.Item>
                        <Link
                          to={
                            loggedUser.role === "Admin"
                              ? "/admin"
                              : "/dashboard"
                          }>
                          Dashboard
                        </Link>
                      </Dropdown.Item>

                      <div className='px-2'>
                        {loggedUser ? (
                          <Button
                            className='btn-block mt-2'
                            variant='outline-primary'
                            onClick={() => {
                              userLogOut()
                            }}>
                            Log out
                          </Button>
                        ) : (
                          <Button
                            className='btn-block mt-2'
                            variant='outline-primary'
                            onClick={() => {
                              navigate("../login")
                            }}>
                            Log In
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className='col-3'></div>
                  </div>
                </Container>
              </Dropdown.Menu>
            ) : (
              ""
            )}
          </Dropdown>
        </div>
        <div className='toggle-btn'>
          <div className='line1'></div>
          <div className='line2'></div>
          <div className='line3'></div>
        </div>
      </Container>
    </div>
  )
}

export default MyNavbar
