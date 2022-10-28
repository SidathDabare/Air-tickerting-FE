/** @format */
import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import OrderComponent from "../components/OrderComponent"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import CloseIcon from "@mui/icons-material/Close"
import "../style/UserDisplayComponent.css"
import Modal from "react-bootstrap/Modal"

const UserDisplayComponent = (props) => {
  const user = useSelector((state) => state.selectedUserReducer.selectedUser)
  const admin = useSelector((state) => state.userReducer)
  const [showDeleteUser, setShowDeleteUser] = useState(false)

  const handleClose = () => setShowDeleteUser(false)
  const handleShow = () => setShowDeleteUser(true)

  const deleteUser = async () => {
    let headers = {
      Authorization: `Bearer ${admin.token}`,
      "Content-type": "application/json",
    }
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/${user._id}`,
        {
          method: "DELETE",
          headers,
        }
      )
      console.log(res)
      handleClose()
      props.setShowDashboard(true)
      props.getAllUsers()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {" "}
      <div className='user-display-div'>
        {user ? (
          <div className='col-12 user-display-div-main'>
            <div className='user-display-section01 px-0'>
              <div className='col-12'>
                <div className='px-0 d-flex align-items-center justify-content-center'>
                  <img className='user-display-img' src={user.avatar} alt='' />
                </div>
              </div>
              <div className='col-12'>
                <div className='px-0 d-flex align-items-center justify-content-center'>
                  <div className='col-12 text-center'>
                    <h5 className='text-info'>
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </h5>
                    <p>
                      <span>{user.email}</span>
                    </p>
                    <Button
                      onClick={handleShow}
                      variant='outline-danger'
                      className='d-flex align-items-center justify-content-center mx-auto'>
                      <PersonOffIcon />
                      <span className='mx-1'>Delete User</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-0 user-display-section02'>
              <div className='col-12 '>
                <div className='col-12 py-1 border-bottom px-0'>
                  <h6>Perfomence</h6>
                </div>
                <div className='col-12 d-flex justify-content-around perfomence-content mt-3'>
                  <div className='perfomance-item01'>
                    <h6>Total trips</h6>
                    <br />
                    <h1 className='text-info'>{user.orders.length}</h1>
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
                      {user.orders
                        .map((element) =>
                          Number(element.data.flightOffers[0].price.total)
                        )
                        .reduce((a, b) => a + b, 0)
                        .toFixed(2)}
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
        <Modal show={showDeleteUser} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>Are sure to delete this user?</Modal.Title>
            <span onClick={props.onHide}>
              <CloseIcon onClick={handleClose} />
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className='col-12 col-sm-12 col-md-6 d-flex mx-auto'>
              <img className='user-display-img' src={user.avatar} alt='' />
              <div className='d-flex flex-column justify-content-center'>
                <h5 className='text-info'>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </h5>

                <p>
                  <span>{user.email}</span>
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>

            <Button variant='primary' onClick={deleteUser}>
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>
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
