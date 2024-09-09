// import React from 'react';
import Layout from '../../wrapper/desktopLayout/Layout';
import './Cook.scss';
import {orders} from '../../constants/orderContants';
import { OrderCard, DesktopProfile } from '../../component';
import { useState } from 'react';



const Cook = () => {
  const pendingOrders = orders.filter(order => order.isPending);
  const todayOrders = orders.filter(order => !order.isPending );
  const yesterdayOrders = orders.filter(order => !order.isPending);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <Layout  ayout 
    heading="Bonjour Cuisinier"
    setShowProfile={setShowProfile}>
      {!showProfile ? <div className='cook_container'>
        <div className='active-orders'>
          <p className='status'>Pending</p>
          <div className='orders-list'>
            {pendingOrders.map((order, index) => (
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
      </div>:
      <DesktopProfile setShowProfile={setShowProfile}/>}
    </Layout>
  );
};

export default Cook;
