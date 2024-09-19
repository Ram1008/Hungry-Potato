import React, { useContext } from 'react';
import './ChefSpecial.scss';
import { dishContext } from '../../context';

const ChefSpecial = () => {

  const {dishes, handleCustomize} = useContext(dishContext);

  let viewChefSpecial = dishes.filter(dish => dish.tags.includes("chef's special"));

  const handleSelectDish = (dish) => {
    handleCustomize(dish, { id: dish._id, quantity: 0 }); 
  };

  return (
    <>
    {
      viewChefSpecial.map((dish) => (
        <div key={dish._id} onClick={() => handleSelectDish(dish)} className='chefSpecial_container'>
          <div className='image-container'>
            <img src={dish.image.url? dish.image.url: dish.image} alt={dish.name} />
          </div>
          <p>{dish.name}</p>
        </div>  
      ))
    }
    </>
  );
};

export default React.memo(ChefSpecial);
