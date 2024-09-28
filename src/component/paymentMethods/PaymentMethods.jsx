import { useState } from 'react';
import './PaymentMethods.scss';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getPaymentIntent } from '../../api';

const PaymentMethods = ({orders}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    const cardElement = elements.getElement(CardElement);

    const response = await getPaymentIntent(orders.tableId, orders.cart);

    const { clientSecret } = await response.json();

    // Confirm the payment
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (paymentResult.error) {
      setError(`Payment failed: ${paymentResult.error.message}`);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        setSuccess('Payment succeeded!');
      }
    }

    setLoading(false);
  };

  return (

    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>

    // <div className="payment-methods">
    //   <div className="method-upi">
    //     <h3>UPI</h3>
    //     <div>
    //       <button className='g-pay'/>
    //       <button className='pay-tm'/>
    //     </div>
    //   </div> 

    //   <div className="method-card">
    //     <h3>Card Payment</h3>
    //     <div className='card'>
    //       <div className='input-grp'>
    //         <label htmlFor="cardName">Name on card</label>
    //         <input type="text" id="cardName" placeholder="Name" />
    //       </div>
    //       <div className='input-grp'>
    //         <label htmlFor="cardNumber">Card number&nbsp;</label>
    //         <input type="text" id="cardNumber" placeholder="Number" />
    //       </div>
    //       <div className='input-grp'>
    //         <label htmlFor="expiry">Expiry date</label>
    //         <input type="text" id="expiry" placeholder="MM/YY" />
    //       </div>
    //       <div className='input-grp'>
    //         <label htmlFor="cvv">CVV</label>
    //         <input type="password" id="cvv" placeholder="CVV" />
    //       </div>
    //     </div>
    //   </div>
    //   <div className='payment_footer'>
    //     <button >Place Order</button>
    //   </div>

    // </div>
  );
};

export default PaymentMethods;
