import { useState } from 'react';
import DishContext from './dishContext';
import { host } from '../../constants/appConstants';

const DishState = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [vegMode, setVegMode] = useState(false);
  const [chefSpecial, setChefSpecial] = useState([]);
  const [customization, setCustomization] = useState(false);
  const [customizationData, setCustomizationData] = useState(null);
  
  

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

  const getDishes = async () => {
    const response = await fetchApi(`${host}/dishes`, 'GET', null, false);
    if (response.status) {
      setMenu(response.data);
      setDishes(response.data);
      setChefSpecial(response.data.filter(dish => dish.tags.includes("chef's special")));
    } 
  };

  const addDish = async ( name, description, addons, tags, servingSize, available, dishImage, foodType) => {
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
  
  const editDish = async (id, name, description, addons, tags, servingSize, available, dishImage, foodType) => {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);
    if (addons) formData.append('addons', JSON.stringify(addons));  
    if (tags) formData.append('tags', JSON.stringify(tags)); 
    if (servingSize) formData.append('servingSize', JSON.stringify(servingSize));
    if (available)formData.append('available', available);
    if (dishImage) formData.append('dishImage', dishImage);
    if (foodType) formData.append('foodType', foodType);
  
    const response = await fetchApi(`${host}/dishes/${id}`, 'PUT', formData, true);
    if (response.status) {
      setDishes(prevDishes => prevDishes.map(dish => (dish._id === id ? response.data : dish)));
    }
  };

  const deleteDish = async (id) => {
    const response = await fetchApi(`${host}/dishes/${id}`, 'DELETE', null, true);
    if (response.status) {
      setDishes(prevDishes => prevDishes.filter(dish => dish._id !== id));
    }
  };

  const handleVegMode = (value) =>{
    if(value){
      const vegDishes = dishes.filter(dish => dish.foodType === 'Veg');
      setDishes(vegDishes);
      setVegMode(value);
    }
    else{
      if(vegMode){
        setDishes(menu);
        setVegMode(value);
      }
    }
  }

  const handleCustomize = (dish=null, selectedDish=null, tableOrders=null, orders= null ) => {
    if(dish && selectedDish){
      setCustomizationData({ dish, selectedDish });
      setCustomization(true);

    }
    else if(tableOrders){
      setCustomizationData({ tableOrders });
      setCustomization(true);
    }
    else if(orders){
      setCustomizationData({ orders });
      setCustomization(true);
    }
  };
  
  const contextValue = {
    dishes,
    getDishes,
    addDish,
    deleteDish,
    editDish,
    searchTerm,
    setSearchTerm,
    handleVegMode,
    chefSpecial,
    vegMode,
    setVegMode,
    handleCustomize,
    customization, 
    setCustomization,
    customizationData, 
    setCustomizationData,
    filterTag,
    setFilterTag

  };


  return (
    <DishContext.Provider value={contextValue}>
      {children}
    </DishContext.Provider>
  );
};

export default DishState;
