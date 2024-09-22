import { useState } from 'react';
import managerContext from './managerContext';
import { host } from '../../constants/appConstants';

const ManagerState = ({ children }) => {
    
  const [activeOrders, setActiveOrders] = useState([]);
  const [ showSummary, setShowSummary ] = useState(false);
  const [ summaryDetail, setSummaryDetail] = useState(null);
  

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
      const response = await fetch(url, { method, headers,  body: body ? body : null});
      const json = await response.json();
      return {
        status: response.ok,
        data: json,
      };
    } catch (error) {
      return {
        status: false,
        message: `Error fetching API: ${error.message || error}`,
      };
    }
  };

  const getActiveOrders = async () => {
    const response = await fetchApi(`${host}/orders/active`, 'GET', null, false);
    if (response.status) {
      setActiveOrders(response.data)
    } 
  };

  const completeOrder = async ( name, description, addons, tags, servingSize, available, dishImage, foodType) => {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);
    if (addons) formData.append('addons', JSON.stringify(addons));  
    if (tags) formData.append('tags', JSON.stringify(tags));
    if (servingSize) formData.append('servingSize', JSON.stringify(servingSize));  
    if (available)formData.append('available', available);
    if (dishImage) formData.append('dishImage', dishImage);
    if (foodType) formData.append('foodType', foodType);
  
    const response = await fetchApi(`${host}/dishes`, 'POST', formData, true);
    if (response.status) setDishes(prevDishes => [...prevDishes, response.data]);
  };
  
 
  
  const contextValue = {
    activeOrders,
    getActiveOrders,
    completeOrder,
    showSummary, 
    setShowSummary,
    summaryDetail, 
    setSummaryDetail

  };


  return (
    <managerContext.Provider value={contextValue}>
      {children}
    </managerContext.Provider>
  );
};

export default ManagerState;
