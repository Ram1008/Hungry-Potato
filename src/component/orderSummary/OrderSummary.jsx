import React, { useContext, useState } from 'react';
import './OrderSummary.scss';
import managerContext from '../../container/manager/managerContext';

const PaymentMethods = ({ selectedMethod, handlePaymentMethod }) => (
  <div className="payment_methods">
    {['Cash', 'UPI', 'Card'].map((method) => (
      <label key={method}>
        {method}
        <input
          type="radio"
          name="payment"
          value={method}
          checked={selectedMethod === method}
          onChange={() => handlePaymentMethod(method)}
        />
      </label>
    ))}
  </div>
);

const OrderSummary = ({ summaryDetail, setShowSummary }) => {

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [amountPaid, setAmountPaid] = useState();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bill, setBill] = useState(null);
  const { deskPayment } = useContext(managerContext);
  const handlePaymentMethod = (method) => setPaymentMethod(method);
  const tableTotal = summaryDetail.orders.reduce((sum, item) => sum + item.totalAmount, 0);

  const handlePayed = async () =>{
    const counterPaymentDetails = {
      name:name,
      number:number,
      paymentMethod:paymentMethod,
      amountPaid:amountPaid
    }
    const response = await deskPayment(counterPaymentDetails);
    if(response){
      setBill(response);
    }
  } 

  return (
    <div className="ordersummary_container">
      <div className="customer-info">
      <input
    type="text"
    placeholder="Name"
    name='name'
    value={name || ''}
    onChange={(e) => setName(e.target.value)}
  />
  <input
    type="text"
    placeholder="Number"
    name='number'
    value={number || ''}
    onChange={(e) => setNumber(e.target.value)}
  />
  <div className="total">Order Total - ${tableTotal}</div>
  <input
    type="number"
    placeholder="Amount Paid"
    value={amountPaid || ''}
    onChange={(e) => setAmountPaid(Number(e.target.value))}
  />
        
        <PaymentMethods
          selectedMethod={paymentMethod}
          handlePaymentMethod={handlePaymentMethod}
        />

        <button className="btn paid" onClick={() => handlePayed()}>Mark Paid</button>

        <div className="btn-container">
          <button className="btn send-receipt" disabled={bill === null? true: false}>Send Receipt</button>
          <button className="btn print-receipt" disabled={bill === null? true: false}>Print Receipt</button>
        </div>

        <div className="action-buttons">
          <button className="btn mark-complete" disabled={bill === null? true: false} >Mark Complete</button>
          <button className="btn back" onClick={() => setShowSummary(false)}>Back</button>
        </div>
      </div>

      <div className="orders">
        <h2>Orders on Table - {summaryDetail?.tableNumber}</h2>
        {summaryDetail?.orders?.map((item, idx) => (
          <div key={idx} className="order-item">
            {item.dishes.map((dish, idx) => (
              <div key={idx} className="dish-item">
                <div>{dish.name} - ${dish.price}</div>
                <div>Qty: {dish.quantity} - {dish.servingSize}</div>
                {dish.addons.length > 0 && <div>Addons: {dish.addons.map((addon, index) =>{
                    <div key ={index}>{addon.name} - ${addon.price}</div>
                })}</div>}
              </div>
            ))}
          </div>
        ))}
        <div className="total">Total - ${tableTotal}</div>
      </div>
    </div>
  );
}

export default OrderSummary;
