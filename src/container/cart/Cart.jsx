import './cart.scss';
import { useContext, useState } from 'react';
import { orderContext, dishContext } from '../../context';
import MobileLayout from '../../wrapper/mobileLayout/MobileLayout';
import { PaymentMethods } from '../../component';

const Cart = () => {

  const { cart, removeFromCart } = useContext(orderContext);
  const { dishes } = useContext(dishContext);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const total = cart.reduce((sum, item) => {
    const dish = dishes.find((dish) => dish._id === item.dishId);
    const servingSize = dish.servingSize.find((ss) => ss._id === item.servingSize);
    const quantity = item.quantity;
    const addons = item.addons.map(tag => dish.addons.find((addon) => addon._id === tag)) || [];
    const addOnCost = addons.reduce((acc, addon) => acc + addon.price, 0);
    const itemTotal = (quantity * servingSize.price) + addOnCost;
    return Math.round(sum + itemTotal);
  }, 0);

  const handleDeleteItem = (id) =>{
    removeFromCart(id);
  }

  return (
    <MobileLayout showCart={true} setShowPaymentMethods= {setShowPaymentMethods} showPaymentMethods={showPaymentMethods}>
      {cart && <div className='cart-container'>
       {!showPaymentMethods && <h1 className='cart-body-heading'>Your Orders</h1>}
        <div className='cart-summary'>
          {cart.map((item, idx) => {
            
            const dish = dishes.find((dish) => dish._id === item.dishId);
            const servingSize = dish.servingSize?.find((ss) => ss._id === item.servingSizeId) || dish.servingSize[0];
            const quantity = item.quantity;
            const addons = item.addons.map(tag => dish.addons.find((addon) => addon._id === tag)) || [];
            const addOnCost = addons.reduce((acc, addon) => acc + addon.price, 0);
            const itemTotal = Math.round((quantity * servingSize.price || 0) + addOnCost);

            return (
              <div key={idx} className='cart-item'>
                <div className='item-details'>
                  <img src={dish.image} alt={dish.name} className='dish-image'/>
                  <div className='personal-details'>
                    <div className='item-name'>{dish.name} <span>X {quantity}</span></div>
                    <div className='serving-size'>{servingSize.size}</div>
                  </div>
                  <div className='action-details' >
                    <div className='item-price'>₹&nbsp;{itemTotal}</div>
                    <button onClick={() => handleDeleteItem(item.dishId)}><i className="fas fa-trash"></i></button>
                  </div>
                </div>
                <div className='addons'>
                    {addons.map(addon => (
                      <span key={addon._id} className='addon-name'>{addon.name}</span>
                    ))}
                </div>
              </div>
            );
          })}
          <div className='cart-total'>
            <div>Total</div>
            <span>₹ {total}</span>
          </div>
        </div>
      </div>}

        {showPaymentMethods && <PaymentMethods onClose={() => setShowPaymentMethods(false)} />}
    </MobileLayout>
  );
}

export default Cart;
