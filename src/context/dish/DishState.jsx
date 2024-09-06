import { useEffect, useState } from 'react';
import DishContext from './dishContext';
import { host } from '../../constants/appConstants';
import { Dish as ExampleDish } from '../../constants/dishConstants';

const DishState = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [vegMode, setVegMode] = useState(false);
  const [chefSpecial, setChefSpecial] = useState([]);
  
  

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
        message: `Error fetching API: ${error.message || error}`,
      };
    }
  };

  const getDishes = async () => {
    const data = await fetchApi(`${host}/dishes`, 'GET', null, false);
    if (data.status) {
      setMenu(data.data);
      setDishes(data.data);
      setChefSpecial(data.data.filter(dish => dish.tags.includes("chef's special")));
    }
    else{
      setDishes(ExampleDish); 
      setMenu(ExampleDish);
      setChefSpecial(ExampleDish.filter(dish => dish.tags.includes("chef's special")));
    } 
  };

  const addDish = async (name, description, price, category, tags) => {
    const data = await fetchApi(`${host}/api/dishes`, 'POST', { name, description, price, category, tags });
    if (data.status) setDishes(prevDishes => [...prevDishes, data.data]);
  };

  const deleteDish = async (id) => {
    const response = await fetchApi(`${host}/api/dishes/${id}`, 'DELETE');
    if (response.status) {
      setDishes(prevDishes => prevDishes.filter(dish => dish._id !== id));
    }
  };

  const editDish = async (id, name, description, price, category, tags) => {
    const data = await fetchApi(`${host}/api/dishes/${id}`, 'PUT', { name, description, price, category, tags });
    if (data.status) {
      setDishes(prevDishes => prevDishes.map(dish => dish._id === id ? data.data : dish));
    }
  };

  const filterDishesBySearchTerm = () => {
    setDishes(menu.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const filterDishesByTags = (tag) => {
    const newDishes = menu.filter(dish => dish.tags.includes(tag));
    setDishes(newDishes);
  };

  const vegOnly = (isVeg, dishes= null) => {
    if(isVeg)setDishes(dishes.filter(dish => dish.foodType === 'Veg'));
    else setDishes(menu);
  };
  
  const contextValue = {
    dishes,
    getDishes,
    addDish,
    deleteDish,
    editDish,
    setSearchTerm,
    filterDishesBySearchTerm,
    filterDishesByTags,
    chefSpecial,
    vegOnly,
    vegMode,
    setVegMode,
  };

  useEffect(() => {
    getDishes();
  }, []);

  useEffect(() => {
    filterDishesBySearchTerm();
  }, [searchTerm]);

  return (
    <DishContext.Provider value={contextValue}>
      {children}
    </DishContext.Provider>
  );
};

export default DishState;
