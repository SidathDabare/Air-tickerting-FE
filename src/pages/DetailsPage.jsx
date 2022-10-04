/** @format */

import React, { useEffect, useState } from "react"
import DetailsComponent from "../components/DetailsComponent"
import MyNavbar from "../components/MyNavbar"
import Footer from "../components/Footer"

const DetailsPage = () => {
  return (
    <div>
      <MyNavbar />
      <DetailsComponent />
      <Footer />
    </div>
  )
}

export default DetailsPage
