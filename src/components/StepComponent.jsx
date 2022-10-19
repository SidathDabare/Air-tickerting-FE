/** @format */

import React from "react"
import "../style/StepComponent.css"

const StepComponent = (props) => {
  //console.log(props)
  return (
    <div className='py-2 step-container-main mt-1'>
      <div className='d-flex col-12'>
        <h3>Make a booking</h3>
      </div>
      <div className='d-flex col-12 justify-content-between'>
        <div className='step-container'>
          <div className='d-flex align-items-end'>
            <h1
              className={
                props.ticketSelect ? "mb-0 ml-2 text-success" : "mb-0 ml-2"
              }>
              1
            </h1>
            <small
              className={
                props.ticketSelect ? "mb-1 ml-2 text-success" : "mb-1 ml-2"
              }>
              Fights
            </small>
          </div>
          <div
            className={
              props.ticketSelect
                ? "active bg-success"
                : "passenger-empty-div mr-1"
            }></div>
        </div>
        <div className='step-container'>
          <div className='d-flex align-items-end'>
            <h1
              className={
                props.passenger ? "mb-0 ml-2 text-success" : "mb-0 ml-2"
              }>
              2
            </h1>
            <small
              className={
                props.passenger ? "mb-1 ml-2 text-success" : "mb-1 ml-2"
              }>
              Passengers
            </small>
          </div>
          <div
            className={
              props.passenger ? "active bg-success" : "passenger-empty-div"
            }></div>
        </div>
        <div className='step-container'>
          <div className='d-flex align-items-end'>
            <h1
              className={props.option ? "mb-0 ml-2 text-success" : "mb-0 ml-2"}>
              2
            </h1>
            <small
              className={props.option ? "mb-1 ml-2 text-success" : "mb-1 ml-2"}>
              options
            </small>
          </div>
          <div
            className={
              props.option ? "active bg-success" : "passenger-empty-div"
            }></div>
        </div>
        <div className='step-container'>
          <div className='d-flex align-items-end'>
            <h1
              className={
                props.payment ? "mb-0 ml-2 text-success" : "mb-0 ml-2"
              }>
              4
            </h1>
            <small
              className={
                props.payment ? "mb-1 ml-2 text-success" : "mb-1 ml-2"
              }>
              payment
            </small>
          </div>
          <div
            className={
              props.payment ? "active bg-success" : "passenger-empty-div"
            }></div>
        </div>
        <div className='step-container'>
          <div className='d-flex align-items-end'>
            <h1
              className={
                props.confirm ? "mb-0 ml-2 text-success" : "mb-0 ml-2"
              }>
              5
            </h1>
            <small
              className={
                props.confirm ? "mb-1 ml-2 text-success" : "mb-1 ml-2"
              }>
              Completed
            </small>
          </div>
          <div
            className={
              props.confirm ? "active bg-success" : "passenger-empty-div"
            }></div>
        </div>
      </div>
    </div>
  )
}

export default StepComponent
