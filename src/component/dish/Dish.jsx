import { useState, useCallback } from 'react';
import React from 'react';
import './Dish.scss';

const Dish = ({ dish, onCustomize }) => {
  const [selectedDish, setSelectedDish] = useState({ id: dish._id, quantity: 0 });

  const increaseQuantity = () => {
    setSelectedDish((prev) => ({
      ...prev,
      quantity: prev.quantity + 1
    }));
  };

  const decreaseQuantity = () => {
    setSelectedDish((prev) => ({
      ...prev,
      quantity: prev.quantity > 0 ? prev.quantity - 1 : 0
    }));
  }

  const handleSelectDish = useCallback(() => {
    onCustomize(dish, selectedDish);
  }, [dish, selectedDish, onCustomize]);

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
            onClick={decreaseQuantity}
            disabled={selectedDish.quantity <= 0}
          >
            -
          </button>
          <div className='dish-quantity'>{selectedDish.quantity}</div>
          <button
            className='dish-button'
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
        <div className='dish-price'>
          ₹ {dish.servingSize?.[0]?.price || null}
        </div>
        <button className='dish-add' onClick={handleSelectDish}>
          <span className='dish-add-icon'>+</span> ADD
        </button>
      </div>
    </div>
  );
};


export default React.memo(Dish);
