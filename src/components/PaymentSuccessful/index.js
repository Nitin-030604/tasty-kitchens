import {Link} from 'react-router-dom'

import './index.css'

const PaymentSuccessful = () => (
  <div className="payment-success-container">
    <img
      src="https://res.cloudinary.com/drykjbvie/image/upload/v1776066130/check-circle.1_1_gvkjhx.png"
      alt="payment success"
      className="payment-success-img"
    />
    <h1 className="payment-success-heading">Payment Successful</h1>
    <p className="payment-success-desc">
      Thank you for ordering Your payment is successfully completed.
    </p>
    <Link to="/" className="link-btn">
      <button type="button" className="payment-success-btn">
        Go To Home Page
      </button>
    </Link>
  </div>
)

export default PaymentSuccessful
