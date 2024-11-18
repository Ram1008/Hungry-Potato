import { useContext, useEffect } from 'react';
import ManagerLayout from '../../wrapper/managerLayout/ManagerLayout';
import './Manager.scss';
import { DesktopProfile, OrderSummary } from '../../component';
import { userContext } from '../../context';
import managerContext from './managerContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Manager = () => {
  const {
    showProfile,
    setShowProfile,
    dineInOrders,
    onlineOrders,
    fetchOnlineOrders,
    activeRestro,
    setActiveRestro,
    searchTerm,
    setSearchTerm,
    fetchDineInOrders,
    showSummary,
    setShowSummary,
    summaryDetail,
    setSummaryDetail,
    deskPayment,
    managerSocket
  } = useContext(managerContext);
  
  const { user, editUser, getUser } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  function capitalizeFirstChar(str) {
    if (!str) return str; // Handle empty or null strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

  // Filtering dine-in and online orders based on the active restaurant and search term
  const filterOrders = (orders) => {
    return orders.filter(order => {
      const matchesRestro = activeRestro === 'All' || order.restronumber === activeRestro;
      const matchesSearch = searchTerm ? order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchesRestro && matchesSearch;
    });
  };

  const viewDineIn = filterOrders(dineInOrders);
  const viewOnline = filterOrders(onlineOrders);
  console.log(viewDineIn);
  const handleShowSummary = (order) => {
    setSummaryDetail(order);
    setShowSummary(true);
  };

  const onLoad = async () => {
    fetchDineInOrders();
    fetchOnlineOrders();
    const response = await getUser();
    if (!response) {
      navigate('/login', { state: { from: location.pathname } });
    }
    managerSocket();
  };



  useEffect(() => {
    onLoad();
  }, []);

  return (
    <ManagerLayout 
      props={{
        heading: "Welcome Manager",
        showProfile,
        setShowProfile,
        dineInOrders,
        onlineOrders,
        setActiveRestro,
        searchTerm,
        setSearchTerm,
        user,
        activeRestro,
        showSummary
      }}
    >
      {!showProfile ? (
        showSummary ? (
          <OrderSummary 
            summaryDetail={summaryDetail} 
            setSummaryDetail={setSummaryDetail} 
            setShowSummary={setShowSummary} 
            deskPayment={deskPayment} 
          />
        ) : (
          <div className='manager_container'>
            <div className='manager_dineIn'>
              {viewDineIn.map((order, idx) => (
                <div key={idx} className='order_wrapper'>
                  <p>Table - {order.tableNumber}</p>
                  <div className='order-status' onClick={() => handleShowSummary(order)}>
                    <span className='status-text'>{order.orders.length > 0 ? capitalizeFirstChar(order.orders[order.orders.length -1].status): 'Booked'}</span>
                    <i className="eye-icon fa fa-eye"></i> 
                  </div>
                </div>
              ))}
            </div>
            <div className='manager_online'>
              {viewOnline.map((order, idx) => (
                <div key={idx} className='order_wrapper'>
                  <p></p>
                  {/* Placeholder for online orders status */}
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <DesktopProfile 
          editUser={editUser} 
          user={user ? user.user : null} 
          setShowProfile={setShowProfile} 
        />
      )}
    </ManagerLayout>
  );
};

export default Manager;
