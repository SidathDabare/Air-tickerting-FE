/** @format */

import React from "react"
import { useSelector } from "react-redux"

const AdminDisplayComponent = () => {
  const admin = useSelector((state) => state.userReducer.loggedInUser)
  console.log(admin.lastName)
  return (
    <div>
      <h1>Dash</h1>
    </div>
  )
}

export default AdminDisplayComponent
