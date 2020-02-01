import React from 'react';
import StripCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_live_cte8CTe3Iw3bKXtzW2RNmPLA00Vj2hB2Wb';

  const onToken = token => {
    console.log(token);
    alert('Payment Sucessful')
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