import './ordersOnTable.scss';

const OrdersOnTable = ({ tableOrders }) => {
  return (
    <div className="tableOrder-container">
      <input type="checkbox" id="faq-1" className="toggle" />
      <h1>
        <label htmlFor="faq-1" className="toggle-label">Orders</label>
      </h1>
      <div className="orders-content-wrapper">
        <div className="orders-content">
          {tableOrders.map((tableOrder) =>
            tableOrder.order.map((item) => (
              <div key={item.dishId} className="cart-item">
                <div className="item-detail">
                  <div className="item-header">
                    <span className="item-name">Chicken Burger</span>
                    <span className="item-quantity">X {item.quantity}</span>
                  </div>
                  <div className="item-serving-size">Small</div>
                  <div className="item-addons">
                    {item.addons.map((addon, index) => (
                      <span key={index} className="addon-name">Coke</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="table-id">
          Table ID: {tableOrders.tableId}
        </div>
      </div>
    </div>
  );
};

export default OrdersOnTable;
