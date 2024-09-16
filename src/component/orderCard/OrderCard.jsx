import './OrderCard.scss';

const OrderCard = ({ order, markComplete = null }) => {

    const handleMarkComplete = () =>{
      markComplete && markComplete(order._id);
    }

  return (
    <div className="order-card">
      <div className="order-header">
        <span className="table-no">{order.tableNumber}</span>
        {order.status === 'pending' ||  order.status === 'preparing' ?
        <button onClick={handleMarkComplete} className="complete-btn">Mark complete</button>
      : <></>}
      </div>
          <div className="order-details" >
            {order.order.map((dish, idx)=>(
              <div key={idx} className='order-dish'>
                  <div className='dish-detail'>
                    <h2>{dish.name}</h2>
                    <div className='quantity'>X {dish.quantity}</div>
                    <div className='serving-size'>{dish.servingSize}</div>
                  </div>
                  <div className="addons">
                    {dish.addons.map((addon, index) => (
                      <p key={index}>{addon.name}</p>
                    ))}
                  </div>
                  <textarea
                    value={order.message || 'Message for cook'}
                    readOnly
                  />
                  </div>
              ))
            }
            </div>
    </div>
  );
};

export default OrderCard;
