import { useContext, useEffect, useMemo, useState } from 'react';
import './MobileLayout.scss';
import { ChefSpecial, SwitchButton, SearchBar } from '../../component';
import { dishContext, orderContext, userContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../assets/icons/UserIcon.png';
import { host } from '../../constants/appConstants';

const MobileLayout = ({ onCustomize = null, showCart = false, setShowPaymentMethods = null, showPaymentMethods = null, children }) => {

  const navigate = useNavigate();

  const { user, getUser } = useContext(userContext);
  const { cart, placeOrder, tableId } = useContext(orderContext);
  const { dishes, vegOnly, setVegMode, vegMode, chefSpecial, setSearchTerm } = useContext(dishContext);
  console.log(showPaymentMethods);

  // const [payment, setPayment] = useState(showPaymentMethods || false);
 
 
  
  
  const handleViewCart = () => {
    navigate('/cart');
  };
  
  const handleBackToOrders = () => navigate('/');

  const handleVegMode = () => {
    vegOnly(!vegMode, dishes);
    setVegMode(!vegMode);
  };

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
    setShowPaymentMethods(true);
  }

  
  const headerLayout = useMemo(() => (
    <header className="mobileLayout_head">
      <div className="mobileLayout_header">
       { !showCart ? <div className="head-searchbar">
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>: 
        <div className='back-btn'>
        <button onClick={handleBackToOrders}>&#x25C0; Back to menu</button>
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
          {chefSpecial.map((dish) => (
            <ChefSpecial dish={dish} key={dish._id} onCustomize={onCustomize} />
          ))}
        </div>
      </div>
      <div className="mobileLayout_mode">
        <div style={{ color: 'white' }}>NAHHHH!</div>
        <SwitchButton onToggle={handleVegMode} />
        <div style={{ color: 'white' }}>Veg Mode</div>
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
            {showPaymentMethods ? null: (<div className='cart-paymentMethod'>
              <button onClick={handlePayment}>
                <div>Payment methods</div>
                <div>→</div>
              </button>
            </div>)}
            <div className='cart-payLater'>
              <button onClick={handlePlaceOrder}>
                <div >Place Order</div>
                {showPaymentMethods ? null :( <div >Pay at desk</div>)}
              </button>
            </div>
          </div>
        </footer>
    )
  ), [cart, tableId, showCart]);

  useEffect(()=>{

    getUser();

  }, [])
  
  useEffect(()=>{

    // getUser();

  }, [showPaymentMethods])
  return (
    <div className="mobileLayout_container">
      {headerLayout}
      {children}
      {footerLayout}
    </div>
  );
};

export default MobileLayout;
