import { useState, useCallback } from 'react';
import cookContext from './cookContext';
import { getUncookedOrders, editOrder } from '../../api';
import { toast } from 'react-toastify'; 
import { io } from 'socket.io-client';

const CookState = (props) => {
  const [orders, setOrders] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [activeRestro, setActiveRestro] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = useCallback(async () => {
    try {
      const response = await getUncookedOrders();
      if (response) {
        setOrders(response);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  }, []);

  const updateOrder = async (orderId) => {
    try {
      const response = await editOrder(orderId);
      if (response) {
        toast.success('Order updated successfully!', { autoClose: 2500 });
        const newOrders = orders.filter((order) => order._id !== orderId);
        setOrders(newOrders);
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order.", { autoClose: 2500 });
    }
  };

  const cookSocket = () =>{

    const socket = io('https://restaurentmanagement-backend.onrender.com/', {transports: ['websocket'],
      withCredentials:true
    });
    

    socket.emit('join-room', 'cook');

    socket.on('newOrder', () => {
      toast.success('New order recieved!', { autoClose: 2500 });
      fetchOrders();
    });

    socket.on('connect', () => {
      console.log('Cook connected to server');
    });

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
    updateOrder,
    cookSocket
  };

  return (
    <cookContext.Provider value={contextValue}>
      {props.children}
    </cookContext.Provider>
  );
};

export default CookState;
