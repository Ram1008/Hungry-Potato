import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrderSummary.scss';
import BillTemplate from '../billTemplate/BillTemplate';
import { toast } from 'react-toastify';
import { editTable } from '../../api';

const PaymentMethods = ({ selectedMethod, handlePaymentMethod }) => (
  <div className="payment_methods">
    {['cash', 'upi', 'card'].map((method) => (
      <label key={method}>
        {method.toUpperCase()}
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

const OrderSummary = ({ summaryDetail, setShowSummary, deskPayment }) => {
  
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [amountPaid, setAmountPaid] = useState();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showBillPreview, setShowBillPreview] = useState(false)
  const [bill, setBill] = useState(null);
  const handlePaymentMethod = (method) => setPaymentMethod(method);
  const tableTotal = summaryDetail.orders.reduce((sum, item) => sum + item.totalAmount, 0);
  
  const billTemplateRef = useRef();

  const handlePayed = async () =>{
    console.log(summaryDetail);
    const counterPaymentDetails = {
      tableId: summaryDetail.orders[0].tableId._id,
      name:name,
      phone:number,
      method:paymentMethod,
      amountAfterDiscount:amountPaid
    }
    const response = await deskPayment(counterPaymentDetails);
    if(response){
      toast.success('Payment Successful!', {
        autoClose: 2500,
      });
      setBill(response.bill);
    }
  } 

  

  const handleCompleteOrder = async () =>{
    const response = await editTable(summaryDetail.orders[0].tableId._id, null, null, 'available');
    if(response){
      toast.success('Order complete!', {
        autoClose: 2500,
      });
    }
  }

  return (
    <div className="ordersummary_container">
      {!showBillPreview ?<>
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
            <button className="btn send-receipt" onClick={() => setShowBillPreview(true)} disabled={bill === null? true: false}>Bill Preview</button>
          </div>

          <div className="action-buttons">
            <button className="btn mark-complete" onClick={() => handleCompleteOrder()} disabled={bill === null? true: false} >Mark Complete</button>
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
                  {dish.addons.length > 0 && (
                    <div>Addons: {dish.addons.map((addon, index) => (
                      <div key={index}>{addon.name} - ${addon.price}</div>
                    ))}</div>
                  )}

                </div>
              ))}
            </div>
          ))}
          <div className="total">Total - ${tableTotal}</div>
        </div>
      </>: <BillTemplate setShowBillPreview={setShowBillPreview} bill={bill} />}
    </div>
  );
}

export default OrderSummary;
