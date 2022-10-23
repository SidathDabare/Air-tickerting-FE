/** @format */
import React from "react"
import { useSelector } from "react-redux"

const UserDisplayComponent = () => {
  const user = useSelector((state) => state.selectedUserReducer.selectedUser)
  return (
    <div>
      <img src={user.avatar} alt='' />
    </div>
  )
}

export default UserDisplayComponent
