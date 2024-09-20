import React, { memo} from 'react';
import './OrderCard.scss';

const OrderCard = ({ order, markComplete = null }) => {

  const handleMarkComplete =() => {
    if (markComplete) {
      markComplete(order._id);
    }
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <span className="table-no">Table: {order.tableNumber}</span>
        {(order.status === 'pending' || order.status === 'preparing') && (
          <button onClick={handleMarkComplete} className="complete-btn">
            Mark complete
          </button>
        )}
      </div>
      <div className="order-details">
        {order.dishes.map((dish, idx) => (
          <div key={idx} className="order-dish">
            
              <h2>{dish.name}</h2>
              <div className="quantity">X {dish.quantity} - {dish.servingSize}</div>
              <div className="serving-size"></div>
            
            <div className="addons">
              {dish.addons.map((addon, index) => (
                <p key={index}>{addon.name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <textarea
        value={order.message || 'Message for cook'}
        readOnly
      />
    </div>
  );
};

export default memo(OrderCard);
