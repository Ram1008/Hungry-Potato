import { useEffect, useState } from 'react';
import orderContext from './orderContext';
import { host } from '../../constants/appConstants';

const OrderState = (props) => {
  const [cart, setCart] = useState([]);
  const [tableId, setTableId] = useState("66b627e026fb8f6ef791f95b");
  const [tableOrders, setTableOrders] = useState(null);
  const fetchApi = async (url, method, body = null, requireToken = true) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (requireToken) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('hungry&Potato-token')}`;
    }
  
    try {
      const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
      const json = await response.json();
      return {
        status: response.ok,
        data: json,
      };
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  };

  const getCurrentOrders = async (tableId)=>{
    const response = await fetchApi(`${host}/orders/${tableId}`, 'GET');
    if (response.status) {
      setTableOrders(response.data);

    }
  }

  const placeOrder = async (tableId, order) => {
    let newBody = {};
    newBody.tableId = tableId;
    newBody.ord = order;

    
    const response = await fetchApi(`${host}/orders`, 'POST', newBody, true);
    if (response.status) {
      getCurrentOrders(tableId);
      setCart([]);
      return response;
    }
  };

  const deleteOrder = (index) => {
    // setOrder((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const addToCart = (order) => {
    setCart([...cart, order]);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.dishId !== id);
    setCart(updatedCart);
  };


  const contextValue = {
    placeOrder,
    cart, 
    setCart,
    deleteOrder,
    addToCart,
    tableId,
    tableOrders,
    getCurrentOrders,
    removeFromCart
  };

  useEffect(()=>{
    getCurrentOrders(tableId);
  }, [])

  return (
    <orderContext.Provider value={contextValue}>
      {props.children}
    </orderContext.Provider>
  );
};

export default OrderState;
