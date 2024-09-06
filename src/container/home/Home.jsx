import './home.scss';
import { Dish, ChefSpecial, SwitchButton, SearchBar, ProfileButton, NavigationTab } from '../../component';
import { useContext } from 'react';
import {dishContext, orderContext} from '../../context';
import { useNavigate } from 'react-router-dom';
import { NavigationOptions } from '../../constants/dishConstants';
import OrdersOnTable from '../../component/ordersOnTable/OrdersOnTable';


const Home = () => {
  const { dishes, chefSpecial, vegOnly, setVegMode, vegMode, setSearchTerm } = useContext(dishContext);
  
  const {cart, tableOrders} = useContext(orderContext);
  const navigate = useNavigate(); 

  const handleViewCart = () => {
    navigate('/cart');
  };
  const handleVegMode = () => {
    if(vegMode){
      vegOnly(false);
      setVegMode(false);
    }
    else {
      vegOnly(true, dishes);
      setVegMode(true);
    }
  }

  return (
    <>
      <div className="app__mobileContainer">
        <header className="app__home-head">
          <div className="app__home-header">
            <div className="head-searchbar">
              <SearchBar setSearchTerm={setSearchTerm}/>
            </div>
            <div className="user-profile">
              <ProfileButton />
            </div>
          </div>
          <div className="app__home-subheader">
            <div className="chef-special">
              <div className="app__home-menu-line">━━━━━</div>
              <div className="app__home-menu-text">Chef's Special</div>
              <div className="app__home-menu-line">━━━━━</div>
            </div>
            <div className="chef-list">
            {chefSpecial.map((dish=>
              <ChefSpecial dish={dish} key={dish._id}/>
            ))}
            </div>
          </div>
          <div className="app__home-mode">
            <div style={{color:'white'}}>NAHHHH!</div>
            <SwitchButton onToggle={handleVegMode}/>
            <div style={{color:'white'}}>Veg Mode</div>
          </div>
        </header>
        <div className="app__home-body">
          <div className="app__home-menu">
            <div className="app__home-menu-line">━━━━━━━━</div>
            <div className="app__home-menu-text">MENU</div>
            <div className="app__home-menu-line">━━━━━━━━</div>
          </div>
          <div className="app__home-navigation">
          {NavigationOptions.map(tab =>
            <NavigationTab tab={tab} key = {tab.tag} />
          )}
          </div>
          {tableOrders && <OrdersOnTable tableOrders= {tableOrders}/>}
          <div className="app__home-dishes">
            {dishes.map((dish) => (
              <Dish
                dish={dish}
                key={dish._id}
              />
            ))}
          </div>
        </div>
          {cart && cart.length>0?<footer className="app__footer">
            <div className="app__footer-icon" />
            <div className='app__footer-item'>{cart ? cart.length: 0} Items in the cart</div>
            <button className="app__footer-btn" onClick={handleViewCart}>
              View Cart
            </button>
          </footer>:null}
      </div>
    </>
  );
};

export default Home;
