import React, { memo } from 'react';
import './OrdersOnTable.scss';

const OrdersOnTable = ({ tableOrders }) => {

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  return (
    <div className="tableOrders_container">
      <h1>Orders on your table</h1>
      <div className="orders-content">
        {tableOrders.map((item, idx) => (
          <div key={idx} className="cart-item">
            {item.dishes.map((dish, index) => (
              <div key={index} className="item-detail">
                <div className="item-header">
                  <span className="item-name">{dish.name}</span>
                  <span className="item-status">{capitalizeFirstLetter(item.status)}</span>
                </div>
                <div className="item-body">
                <div className="item-serving-size">{dish.servingSize}</div>
                  <span className="item-quantity">X {dish.quantity}</span>
                </div>
                <div className="item-addons">
                  {dish.addons.map((addon) => (
                    <span key={addon.name} className="addon-name">{addon.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(OrdersOnTable);
