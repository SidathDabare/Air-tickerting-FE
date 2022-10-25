/** @format */

import React from "react"
import { Container } from "react-bootstrap"

const PermissionDenied = () => {
  return (
    <Container
      className='d-flex justify-content-center align-items-center text-danger bg-light'
      style={{ height: "100vh", width: "100%" }}>
      <h3>Unauthorized</h3>
    </Container>
  )
}

export default PermissionDenied
