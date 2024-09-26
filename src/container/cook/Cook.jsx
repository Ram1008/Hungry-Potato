import './Cook.scss';
import { OrderCard, DesktopProfile } from '../../component';
import { useContext, useEffect} from 'react';
import { userContext } from '../../context';
import cookContext from './cookContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ManagerLayout from '../../wrapper/managerLayout/ManagerLayout';

const Cook = () => {
  const { updateOrder, orders, showProfile, setShowProfile, activeRestro, setActiveRestro, searchTerm, setSearchTerm, fetchOrders } = useContext(cookContext);
  const { getUser, editUser, user } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  const viewOrders = activeRestro === 'All' 
    ? orders 
    : orders.filter(order => order.restronumber === activeRestro);

  const filteredOrders = searchTerm
    ? viewOrders.filter(order => 
        order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : viewOrders;
  
  const onLoad = async () => {
    fetchOrders();
    const response = await getUser();
    if (!response) {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <ManagerLayout
      props={{
        heading: "Bonjour Cuisinier",
        showProfile,
        setShowProfile,
        dineInOrders: orders,
        setActiveRestro,
        searchTerm,
        setSearchTerm,
        user,
        activeRestro
      }}
    >
      {!showProfile ? (
        <div className='cook_container'>
          <div className='orders-list'>
            {filteredOrders.map((order, index) => (
              <OrderCard key={index} order={order} markComplete={updateOrder} />
            ))}
          </div>
        </div>
      ) : (
        <DesktopProfile editUser={editUser} user={user ? user.user : null} setShowProfile={setShowProfile} />
      )}
    </ManagerLayout>
  );
};

export default Cook;
