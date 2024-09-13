import React, { useContext, useState } from 'react';
import './Admin.scss';
import Layout from '../../wrapper/desktopLayout/Layout';
import { admin } from '../../constants/adminConstants'; 

import { UsersTable, DishesTable, CurrentStatus, DesktopProfile, OrdersTable } from '../../component';
import { orderContext, userContext } from '../../context';

const Admin = () => {
  // State to manage which table is shown
  const [activeTable, setActiveTable] = useState('currentStatus');
  const {users, user, editUser} = useContext(userContext);
  const {pendingOrders, pastOrders} = useContext(orderContext);
  const [showProfile, setShowProfile] = useState(false);

  // const orders = [...pendingOrders, ...pastOrders];

  const renderTable = () => {
    switch (activeTable) {
      case 'users':
        return <UsersTable users={admin.users} />;
      case 'orders':
        return <OrdersTable users={admin.users} orders={admin.orders} />;
      case 'dishes':
        return <DishesTable />;
      case 'currentStatus':
        return <CurrentStatus tables={admin.tables}/>;
      default:
        return <UsersTable admin={admin} />;
    }
  };

  return (
    <Layout 
      heading="Welcome Admin"
      showTab={!showProfile ? true: false}
      showButton={!showProfile ? true: false}
      showNav={!showProfile ? true: false}
      buttonLabel="Add new user"
      setActiveTable={setActiveTable}
      activeTable = {activeTable}
      setShowProfile={setShowProfile}
      showSearchBar = {true}    
    >
      {!showProfile ? <div className='admin_container'>
        {renderTable()} 
      </div>:
      <DesktopProfile editUser = {editUser} user = {user? user.user: null} setShowProfile={setShowProfile}/>}
    </Layout>
  );
};

export default Admin;
