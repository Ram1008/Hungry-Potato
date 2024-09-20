import React, { memo } from 'react';
import './OrdersOnTable.scss';

const OrdersOnTable = ({ tableOrders }) => {
  const Dishes = tableOrders.flatMap(item => item.order);

  return (
    <div className="orders-content-wrapper">
      <div className="table-id">
        Orders on your table
      </div>
      <div className="orders-content">
        {Dishes.map((item, idx) => (
          <div key={idx} className="cart-item">
            <div className="item-detail">
              <div className="item-header">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">X {item.quantity}</span>
              </div>
              <div className="item-serving-size">{item.servingSize}</div>
              <div className="item-addons">
                {item.addons.map((addon) => (
                  <span key={addon.name} className="addon-name">{addon.name}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(OrdersOnTable);
