/** @format */

import React from "react"
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () => {
  let isAuth = useSelector((state) => state.userReducer.token)
  return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
