import './customize.scss';
import { HorizontalLine, ServingSize } from '../../component';
import { useContext } from 'react';
import { orderContext } from '../../context';

const Customize = ({ dish, setCustomization, handleQuantityChange, orderDish, setOrderDish, addTag }) => {

  const {addToCart} = useContext(orderContext);
  const handleServingSizeChange = (servingSizeId) => {
    setOrderDish((prev) => ({
      ...prev,
      servingSize: servingSizeId,
    }));
  };

  const handleAddItem = () => {
    addToCart(orderDish);
    setCustomization(false); 
  };

  const handleAddonToggle = (tagId) => {
    setOrderDish((prev) => {
      const tags = prev.addons.includes(tagId)
        ? prev.addons.filter(tag => tag !== tagId)
        : [...prev.addons, tagId];
      return {...prev, addons: tags};
    });
  };

  return (
    <div className="customize_container">
      <div className="customize_backdrop" onClick={() => setCustomization(false)} />
      <div className="customize_page">
        <div className="header">{dish.name}</div>
        <img src={dish.image  } alt='item' />
        <HorizontalLine />
        <ServingSize
          dish={dish}
          servingSize={orderDish.servingSize}
          setServingSize={handleServingSizeChange}
        />
        <HorizontalLine />
        <div className="customize_addons">
          <div className="addon-header">Add Ons</div>
          <div className="addon-list">
            {dish.addons?.map(addon => (
              <div key={addon._id} className="addon-item">
              <input
                type="checkbox"
                id={`addon-${addon._id}`}
                onChange={() => handleAddonToggle(addon._id)}
              />
              <label htmlFor={`addon-${addon._id}`}>{addon.name}</label>
              <span className="addon-price"> <span style={{fontSize: '20px'}}>+</span>  ₹ {addon.price}</span>

            </div>
            ))}
          </div>
        </div>
        <footer className='customize_footer'>
          <div className='customize_itemIncrement'>
            <strong onClick={() => handleQuantityChange(-1)}>-</strong>
            <strong>{orderDish.quantity}</strong>
            <strong onClick={() => handleQuantityChange(1)}>+</strong>
          </div>
          <button className="customize_addItem" onClick={handleAddItem}>Add item</button>
        </footer>
      </div>
    </div>
  );
};

export default Customize;
