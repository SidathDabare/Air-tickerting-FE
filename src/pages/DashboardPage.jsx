/** @format */

import { format, parseISO } from "date-fns"
import React, { useEffect } from "react"
import { useState } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import MyNavbar from "../components/MyNavbar"
import "../style/DashboardPage.css"

const DashboardPage = () => {
  const loggedUser = useSelector((state) => state.userReducer.loggedInUser)
  const token = useSelector((state) => state.userReducer.token)

  const [orders, setOrders] = useState([])

  const getOrdersData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BE_URL}/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        setOrders([...data])
      } else {
        console.log("ORDER ERROR")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrdersData()
    console.log(orders)
  }, [])
  return (
    <div>
      <MyNavbar />
      <Container className='w-100 h-100 bg-info'>
        <div className='col-12 bg-info d-flex p-3'>
          <div className='col-3 d-flex justify-content-between align-items-center'>
            <img className='dashboard-avatar' src={loggedUser.avatar} alt='' />
          </div>
          <div className='col-6'>
            <p>
              <span> {loggedUser.firstName}</span>
              <span> {loggedUser.lastName}</span>
            </p>
            <p>
              <span> {loggedUser.email}</span>
            </p>
            <p>
              <span> {loggedUser.firstName}</span>
              <span> {loggedUser.lastName}</span>
            </p>
          </div>
          <div className='col-3'></div>
        </div>
        <div className='col-12 bg-success'>
          {orders
            ? orders.map((order, i) => (
                <div key={i}>
                  <span> {order.email} </span>
                  <span>{format(parseISO(order.createdAt), "Pp")}</span>
                </div>
              ))
            : ""}
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default DashboardPage
