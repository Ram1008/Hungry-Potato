import './orderCard.scss';

const OrderCard = ({ order }) => {

    const handleMarkComplete = () =>{

    }

  return (
    <div className="order-card">
      <div className="order-header">
        <h2>{order.name}</h2>
        <span className="table-no">{order.tableNo}</span>
      </div>
      <div className="order-details">
        <p className="serving-size">{order.servingSize}</p>
        <span className="quantity">{order.quantity.toString().padStart(2, '0')}</span>
      </div>
      <div className="addons">
        {order.addons.map((addon, index) => (
          <p key={index}>{addon}</p>
        ))}
      </div>
      <textarea
        value={order.message || 'Message for cook'}
        readOnly
      />
      {order.isPending && (
        <button onClick={handleMarkComplete} className="complete-btn">Mark complete</button>
      )}
    </div>
  );
};

export default OrderCard;
