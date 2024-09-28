import { useState } from 'react';
import statusDisplayContext from './statusDisplayContext';
import { getCurrentOrders } from '../../api';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const StatusDisplayState = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await getCurrentOrders();
        if (response) {
          setOrders(response);
        } 
      };
      
      const commanSocket = () =>{
        
        const socket = io('https://restaurentmanagement-backend.onrender.com/', {transports: ['websocket'],
          withCredentials:true
        });
        
        
        socket.emit('join-room', 'manager');
        
        socket.on('newOrder', () => {
          toast.success('New order recieved!', { autoClose: 2500 });
          fetchOrders();
        });
        
        socket.on('connect', () => {
          console.log('Manager connected to server');
        });
        
      }
      
      const contextValue = {
        orders,
        fetchOrders,
        commanSocket
      }

    return (
        <statusDisplayContext.Provider value={contextValue}>
          {children}
        </statusDisplayContext.Provider>
      );
};

export default StatusDisplayState;