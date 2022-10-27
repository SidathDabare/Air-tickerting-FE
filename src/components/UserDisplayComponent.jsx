/** @format */
import React from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import OrderComponent from "../components/OrderComponent"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import "../style/UserDisplayComponent.css"

const UserDisplayComponent = () => {
  const user = useSelector((state) => state.selectedUserReducer.selectedUser)
  const token = useSelector((state) => state.selectedUserReducer.token)

  const deleteUser = async () => {
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    }
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users/`, {
        method: "DELETE",
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {" "}
      <div className='user-display-div col-12'>
        {user ? (
          <div className='d-flex user-display-section01 col-12 px-0'>
            {" "}
            <div className='col-12 col-xs-12 col-md-3 px-0 d-flex align-items-center bg-info'>
              <img className='user-display-img' src={user.avatar} alt='' />
            </div>
            <div className='col-12 col-xs-12 col-md-9 px-0 d-flex align-items-center bg-success'>
              <div>
                <p>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </p>
                <p>
                  <span>{user.email}</span>
                </p>
                <Button
                  variant='outline-danger'
                  className='d-flex align-items-center'>
                  <PersonOffIcon />
                  <span className='mx-1'>Delete User</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* {user.orders.length > 0 ? (
          <div className='user-display-section02 col-12 px-0'>
            <div className='col-12 bg-light text-dark py-2 rounded-top mt-3 border-top'>
              <div className='col-12 d-flex justify-content-between text-light rounded-top'>
                <div className='col-12 d-flex justify-content-between align-items-center text-dark px-0'>
                  <h5>Done trips</h5>
                </div>
              </div>
            </div>

            <div className='col-12 text-dark d-flex rounded-bottom px-0 border'>
              <div className='col-12'>
                <div className='col-11 mx-auto d-flex py-2 border-bottom px-0'>
                  <div className='col-3 d-flex justify-content-center align-items-center'>
                    Destination
                  </div>
                  <div className='col-3 d-flex justify-content-center align-items-center'>
                    Date
                  </div>
                  <div className='col-3 d-flex justify-content-center align-items-center'>
                    Price
                  </div>
                  <div className='col-3 d-flex justify-content-center align-items-center'>
                    Action
                  </div>
                </div>
                <div className='users-orders-display'>
                  {user.orders &&
                    user.orders.map((order, i) => (
                      <OrderComponent key={i} order={order} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </>
  )
}

export default UserDisplayComponent
