import './Home.scss';
import { Dish, NavigationTab } from '../../component';
import { useContext, useEffect } from 'react';
import { dishContext, orderContext, userContext } from '../../context';
import MobileLayout from '../../wrapper/mobileLayout/MobileLayout';
import Customize from '../customize/Customize';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const { dishes, filterTag, searchTerm, getDishes, customizationData, setCustomizationData, customization, setCustomization, handleCustomize } = useContext(dishContext);
  const {getUser} = useContext(userContext);
  const { tableOrders, bookTable } = useContext(orderContext);
  const searchParams = new URLSearchParams(location.search);
  const tableId  = searchParams.get('tableId');

  let filteredDishes = dishes;

  if(filterTag){
    filteredDishes = filteredDishes.filter(dish => dish.tags.includes(filterTag));
  }

  if(searchTerm){
    filteredDishes =  dishes.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  
  const handleCloseCustomization = () => {
    setCustomization(false);
    setCustomizationData(null); 
  }

  useEffect(() => {
    getUser();
    getDishes();
    if(tableId){
      bookTable(tableId);
    }
  }, [])


  return (
    <>
      <MobileLayout >
        <div className="home_body">
          <div className="home_menu">
            <div className="menu-line">━━━━━━━━</div>
            <div className="menu-text">MENU</div>
            <div className="menu-line">━━━━━━━━</div>
            
          </div>
          {tableOrders && <div className="home_tableOrder">
            <button onClick={() => handleCustomize(null, null, tableOrders)}>&#x25BC; Present orders </button>
          </div>}
          <div className="home_navigation">
            <NavigationTab />
          </div>
          <div className="home_dishes">
            {filteredDishes.map((dish) => (
              <Dish
                dish={dish}
                key={dish._id}
              />
            ))}
          </div>
        </div>
      </MobileLayout>
      {customization && customizationData && (
        <Customize
          dish={customizationData.dish}
          selectedDish={customizationData.selectedDish}
          tableOrders = {customizationData.tableOrders}
          handleCloseCustomization = {handleCloseCustomization}
        />
      )}
    </>
  );
};

export default Home;
