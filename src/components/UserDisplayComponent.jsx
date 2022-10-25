/** @format */
import React from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"

const UserDisplayComponent = () => {
  const user = useSelector((state) => state.selectedUserReducer.selectedUser)
  return (
    <div className='user-display-div col-12'>
      {user ? (
        <div className='d-flex user-display-item-div'>
          {" "}
          <div className='col-12 col-md-6 px-0'>
            <img className='user-display-img' src={user.avatar} alt='' />
          </div>
          <div className='col-12 col-md-6 px-0'>
            <p>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </p>
            <p>
              <span>{user.email}</span>
            </p>
            <Button>Delete User</Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default UserDisplayComponent
