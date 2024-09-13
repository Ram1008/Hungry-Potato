import './OrderCard.scss';

const OrderCard = ({ order }) => {

    const handleMarkComplete = () =>{

    }

  return (
    <div className="order-card">
      <div className="order-header">
        <span className="table-no">{order.tableNo}</span>
        {order.isPending && (
        <button onClick={handleMarkComplete} className="complete-btn">Mark complete</button>
      )}
      </div>
          <div className="order-details" >
            {order.dishes.map((dish)=>(
              <div key={dish._id} className='order-dish'>
                  <div className='dish-detail'>
                    <h2>{dish.name}</h2>
                    <div className='quantity'>X {dish.quantity}</div>
                    <div className='serving-size'>{dish.servingSize}</div>
                  </div>
                  <div className="addons">
                    {dish.addons.map((addon, index) => (
                      <p key={index}>{addon}</p>
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
