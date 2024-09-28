import './Customize.scss';
import { HorizontalLine, OrdersOnTable, PaymentMethods, ServingSize } from '../../component';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { dishContext, orderContext } from '../../context';

const Customize = ({ dish = null, selectedDish = null, handleCloseCustomization, tableOrders = null, payment = null }) => {
  const { addToCart } = useContext(orderContext);
  const { setCustomization } = useContext(dishContext);

  const closeCustomize = () =>{
    window.history.back();
    handleCloseCustomization();
  }

  const initialOrder = useCallback(() => ({
    dishId: dish?._id,
    quantity: selectedDish?.quantity || 1,
    servingSize: dish?.servingSize?.[0]?._id,
    addons: [],
  }), [dish, selectedDish]);

  const [orderDish, setOrderDish] = useState(initialOrder);

  const handleServingSizeChange = (servingSizeId) => {
    setOrderDish((prev) => ({ ...prev, servingSize: servingSizeId }));
  };

  const handleAddItem = () => {
    addToCart(orderDish);
    window.history.back();
    handleCloseCustomization();
  };

  const handleAddonToggle = (tagId) => {
    setOrderDish((prev) => {
      const newAddons = prev.addons.includes(tagId)
        ? prev.addons.filter((tag) => tag !== tagId)
        : [...prev.addons, tagId];
      return { ...prev, addons: newAddons };
    });
  };

  const handleQuantityChange = (delta) => {
    setOrderDish((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta),
    }));
  };

  useEffect(() => {
    const handlePopState = () => {
      if (setCustomization) {
        handleCloseCustomization();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }); 

  return (
    <div className="customize_container">
      <div className="customize_backdrop" onClick={closeCustomize} />
      <div className="customize_page">
        {dish && selectedDish ? (
          <>
            <div className="header">{dish.name}</div>
            <img src={dish.image.url? dish.image.url: dish.image} alt={dish.name} />
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
                {dish.addons?.map((addon) => (
                  <div key={addon._id} className="addon-item">
                    <input
                      type="checkbox"
                      id={`addon-${addon._id}`}
                      onChange={() => handleAddonToggle(addon._id)}
                    />
                    <label htmlFor={`addon-${addon._id}`}>{addon.name}</label>
                    <span className="addon-price">
                      <span style={{ fontSize: '20px' }}>+</span> ₹ {addon.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <footer className="customize_footer">
              <div className="customize_itemIncrement">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <strong>{orderDish.quantity}</strong>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
              <button className="customize_addItem" onClick={handleAddItem}>
                Add item
              </button>
            </footer>
          </>
        ) : tableOrders ? (
          <OrdersOnTable tableOrders = {tableOrders}/>
        ) : payment && <PaymentMethods orders={payment} />}
      </div>
    </div>
  );
};

export default React.memo(Customize);
