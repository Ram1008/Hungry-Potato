import './Home.scss';
import { Dish, NavigationTab } from '../../component';
import { useContext, useState } from 'react';
import { dishContext, orderContext } from '../../context';
import { NavigationOptions } from '../../constants/dishConstants';
import MobileLayout from '../../wrapper/mobileLayout/MobileLayout';
import Customize from '../customize/Customize';

const Home = () => {
  const { dishes } = useContext(dishContext);
  const [customization, setCustomization] = useState(false);
  const [customizationData, setCustomizationData] = useState(null);
  const { tableOrders } = useContext(orderContext);

  const handleCustomize = (dish=null, selectedDish=null, tableOrders=null) => {
    if(dish && selectedDish){
      setCustomizationData({ dish, selectedDish });
      setCustomization(true);

    }
    if(tableOrders){
      setCustomizationData({ tableOrders });
      setCustomization(true);
    }
  };
  const handleCloseCustomization = () => {
    setCustomization(false);
    setCustomizationData(null); 
  }
  return (
    <>
      <MobileLayout onCustomize={handleCustomize}>
        <div className="home_body">
          <div className="home_menu">
            <div className="menu-line">━━━━━━━━</div>
            <div className="menu-text">MENU</div>
            <div className="menu-line">━━━━━━━━</div>
            
          </div>
          <div className="home_tableOrder">
            <button onClick={() => handleCustomize(null, null, tableOrders)}>&#x25BC; Present orders </button>
          </div>
          <div className="home_navigation">
            {NavigationOptions.map((tab) => (
              <NavigationTab tab={tab} key={tab.tag} />
            ))}
            

          </div>
          <div className="home_dishes">
            {dishes.map((dish) => (
              <Dish
                dish={dish}
                key={dish._id}
                onCustomize={handleCustomize}
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
