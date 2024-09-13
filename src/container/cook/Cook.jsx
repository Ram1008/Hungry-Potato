import Layout from '../../wrapper/desktopLayout/Layout';
import './Cook.scss';
import {orders} from '../../constants/orderContants';
import { OrderCard, DesktopProfile } from '../../component';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../../context';
import { orderContext } from '../../context';



const Cook = () => {

  const { pendingOrders, pastOrders, getPendingOrders, getPastOrders } = useContext(orderContext);
  
  const { getUser, editUser, user } = useContext(userContext);
  
  const todayOrders = orders.filter(order => !order.isPending );
  const yesterdayOrders = orders.filter(order => !order.isPending);
  const [showProfile, setShowProfile] = useState(false);


  useEffect( () =>{
    getUser();
    getPendingOrders();
    getPastOrders();
  }, [])

  return (
    <Layout
    heading="Bonjour Cuisinier"
    showSearchBar = {false}
    setShowProfile={setShowProfile}>

      {!showProfile ? <div className='cook_container'>
        <div className='active-orders'>
          <p className='status'>Pending</p>
          <div className='orders-list'>
            {orders.map((order, index) => (

              <OrderCard key={index} order={order} />
            ))}
          </div>
        </div>
        <hr />
        <div className='past-orders'>
          <p className='status'>Today</p>
          <div className='orders-list'>
            {todayOrders.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </div>
        </div>
        <hr />
        <div className='past-orders'>
          <p className='status'>Yesterday</p>
          <div className='orders-list'>
            {yesterdayOrders.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </div>
        </div>
        <div className='past-orders'>
          <p className='status'>Past orders</p>
          <div className='orders-list'>
            {yesterdayOrders.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </div>
        </div>
      </div>:
      <DesktopProfile editUser = {editUser} user = {user? user.user: null} setShowProfile={setShowProfile}/>}
    </Layout>
  );
};

export default Cook;
