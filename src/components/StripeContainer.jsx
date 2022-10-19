/** @format */

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React, { useEffect } from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = process.env.REACT_APP_PUBLISHABLE_KEY

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = (props) => {
  useEffect(() => {}, [props])
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm setPayment={props.setPayment} setLoader={props.setLoader} />
    </Elements>
  )
}
export default StripeContainer
