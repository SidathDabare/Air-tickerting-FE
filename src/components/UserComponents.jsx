/** @format */

import React, { useEffect, useState } from "react"
import "../style/UserComponents.css"
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined"
import { format, parseISO } from "date-fns"
import { useDispatch, useSelector } from "react-redux"
import { selectedUser } from "../redux/actions"

const UserComponents = (props) => {
  const user = useSelector((state) => state.selectedUserReducer.selectedUser)

  const dispatch = useDispatch()
  useEffect(() => {}, [props])
  return (
    <div
      className={
        user._id === props.user._id
          ? "d-flex py-1 my-2 px-0 col-11 mx-auto user-item add-background"
          : "d-flex py-1 my-2 px-0 user-item col-11 mx-auto"
      }
      onClick={() => {
        dispatch(selectedUser(props.user))
      }}>
      <div className='col-12 d-flex px-0'>
        {/* <div className='col-1 px-0'>{props.i}</div> */}
        <div className='col-12 users-names-item'>
          <span className='ml-1'>{props.user.firstName}</span>
          <span className='mx-1 text-truncate'>{props.user.lastName}</span>
        </div>
      </div>
      {/* <div className='col-6 text-center'>
        {format(parseISO(props.user.createdAt), "qo MMM yy")}
      </div> */}
      {/* <div className='col-4 text-right'>
        <ClearOutlinedIcon className='text-danger mr-3' />
      </div> */}
    </div>
  )
}

export default UserComponents
