import { useContext, useMemo } from 'react';
import './MobileLayout.scss';
import { ChefSpecial, SwitchButton, MobileSearch } from '../../component';
import { dishContext, orderContext, userContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const MobileLayout = ({ showCart = false, children }) => {

  const navigate = useNavigate();

  const { user, getUser } = useContext(userContext);
  const { cart, placeOrder, tableId, showPaymentMethods } = useContext(orderContext);
  const { handleCustomize, chefSpecial } = useContext(dishContext);

  
  const handleViewCart = () => {
    navigate('/cart');
  };
  
  const handleBackToOrders = () => navigate(-1);

  const handleProfileClick = async () => {
    if (user) { 
      navigate('profile');
    } else {
      navigate('login');
    }
  };

  const handlePlaceOrder = async()=>{
    if(!showPaymentMethods){
      const response = await placeOrder(tableId, cart);
      if (response.status) {
        navigate('/')
      }
    }else{
      const response = await placeOrder(tableId, cart);
      if (response.status) {
        navigate('/')
      }
    }
    
  }
  const handlePayment = () =>{
    handleCustomize(null, null, null, {tableId: tableId, cart: cart});
  }

  
  const headerLayout = useMemo(() => (
    <header className="mobileLayout_head">
      <div className="mobileLayout_header">
       { !showCart ? <div className="head-searchbar">
          <MobileSearch/>
        </div>: 
        <div className='back-btn'>
        <button onClick={handleBackToOrders}>&#x25C0; Back </button>
        </div>}
        <div className="user-profile">
            <button onClick={handleProfileClick}>
              <img src= {user ? user.user.profilePicture.url: ''} alt='profile'/> 
            </button>
        </div>
      </div>

      {!showCart && <><div className="mobileLayout_subheader">
        <div className="chef-special">
          <div className="app__home-menu-line">━━━━━</div>
          <div className="app__home-menu-text">Chef's Special</div>
          <div className="app__home-menu-line">━━━━━</div>
        </div>
        <div className="chef-list">
            <ChefSpecial/>
        </div>
      </div>
      <div className="mobileLayout_mode">
       
        <SwitchButton />
        
      </div>
      </>
      }
    </header>
  ), [chefSpecial, getUser, showCart]);

  const footerLayout = useMemo(() => (
    !showCart ? cart && cart.length > 0 && (
      <footer className="mobileLayout_footer">
        <div className="footer-icon" />
        <div className="footer-item">{cart.length} Items in the cart</div>
        <button className="footer-btn" onClick={handleViewCart}>
          View Cart
        </button>
      </footer>
    ) : (
      <footer className="mobileLayout_footer">
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
                <div >Pay at desk</div>
              </button>
            </div>
          </div>
        </footer>
    )
  ), [cart, tableId, showCart]);

  return (
    <div className="mobileLayout_container">
      {headerLayout}
      {children}
      {footerLayout}
    </div>
  );
};

export default MobileLayout;
