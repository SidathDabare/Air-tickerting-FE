/** @format */

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "../style/AdminDisplayComponent.css"
import { ResponsivePie } from "@nivo/pie"
import pieChart from "../data/pieChart.json"
import LoopIcon from "@mui/icons-material/Loop"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle"
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket"
import ReportIcon from "@mui/icons-material/Report"
import { format } from "date-fns"

const AdminDisplayComponent = () => {
  const admin = useSelector((state) => state.userReducer.loggedInUser)
  const token = useSelector((state) => state.userReducer.token)

  const [orders, setOrders] = useState([])
  // console.log(orders)
  const [users, setUsers] = useState([])

  const getOrders = async () => {
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }
    let url = `${process.env.REACT_APP_BE_URL}/orders`
    try {
      let res = await fetch(url, {
        method: "GET",
        headers,
      })
      let data = await res.json()
      //console.log(data)
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }
  const getUsers = async () => {
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }
    let url = `${process.env.REACT_APP_BE_URL}/users`
    try {
      let res = await fetch(url, {
        method: "GET",
        headers,
      })
      let data = await res.json()
      setUsers(data.users)
    } catch (error) {
      console.log(error)
    }
  }
  const chatData = [
    // {
    //   id: orders[0].createdAt
    //     ? format(new Date(orders[0].createdAt), "MMM do yyyy")
    //     : "0",
    //   label: orders[0].createdAt
    //     ? format(new Date(orders[0].createdAt), "MMM do yyyy")
    //     : "0",
    //   value: orders ? orders[0].data.flightOffers[0].price.total : "0",
    //   color: "hsl(323, 70%, 50%)",
    // },
    // {
    //   id: format(new Date(orders[1].createdAt), "MMM do yyyy"),
    //   label: format(new Date(orders[1].createdAt), "MMM do yyyy"),
    //   value: orders[1].data.flightOffers[0].price.total,
    //   color: "hsl(152, 70%, 50%)",
    // },
    // {
    //   id: format(new Date(orders[2].createdAt), "MMM do yyyy"),
    //   label: format(new Date(orders[2].createdAt), "MMM do yyyy"),
    //   value: orders[2].data.flightOffers[0].price.total,
    //   color: "hsl(65, 70%, 50%)",
    // },
    // {
    //   id: format(new Date(orders[3].createdAt), "MMM do yyyy"),
    //   label: format(new Date(orders[3].createdAt), "MMM do yyyy"),
    //   value: orders[3].data.flightOffers[0].price.total,
    //   color: "hsl(317, 70%, 50%)",
    // },
    // {
    //   id: format(new Date(orders[4].createdAt), "MMM do yyyy"),
    //   label: format(new Date(orders[4].createdAt), "MMM do yyyy"),
    //   value: orders[4].data.flightOffers[0].price.total,
    //   color: "hsl(271, 70%, 50%)",
    // },
    // {
    //   id: format(new Date(orders[0].createdAt), "MMM do yyyy"),
    //   label: format(new Date(orders[0].createdAt), "MMM do yyyy"),
    //   value: orders[0].data.flightOffers[0].price.total,
    //   color: "hsl(271, 70%, 50%)",
    // },
  ]
  useEffect(() => {
    getOrders()
    getUsers()
  }, [])

  return (
    <div className='admin-display-main'>
      <div className='admin-display-section01'>
        <div className='admin-display-items'>
          <div className='col-12 d-flex admin-display-items-section1'>
            <div className='col-6 px-0 d-flex align-items-center justify-content-between'>
              <MonetizationOnIcon className='admin-display-icon-big text-success' />
            </div>
            <div className='col-6 px-0 d-flex flex-column align-items-end justify-content-center text-success'>
              <p className='mb-0'>Revenue</p>
              <h4>
                {/* {orders.length} */}
                <span className='mr-1'>
                  {orders.length > 0
                    ? orders[0].data.flightOffers[0].price.currency
                    : "$"}
                </span>
                <span className='font-weight-bold text-truncate'>
                  {orders
                    ? orders
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
          <div className='col-12 admin-display-items-section2 text-right'>
            <span className='mx-1'>
              <LoopIcon />
            </span>
            <span>
              <small>Update Now</small>
            </span>
          </div>
        </div>
        <div className='admin-display-items'>
          <div className='col-12 d-flex admin-display-items-section1'>
            <div className='col-6 px-0 d-flex align-items-center justify-content-between'>
              <SupervisedUserCircleIcon className='admin-display-icon-big text-info' />
            </div>
            <div className='col-6 px-0 d-flex flex-column align-items-end justify-content-center text-info'>
              <p className='mb-0'>Users</p>
              <h4>{users ? users.length : "0"}</h4>
            </div>
          </div>
          <div className='col-12 admin-display-items-section2 text-right'>
            <span className='mx-1'>
              <LoopIcon />
            </span>
            <span>
              <small>Update Now</small>
            </span>
          </div>
        </div>
        <div className='admin-display-items'>
          <div className='col-12 d-flex admin-display-items-section1'>
            <div className='col-6 px-0 d-flex align-items-center justify-content-between'>
              <AirplaneTicketIcon className='admin-display-icon-big font-color' />
            </div>
            <div className='col-6 px-0 d-flex flex-column align-items-end justify-content-center font-color'>
              <p className='mb-0'>Orders</p>
              <h4>{orders ? orders.length : "0"}</h4>
            </div>
          </div>
          <div className='col-12 admin-display-items-section2 text-right'>
            <span className='mx-1'>
              <LoopIcon />
            </span>
            <span>
              <small>Update Now</small>
            </span>
          </div>
        </div>
        <div className='admin-display-items'>
          <div className='col-12 d-flex admin-display-items-section1'>
            <div className='col-6 px-0 d-flex align-items-center justify-content-between'>
              <ReportIcon className='admin-display-icon-big text-danger' />
            </div>
            <div className='col-6 px-0 d-flex flex-column align-items-end justify-content-center text-danger'>
              <p className='mb-0'>Errors</p>
              <h4>05</h4>
            </div>
          </div>
          <div className='col-12 admin-display-items-section2 text-right'>
            <span className='mx-1'>
              <LoopIcon />
            </span>
            <span>
              <small>Update Now</small>
            </span>
          </div>
        </div>
      </div>
      <div className='admin-display-section02'>
        <div className='col-12 d-flex justify-content-center py-2'>
          <h6>Last 5 orders</h6>
        </div>
        <div className='admin-display-section02-div1'>
          {orders ? (
            <>
              <ResponsivePie
                data={pieChart}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 0.2]],
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor='#333333'
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: "Mon",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "Tue",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "Wed",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "Thr",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "Fri",
                    },
                    id: "lines",
                  },
                  {
                    match: {
                      id: "Sat",
                    },
                    id: "lines",
                  },
                  {
                    match: {
                      id: "Sun",
                    },
                    id: "lines",
                  },
                ]}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "#000",
                        },
                      },
                    ],
                  },
                ]}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDisplayComponent
