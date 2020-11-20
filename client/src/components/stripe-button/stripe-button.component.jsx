import React from 'react';
import StripCheckout from 'react-stripe-checkout';
import axios from 'axios'

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_0MFpBurp8AFreNxlQdSBlNYM005BdQXG28';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(res => {
      alert('Payment successful')
    }).catch(err => {
      console.log('Payment error: ', JSON.parse(err));
      alert('There was an issue with your payment. Please make sure you use the provided credit card')
    })
  }

  return (
    <StripCheckout
      label='Pay Now'
      name='CRWN Cloting Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;