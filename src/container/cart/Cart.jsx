import './Cart.scss';
import { useContext, useState } from 'react';
import { orderContext, dishContext } from '../../context';
import MobileLayout from '../../wrapper/mobileLayout/MobileLayout';
// import { PaymentMethods } from '../../component';
import Customize from '../customize/Customize';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import PaymentForm from './PaymentForm'; 

const Cart = () => {
  const stripePromise = loadStripe('pk_test_51Ps296JIj9i0thHmvhddhBMMtH6x78Trh73HYZmE2TGZ6oe6jvvLlywi2wxo6c6MBuTb6XjxodmssJi5MKONxRgU00WfPKQMxf');
  const { cart, removeFromCart} = useContext(orderContext);
  const { dishes, customizationData, customization, setCustomization, setCustomizationData } = useContext(dishContext);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const handleCloseCustomization = () => {
    setCustomization(false);
    setCustomizationData(null);
    setShowPaymentMethods(false);
  }

  const total = cart.reduce((sum, item) => {
    const dish = dishes.find((dish) => dish._id === item.dishId);
    if (!dish) return sum; 
    const servingSize = dish.servingSize.find((ss) => ss._id === item.servingSizeId) || dish.servingSize[0];
    const quantity = item.quantity || 0;
    const addons = item.addons.map(tag => dish.addons.find((addon) => addon._id === tag)) || [];
    const addOnCost = addons.reduce((acc, addon) => addon ? acc + addon.price : acc, 0); // Handle potential undefined add-ons
    const itemTotal = (quantity * servingSize.price) + addOnCost;
    return sum + itemTotal; 
  }, 0);
  
  const roundedTotal = Math.round(total);
  

  const handleDeleteItem = (idx) =>{
    removeFromCart(idx);
  };

  return (
    <>
    <MobileLayout showCart={true} setShowPaymentMethods={setShowPaymentMethods}>
      {cart && !showPaymentMethods && (
        <div className='cart-container'>
          <h1 className='cart-heading'>Your Dishes</h1>
          <div className='cart-summary'>
            {cart.map((item, idx) => {
              const dish = dishes.find((dish) => dish._id === item.dishId);
              const servingSize = dish.servingSize.find((ss) => ss._id === item.servingSizeId) || dish.servingSize[0];
              const quantity = item.quantity;
              const addons = item.addons.map(tag => dish.addons.find((addon) => addon._id === tag)) || [];
              const addOnCost = addons.reduce((acc, addon) => acc + addon.price, 0);
              const itemTotal = Math.round((quantity * servingSize.price || 0) + addOnCost);
  
              return (
                <div key={idx} className='cart-item'>
                  <div className='item-details'>
                    <img src={dish.image.url?dish.image.url:dish.image} alt={dish.name} className='dish-image'/>
                    <div className='personal-details'>
                      <div className='item-name'>{dish.name} </div>
                      <div className='serving-size'>{servingSize.size} <span>X {quantity}</span></div>
                      <div className='addons'>
                        {addons.map(addon => (
                          <span key={addon._id} className='addon-name'>{addon.name}</span>
                        ))}
                      </div>
                    </div>
                    <div className='action-details'>
                      <div className='item-price'>₹&nbsp;{itemTotal}</div>
                      <button onClick={() => handleDeleteItem(idx)}><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                  
                </div>
              );
            })}
            <div className='cart-total'>
              <div>Total</div>
              <span>₹ {roundedTotal}</span>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
    {customization && (
      <Elements stripe={stripePromise}>
      <Customize
        payment={customizationData.orders}
        handleCloseCustomization = {handleCloseCustomization}
      />
    </Elements>
      
    )}
    </>
  );
  
}

export default Cart;
