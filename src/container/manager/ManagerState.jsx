import { useState } from 'react';
import managerContext from './managerContext';
import { getDineinOrders, getOnlineOrders, payOnCounter } from '../../api';

const ManagerState = ({ children }) => {
    
  const [dineInOrders, setDineInOrders] = useState([]);
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [ showSummary, setShowSummary ] = useState(false);
  const [ summaryDetail, setSummaryDetail] = useState(null);
  const [ showProfile, setShowProfile ] = useState( false);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ activeRestro, setActiveRestro ] = useState('All');

  
  const fetchDineInOrders = async () => {
    const response = await getDineinOrders();
    if (response) {
      setDineInOrders(response);
    } 
  };

  const fetchOnlineOrders = async () =>{
    const response = await getOnlineOrders();
    if (response) {
      setOnlineOrders(response);
    } 
  }

  const deskPayment = async (counterPaymentDetails) =>{
    const response = await payOnCounter(counterPaymentDetails);
    if (response) {
      return response;
    } 
  }
  
  const contextValue = {
    dineInOrders, 
    fetchDineInOrders,
    onlineOrders,
    fetchOnlineOrders, 
    showSummary, 
    setShowSummary,
    summaryDetail, 
    setSummaryDetail,
    activeRestro, 
    setActiveRestro,
    searchTerm, 
    setSearchTerm,
    showProfile, 
    setShowProfile,
    deskPayment
  };


  return (
    <managerContext.Provider value={contextValue}>
      {children}
    </managerContext.Provider>
  );
};

export default ManagerState;
