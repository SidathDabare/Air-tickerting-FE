/** @format */

import React from "react"
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const AdminOnlyRoutes = () => {
  let isAdmin = useSelector((state) => state.userReducer.loggedInUser.role)
  return isAdmin === "Admin" ? <Outlet /> : <Navigate to='/unauthorized' />
}

export default AdminOnlyRoutes
