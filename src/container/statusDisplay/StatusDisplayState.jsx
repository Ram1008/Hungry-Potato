import { useState } from 'react';
import statusDisplayContext from './statusDisplayContext';
import { getCurrentOrders } from '../../api';

const StatusDisplayState = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await getCurrentOrders();
        if (response) {
          setOrders(response);
        } 
      };
      const contextValue = {
        orders,
        fetchOrders
      }


    return (
        <statusDisplayContext.Provider value={contextValue}>
          {children}
        </statusDisplayContext.Provider>
      );
};

export default StatusDisplayState;