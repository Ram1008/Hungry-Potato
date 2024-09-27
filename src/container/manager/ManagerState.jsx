import { useState } from 'react';
import managerContext from './managerContext';
import { addBill, getDineinOrders, getOnlineOrders, payOnCounter } from '../../api';
import { toast } from 'react-toastify';

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

  const sendBill = async (number, bill) =>{
    const response = await addBill(number, bill);
    if (response) {
      toast.success('Bill is sent successfully!', { autoClose: 2500 });
    }else{
      toast.error('Could not send the bill!', { autoClose: 2500 });
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
    deskPayment,
    sendBill
  };


  return (
    <managerContext.Provider value={contextValue}>
      {children}
    </managerContext.Provider>
  );
};

export default ManagerState;
