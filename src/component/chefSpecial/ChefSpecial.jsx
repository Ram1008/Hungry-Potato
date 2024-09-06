import { Customize } from '../../container';
import { useState } from 'react';
import './chefSpecial.scss';

const ChefSpecial = ({ dish }) => {
  const [customization, setCustomization] = useState(false);
  const [orderDish, setOrderDish] = useState({
    dishId: dish._id,
    quantity: 0,
    servingSize: dish.servingSize[0]._id,
    addons: [],
  });

  const handleQuantityChange = (change) => {
    setOrderDish((prev) => ({
      ...prev,
      quantity: prev.quantity + change,
    }));
  };

  const handleCustomization = () => {
    setCustomization(true);
    if(orderDish.quantity === 0){
      handleQuantityChange(1);
    }
  }

  return (
    <>
      <div onClick={handleCustomization} className='chefSpecial_container'>
        <div className='image-container'>
          <img src={dish.image} alt={dish.name}/>

        </div>
        <p>
          {dish.name}
        </p>
      </div>
      {customization && (
    
            <Customize
              dish={dish}
              setCustomization={setCustomization}
              handleQuantityChange={handleQuantityChange}
              orderDish={orderDish}
              setOrderDish={setOrderDish}
            />
      )}
    </>
  );
};

export default ChefSpecial;
