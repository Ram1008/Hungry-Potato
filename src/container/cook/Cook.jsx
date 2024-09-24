import './Cook.scss';
import { OrderCard, DesktopProfile } from '../../component';
import { useContext, useEffect } from 'react';
import { userContext } from '../../context';
import cookContext from './cookContext';
import ManagerLayout from '../../wrapper/managerLayout/ManagerLayout';



const Cook = () => {
  
  const { updateOrder, orders, showProfile, setShowProfile, activeRestro, setActiveRestro, searchTerm, setSearchTerm, fetchOrders } = useContext(cookContext);
  const { getUser, editUser, user } = useContext(userContext);

  let viewOrders = activeRestro === 'All' ? orders : orders.filter(order => order.restronumber === activeRestro)

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

  useEffect( () =>{
    getUser();
    fetchOrders();
  }, [])

  return (
    <ManagerLayout
    props = {{heading: "Bonjour Cuisinier" , showProfile , setShowProfile, dineInOrders: orders, setActiveRestro, searchTerm, setSearchTerm, user, activeRestro}}>

      {!showProfile ? <div className='cook_container'>
          <div className='orders-list'>
            {viewOrders.map((order, index) => (
              <OrderCard key={index} order={order} markComplete={updateOrder} />
            ))}
          </div>
        </div>:
      <DesktopProfile editUser = {editUser} user = {user? user.user: null} setShowProfile={setShowProfile}/>}
    </ManagerLayout>
  );
};

export default Cook;
