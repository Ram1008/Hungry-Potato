import { useState } from 'react';
import orderContext from './orderContext';
import { host } from '../../constants/appConstants';

const OrderState = (props) => {
  const [cart, setCart] = useState([]);
  const [tableId, setTableId] = useState(null);
  const [tableOrders, setTableOrders] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchApi = async (url, method, body = null, requireToken = false) => {
    const headers = {};
    
    if (requireToken) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('hungry&Potato-token')}`;
    }

    if (body) {
      if (body instanceof FormData) {
        // headers['Content-Type'] = 'application/json';
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
      }
      
    }
    
    try {
      const response = await fetch(url, { method, headers, body: body ? body : null });
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

  const addToCart = (order) => {
    setCart([...cart, order]);
  };

  const bookTable = async (id) =>{
    const response = await fetchApi(`${host}/tables/occupied/${id}`);
    if(response.status){
      console.log('table is booked', id);
    }
    setTableId(id);
  }

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.dishId !== id);
    setCart(updatedCart);
  };

  const getAllOrders = async () =>{
    const newURL = host + '/orders';
    const response = await fetchApi(newURL, 'GET', null, true);
    if (response.status) {
      console.log(response.data)
      setOrders(response.data.orders);

    }
  };  

  const getCurrentOrders = async (tableId)=>{
    const response = await fetchApi(`${host}/orders/${tableId}`, 'GET');
    if (response.status) {
      setTableOrders(response.data.orders);
    }
  };

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

  const editOrder = async (orderId, status) =>{
    const response = await fetchApi(`${host}/orders/${orderId}`, 'PUT', {status: status || 'prepared'}, true);
    if (response.status) {
      getAllOrders();
    }
  }

  const deleteOrder = async (id) => {
    const response = await fetchApi(`${host}/orders/${id}`, 'DELETE', null, true);
    if (response.status) {
      setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
    }
  };

  


  const contextValue = {
    cart, 
    tableId,
    tableOrders,
    orders,
    placeOrder,
    setCart,
    addToCart,
    getCurrentOrders,
    removeFromCart,
    getAllOrders,
    editOrder,
    deleteOrder,
    bookTable
  };
  return (
    <orderContext.Provider value={contextValue}>
      {props.children}
    </orderContext.Provider>
  );
};

export default OrderState;
