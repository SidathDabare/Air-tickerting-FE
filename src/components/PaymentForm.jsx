/** @format */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import "../style/PaymentForm.css"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { useNavigate } from "react-router-dom"

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
}

export default function PaymentForm(props) {
  const bookedTicket = useSelector(
    (state) => state.bookedTicketReducer.bookedTicket
  )

  // console.log(bookedTicket.data.flightOffers[0].price.total)
  // console.log(parseInt(bookedTicket.data.flightOffers[0].price.total))

  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    if (!error) {
      try {
        const { id } = paymentMethod
        const response = await axios.post(
          `${process.env.REACT_APP_BE_URL}/payment`,
          {
            amount: parseInt(
              bookedTicket.data.flightOffers[0].price.total * 100
            ),
            id,
          }
        )

        if (response.data.success) {
          console.log("Successful payment")
          setSuccess(true)
          props.setPayment(true)
        }
      } catch (error) {
        console.log("Error", error)
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <>
      {!success ? (
        <form>
          <div className='d-flex justify-content-center mt-5'>
            <h5>
              <span>Price : </span>
              <span>{bookedTicket.data.flightOffers[0].price.currency}</span>
              <span> {bookedTicket.data.flightOffers[0].price.total}</span>
            </h5>
          </div>

          <div className='mt-3'>
            <fieldset className='FormGroup'>
              <div className='FormRow'>
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
          </div>

          <div className='d-flex justify-content-center'>
            <Button className='col-6 mx-auto' onClick={handleSubmit}>
              Pay Now
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className='d-flex justify-content-center align-items-center mt-5'>
            <h4 className='mb-0'>Payment Succesfull..!</h4>
            <CheckCircleOutlineIcon
              className='text-success ml-2'
              style={{ fontSize: "25px" }}
            />
          </div>
          <div className='d-flex justify-content-center mt-3'>
            <Button onClick={() => navigate("/booking-details")}>
              Proceed
            </Button>
          </div>
        </>
      )}
    </>
  )
}
