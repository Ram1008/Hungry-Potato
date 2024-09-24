import { useState } from 'react';
import cookContext from './cookContext';
import { getUncookedOrders, editOrder } from '../../api';

const CookState = (props) => {

    const [orders, setOrders ] = useState([]);
    const [ showProfile, setShowProfile ] = useState(false);
    const [ activeRestro, setActiveRestro ] = useState('All');
    const [ searchTerm, setSearchTerm ] = useState('');
    
    const fetchOrders = async () =>{
        const response = await getUncookedOrders();
        if (response) {
            setOrders(response);
        } 
    }

    const updateOrder = async (orderId) =>{
      const response = await editOrder(orderId);
        if (response) {
            console.log(response);
            const newOrders = orders.filter( order => order._id !== orderId);
            setOrders(newOrders);
        } 
    }

    const contextValue = {
        orders,
        showProfile, 
        setShowProfile,
        activeRestro, 
        setActiveRestro,
        searchTerm, 
        setSearchTerm,
        fetchOrders,
        updateOrder
      };
    

  return (
    <cookContext.Provider value={contextValue}>
      {props.children}
    </cookContext.Provider>
  )
}

export default CookState