import Layout from '../../wrapper/desktopLayout/Layout';
import './Cook.scss';
import { OrderCard, DesktopProfile } from '../../component';
import { useContext, useEffect } from 'react';
import { adminContext, userContext,orderContext } from '../../context';



const Cook = () => {
  
  const { getAllOrders, orders, editOrder} = useContext(orderContext);
  const { showProfile, setShowProfile } = useContext(adminContext);
  const { getUser, editUser, user } = useContext(userContext);


  const todaysDate = new Date();
  const yesterdaysDate = new Date();

  const pendingOrders =  orders ?  orders.filter(item => {
    if(item.status == 'preparing' || item.status == 'pending') return true;

  }):[];


  const todayOrders = orders ? orders.filter(order => {
    const orderDate = new Date(order.updatedAt).getDate();
    return order.status !== 'pending' && order.status !== 'preparing' && todaysDate === orderDate ;
  }  ): [];


  const yesterdayOrders = orders ?orders.filter(order => {
    const orderDate = new Date(order.updatedAt).getDate();
    return order.status !== 'pending' && order.status !== 'preparing' && yesterdaysDate === orderDate; 
  }  ):[];


  const pastOrders = orders ?orders.filter(order => {
    const orderDate = new Date(order.updatedAt).getDate();
    return order.status !== 'pending' && order.status !== 'preparing' && todaysDate !== orderDate &&  yesterdaysDate !== orderDate; 
  }  ):[];



  useEffect( () =>{
    getUser();
    getAllOrders();
  }, [])

  return (
    <Layout heading="Bonjour Cuisinier">
      {!showProfile ? <div className='cook_container'>
        <div className='active-orders'>
          <p className='status'>Pending</p>
          <div className='orders-list'>
            {pendingOrders.map((order, index) => (

              <OrderCard key={index} order={order} markComplete={editOrder} />
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
            {pastOrders.map((order, index) => (
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
