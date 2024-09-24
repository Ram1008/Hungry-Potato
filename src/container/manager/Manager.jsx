import ManagerLayout from '../../wrapper/managerLayout/ManagerLayout';
import './Manager.scss';
import { DesktopProfile, OrderSummary } from '../../component';
import { useContext, useEffect} from 'react';
import { adminContext, userContext } from '../../context';
import managerContext from './managerContext';


const Manager = () => {
  const {showProfile, setShowProfile, dineInOrders, onlineOrders, fetchOnlineOrders, activeRestro, setActiveRestro, searchTerm, setSearchTerm, fetchDineInOrders, showSummary, setShowSummary, summaryDetail, setSummaryDetail} = useContext(managerContext);
  const {user, editUser, getUser} = useContext(userContext);

  let viewDineIn = activeRestro === 'All' ? dineInOrders : dineInOrders.filter(table => table.restronumber === activeRestro)
  let viewOnline = activeRestro === 'All' ? onlineOrders : onlineOrders.filter(table => table.restronumber === activeRestro)
  
  if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      
      viewDineIn = viewDineIn.filter(order => {
      return (
        order.tableNumber.toLowerCase().includes(lowercasedSearchTerm)
      )});
      viewOnline = viewOnline.filter(order => {
      return (
        order.tableNumber.toLowerCase().includes(lowercasedSearchTerm)
      )});

  }
  

  // const onlineOrders = viewOrders.filter(order => order.tableNumber === null)

  const handleShowSummary = (order) => {
      setSummaryDetail(order);
      setShowSummary(true);
  };
  
  // console.log(dineinOrders);

  useEffect(() => {
    getUser();
    fetchDineInOrders();
    fetchOnlineOrders();
  }, []);  
  

  return (
    <ManagerLayout 
    props = {{heading: "Welcome Manager" , showProfile , setShowProfile, dineInOrders, onlineOrders, setActiveRestro, searchTerm, setSearchTerm, user, activeRestro}}
    >
      {!showProfile ? showSummary ? 
      <OrderSummary summaryDetail={summaryDetail} setSummaryDetail={setSummaryDetail} setShowSummary={setShowSummary} /> :
       <div className='manager_container'>
          <div className='manager_dineIn'>
            {viewDineIn.map((order, idx) =>
              <div key={idx} className='order_wrapper'>
                <p>Table - {order.tableNumber}</p>
                <div className='order-status' onClick={() => handleShowSummary(order)}>
                  <span className='status-text'>Booked</span>
                  <i className="eye-icon fa fa-eye"></i> 
                </div>
              </div>
            )}
          </div>
          <div className='manager_online'>
          {viewOnline.map(() =>
              <div className='order_wrapper'>
                <p>Table - T27</p>
                <div className='order-status'>
                  <span className='status-text'>Booked</span>
                  <i className="eye-icon fa fa-eye"></i> 
                </div>
              </div>
            )}
          </div>
        </div>:
      <DesktopProfile editUser = {editUser} user = {user? user.user: null} setShowProfile={setShowProfile}/>}
    </ManagerLayout>
  );
};

export default Manager;
