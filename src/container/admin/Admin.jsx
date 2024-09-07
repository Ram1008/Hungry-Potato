import React, { useState } from 'react';
import './admin.scss';
import Layout from '../../wrapper/desktopLayout/Layout';
import { admin } from '../../constants/adminConstants'; 

import { UsersTable, DishesTable, CurrentStatus } from '../../component';

const Admin = () => {
  // State to manage which table is shown
  const [activeTable, setActiveTable] = useState('users');

  const renderTable = () => {
    switch (activeTable) {
      case 'users':
        return <UsersTable admin={admin} />;
      case 'dishes':
        return <DishesTable />;
      case 'currentStatus':
        return <CurrentStatus admin={admin}/>;
      default:
        return <UsersTable admin={admin} />;
    }
  };

  return (
    <Layout 
      heading="Bonjour Cuisinier"
      showTab={true}
      showButton={true}
      showNav={true}
      buttonLabel="Add new user"
      setActiveTable={setActiveTable}
      activeTable = {activeTable}
    >
      <div className='admin_container'>
        {renderTable()} 
      </div>
    </Layout>
  );
};

export default Admin;
