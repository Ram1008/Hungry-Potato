import './PaymentMethods.scss';

const PaymentMethods = ({ onClose }) => {
  return (
    <div className="payment-methods">
      <div className="payment-backdrop" onClick={() => onClose()} />
      <div className="method-upi">
        <h3>UPI</h3>
        <div>
          <button className='g-pay'/>
          <button className='pay-tm'/>
        </div>
      </div> 

      <div className="method-card">
        <h3>Card Payment</h3>
        <div className='card'>
          <div className='input-grp'>
            <label htmlFor="cardNumber">Name on card</label>
            <input type="text" id="cardNumber" placeholder="Name" />
          </div>
          <div className='input-grp'>
            <label htmlFor="cardNumber">Card number&nbsp;</label>
            <input type="text" id="cardNumber" placeholder="Number" />
          </div>
          <div className='input-grp'>
            <label htmlFor="expiry">Expiry date</label>
            <input type="text" id="expiry" placeholder="MM/YY" />
          </div>
          <div className='input-grp'>
            <label htmlFor="cvv">CVV</label>
            <input type="password" id="cvv" placeholder="CVV" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default PaymentMethods;
