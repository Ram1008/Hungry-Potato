import './OrdersOnTable.scss';

const OrdersOnTable = ({ tableOrders }) => {
  console.log(tableOrders);
  const Dishes = [];
  tableOrders.map((item) => {
    item.order.map((dish) => {
      Dishes.push(dish);
    })
  })
  
  return (
       <div className="orders-content-wrapper">
        <div className="table-id">
          Table ID: {tableOrders[0].tableId}
        </div>
        <div className="orders-content">
          {
            Dishes.map((item) => (
              <div key={item._id} className="cart-item">
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
          } 
        </div>
        
      </div>
    );
};

export default OrdersOnTable;
