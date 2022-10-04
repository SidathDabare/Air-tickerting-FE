/** @format */

import React from "react"
//import FlightList from '../components/FlightList'
import HomeHeaderComponent from "../components/HomeHeaderComponent"
import Footer from "../components/Footer"
import MyNavbar from "../components/MyNavbar"
import SearchComponent from "../components/SearchComponent"
import "../style/HomePage.css"

const HomePage = () => {
  return (
    <div className='home-page'>
      <MyNavbar />
      <HomeHeaderComponent />
      <SearchComponent />
      <Footer />
    </div>
  )
}

export default HomePage
