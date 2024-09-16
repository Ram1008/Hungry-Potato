import { useContext, useEffect } from 'react';
import './Admin.scss';
import Layout from '../../wrapper/desktopLayout/Layout';
import { UsersTable, DishesTable, CurrentStatus, DesktopProfile, OrdersTable } from '../../component';
import { adminContext, dishContext, orderContext, userContext } from '../../context';

const Admin = () => {
  
  const {users, user, editUser, getUser, getUsers} = useContext(userContext);
  const {getDishes, dishes} = useContext(dishContext);
  const {orders} = useContext(orderContext);
  const {activeTable, showProfile, setShowSearch, setShowButton, setShowNav, setShowProfile, tables,getAllTables} = useContext(adminContext);

  console.log(users)
  const renderTable = () => {
    switch (activeTable) {
      case 'currentStatus':
        return <CurrentStatus tables={tables}/>;
      case 'orders':
        return <OrdersTable orders={orders} />;
      case 'users':
        return <UsersTable users={users} />;
      case 'dishes':
        console.log(dishes)
        return <DishesTable dishes={dishes} />;
      default:
        return <CurrentStatus tables={tables}/>;
    }
  };
  useEffect(() =>{
    getUser();
    getUsers();
    getDishes();
    getAllTables();
    setShowNav(true);
    setShowSearch(true);
    setShowButton(true);
  }, [])
  return (
    <Layout heading='Welcome Admin'>
      {!showProfile ? <div className='admin_container'>
        {renderTable()} 
      </div>:
      <DesktopProfile editUser = {editUser} user = {user? user.user: null} setShowProfile={setShowProfile}/>}
    </Layout>
  );
};

export default Admin;
