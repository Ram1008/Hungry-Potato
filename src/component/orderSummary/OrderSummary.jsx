import { memo, useContext, useState } from 'react';
import './OrderSummary.scss';
import BillTemplate from '../billTemplate/BillTemplate';
import { toast } from 'react-toastify';
import { editTable} from '../../api';
import { managerContext } from '../../container';

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
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showBillPreview, setShowBillPreview] = useState(false);
  const [bill, setBill] = useState(null);
  const handlePaymentMethod = (method) => setPaymentMethod(method);
  const tableTotal = summaryDetail.orders.reduce((sum, item) => sum + item.totalAmount, 0);
  
  const {fetchOrders} = useContext(managerContext)
  const handlePayed = async () => {
    if (!name || !number || !paymentMethod || !amountPaid) {
      toast.error('Please fill out all fields', {
        autoClose: 2500,
      });
      return;
    }

    const counterPaymentDetails = {
      tableId: summaryDetail.orders[0].tableId._id,
      name: name,
      phone: number,
      method: paymentMethod,
      amountAfterDiscount: amountPaid,
    };
    try {
      const response = await deskPayment(counterPaymentDetails);
      if (response) {
        toast.success('Payment Successful!', {
          autoClose: 2500,
        });
        setBill(response.bill);
      }
    } catch (err) {
      toast.error('Payment failed. Please try again.', {
        autoClose: 2500,
      })
    }
  };

  const handleCompleteOrder = async () => {
    try {
      const response = await editTable(summaryDetail.orders[0].tableId._id, null, null, 'available');
      if (response) {
        toast.success('Order complete!', {
          autoClose: 2500,
        });
        fetchOrders();
        setShowSummary(false);
      }
    } catch (err) {
      toast.error('Failed to complete order.', {
        autoClose: 2500,
      });
    } 
  };

  return (
    <div className="ordersummary_container">
      {!showBillPreview ? (
        <>
          <div className="customer-info">
            <input
              type="text"
              placeholder="Name"
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Customer Name"
            />
            <input
              type="text"
              placeholder="Number"
              name='number'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              aria-label="Customer Phone Number"
            />
            <div className="total">Order Total - ${tableTotal}</div>
            <input
              type="number"
              placeholder="Amount Paid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              aria-label="Amount Paid"
            />
            <PaymentMethods
              selectedMethod={paymentMethod}
              handlePaymentMethod={handlePaymentMethod}
            />
            <button className="btn paid" onClick={handlePayed} >
              Mark Paid
            </button>

            <div className="btn-container">
              <button className="btn send-receipt" onClick={() => setShowBillPreview(true)} disabled={!bill}>
                Bill Preview
              </button>
            </div>

            <div className="action-buttons">
              <button className="btn mark-complete" onClick={handleCompleteOrder} disabled={!bill}>
                Mark Complete
              </button>
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
        </>
      ) : (
        <BillTemplate setShowBillPreview={setShowBillPreview} bill={bill} />
      )}
    </div>
  );
};

export default memo(OrderSummary);
