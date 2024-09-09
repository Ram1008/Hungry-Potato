import React from 'react';
import './ChefSpecial.scss';

const ChefSpecial = ({ dish, onCustomize }) => {

  const handleSelectDish = () => {
    onCustomize(dish, { id: dish._id, quantity: 0 }); 
  };

  return (
    <>
      <div onClick={handleSelectDish} className='chefSpecial_container'>
        <div className='image-container'>
          <img src={dish.image} alt={dish.name} />
        </div>
        <p>{dish.name}</p>
      </div>
    </>
  );
};

export default React.memo(ChefSpecial);
