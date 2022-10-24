/** @format */

import React from "react"
import "../style/UserComponents.css"
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined"
import { format, parseISO } from "date-fns"
import { useDispatch } from "react-redux"
import { selectedUser } from "../redux/actions"

const UserComponents = (props) => {
  const dispatch = useDispatch()
  return (
    <div
      className='d-flex py-1 my-2 user-item'
      onClick={() => {
        dispatch(selectedUser(props.user))
      }}>
      <div className='col-12'>
        <span>{props.i}</span>
        <span className='ml-2'>{props.user.firstName}</span>
        <span className='mx-1'>{props.user.lastName}</span>
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
