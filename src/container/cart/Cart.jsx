import './Cart.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { orderContext, dishContext } from '../../context';

const Cart = () => {
  const navigate = useNavigate();
  const { placeOrder, cart, tableId } = useContext(orderContext);
  const { dishes } = useContext(dishContext);

  const handleBackToOrders = () => navigate(-1);

  const total = cart.reduce((sum, item) => {
    
    const dish = dishes.find((dish) => dish._id === item.dishId);
            const servingSize = dish.servingSize.find((ss) => ss._id === item.servingSize);
            const quantity = item.quantity;
            const addons = item.addons.map(tag => dish.addons.find((addon) => addon._id === tag)) || [];
            const addOnCost = addons.reduce((acc, addon) => acc + addon.price, 0);
            const itemTotal = (quantity * servingSize.price) + addOnCost;
    return Math.round(sum + itemTotal);
  }, 0);

  const handlePlaceOrder = async()=>{
    const response = await placeOrder(tableId, cart);
      if (response.status) {
        navigate('/')
      }
  }
  const handlePayment = () =>{
    
  }
  return (
    <div className="cart-container">
      <header className='cart-head'>
        <div className='cart-logo'></div>
        <div className='cart-menu'>
          <button onClick={handleBackToOrders}>Back to menu</button>
        </div>
      </header>
     { cart && <div className='cart-body'>
        
        <h1 className='cart-body-heading'>Cart</h1>
        
        <div className='cart-summary'>
          {cart.map((item, idx) => {
            const dish = dishes.find((dish) => dish._id === item.dishId);
            const servingSize = dish.servingSize?.find((ss) => ss._id === item.servingSizeId)||dish.servingSize[0];
            const quantity = item.quantity;
            const addons = item.addons.map(tag => dish.addons.find((addon) => addon._id === tag)) || [];
            const addOnCost = addons.reduce((acc, addon) => acc + addon.price, 0);
            const itemTotal = (quantity * servingSize.price || 0) + addOnCost;

            return (
              <div key={idx} className='cart-items'>
                <div className='item-detail'>
                  <div ><span style={{fontSize:'20px', fontWeight:'bold'}}>{dish.name}</span> <span style={{fontSize:'18px', color:'#3A3A3A', marginLeft:"1rem"}}>X</span><span style = {{color:'#3A3A3A', margin: ' 0 0.5rem'}}>{quantity}</span></div>
                  <div ><span style={{fontSize:'14px'}}>{servingSize.size}</span></div>
                  <div>
                    {addons.map(addon => (
                      <span key={addon._id} className='addon-name' >
                        {addon.name}
                      </span>
                    ))}
                </div>
                </div>
                <div className='item-price'>₹ {itemTotal}</div>
              </div>
            );
          })}
          <div className='cart-total'>
            <div style={{ fontWeight: '500' }}>Total</div>
            <span className='item-price'>₹ {total}</span>
          </div>
        </div>
        <div className='cart-actions'>
          <div className='cart-paymentMethod'>
            <button onClick={handlePayment}>
              <div>Payment methods</div>
              <div>→</div>
            </button>
          </div>
          <div className='cart-payLater'>
            <button onClick={handlePlaceOrder}>
              <div >Place Order</div>
              <div >Pay later</div>
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Cart;
