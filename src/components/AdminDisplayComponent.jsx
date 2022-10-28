/** @format */

import React from "react"
import { useSelector } from "react-redux"

const AdminDisplayComponent = () => {
  const admin = useSelector((state) => state.userReducer.loggedInUser)
  console.log(admin.lastName)
  return (
    <>
      {admin.lastName ? (
        <div className='col-12 user-display-div-main'>
          <div className='user-display-section01 px-0'>
            <div className='col-12'>
              <div className='px-0 d-flex align-items-center justify-content-center'>
                <img className='user-display-img' src={admin.avatar} alt='' />
              </div>
            </div>
            <div className='col-12'>
              <div className='px-0 d-flex align-items-center justify-content-center'>
                <div className='col-12 text-center'>
                  <h5 className='text-info'>
                    <span>
                      {admin.firstName} {admin.lastName}
                    </span>
                  </h5>
                  <p>
                    <span>{admin.email}</span>
                  </p>
                  {/* <Button
                      onClick={deleteUser}
                      variant='outline-danger'
                      className='d-flex align-items-center justify-content-center mx-auto'>
                      <PersonOffIcon />
                      <span className='mx-1'>Delete User</span>
                    </Button> */}
                </div>
              </div>
            </div>
          </div>
          <div className='px-0 user-display-section02'>
            <div className='col-12 '>
              <div className='col-12 py-1 border-bottom '>
                <h5>Edit Profile</h5>
              </div>
              <div className='col-12 d-flex justify-content-around perfomence-content mt-3'>
                <div className='perfomance-item01'>
                  <h6>Total trips</h6>
                  <br />
                  {/* <h1 className='text-info'>{admin.orders.length}</h1> */}
                </div>
                <div className='perfomance-item02'>
                  <h6>Total payment</h6>
                  <br />
                  <h1 className='text-success'>
                    {/* {user.orders
                        .map((a) => Number(a.data.flightOffers[0].price.total))
                        .reduce(function (a, b) {
                          let sum = a + b
                          return Number(sum).toFixed(2)
                        })} */}
                    {/* {admin.orders
                      .map((element) =>
                        Number(element.data.flightOffers[0].price.total)
                      )
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)} */}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4>Please Select User...</h4>
        </div>
      )}
    </>
  )
}

export default AdminDisplayComponent
