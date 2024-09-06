import { useState } from 'react';
import './dish.scss';
import { Customize } from '../../container';

const Dish = ({ dish }) => {
  const [customization, setCustomization] = useState(false);
  const [orderDish, setOrderDish] = useState({
    dishId: dish._id,
    quantity: 0,
    servingSize: dish.servingSize[0]._id,
    addons: [],
  });

  const handleQuantityChange = (change) => {
    setOrderDish(prev => ({
      ...prev,
      quantity: prev.quantity + change
    }));
  };

  const addTag = (tagId) => {
    setOrderDish(prev => ({
      ...prev,
      addons: [...prev.tags, tagId]
    }));
  };

  return (
    <div className='dish-container'>
      <div className='dish-info'>
        <div className='image-container'>
          <img src={dish.image} alt={dish.name} />
        </div>
        <div className='dish-name'>{dish.name}</div>
      </div>
      <div className='dish-details'>
        <div className='dish-tools'>
          <button 
            className='dish-button' 
            onClick={() => handleQuantityChange(-1)}
            disabled={orderDish.quantity <= 0}
          >
            -
          </button>
          <div className='dish-quantity'>{orderDish.quantity}</div>
          <button 
            className='dish-button' 
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
        <div className='dish-price'>
          ₹ {dish.servingSize?.[0]?.price || null}
        </div>
        <button className='dish-add' onClick={() => setCustomization(true)}>
          <span className='dish-add-icon'>+</span> ADD
        </button>
      </div>
      {customization && (
        <Customize
          dish={dish}
          setCustomization={setCustomization}
          handleQuantityChange={handleQuantityChange}
          orderDish={orderDish}
          setOrderDish={setOrderDish}
          addTag={addTag}
        />
      )}
    </div>
  );
};

export default Dish;
