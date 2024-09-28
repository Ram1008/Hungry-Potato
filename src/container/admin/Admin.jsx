import { useContext, useEffect } from 'react';
import './Admin.scss';
import Layout from '../../wrapper/desktopLayout/Layout';
import { UsersTable, DishesTable, TablesTable, DesktopProfile, OrdersTable, DesktopSearch, DesktopNavTab } from '../../component';
import { userContext } from '../../context';
import { adminContext } from '../../container';
import { useNavigate, useLocation } from 'react-router-dom';

const Admin = () => {

  const {user, editUser, getUser} = useContext(userContext);
  const {users, tables, orders, showEditModal, activeTab, setActiveTab, 
     searchTerm, setSearchTerm, fetchTables, fetchDishes, fetchOrders, fetchUsers, activeTable,
     showProfile,  setShowButton,  setShowProfile, setShowAddModal, adminSocket} = useContext(adminContext);

  const navigate = useNavigate();
  const location = useLocation();

  const uniqueRoles = (users) => {
    const uniqueRoles = new Set();
    uniqueRoles.add('All');
    users.forEach((user) => {
      uniqueRoles.add(user.role);
    });
    return Array.from(uniqueRoles);
  };

  const uniqueSeatings = (tables) => {
    const uniqueSeatings = new Set();
    uniqueSeatings.add('All');
    tables.forEach((table) => {
      uniqueSeatings.add(table.restroNumber);
    });
    return Array.from(uniqueSeatings);
  };
  
  const renderTable = () => {
    if(showProfile){
      return <DesktopProfile editUser = {editUser} user = {user? user.user: null} setShowProfile={setShowProfile}/>
    }
    else{
      switch (activeTable) {
        case 'tables':
          return <TablesTable/>;
        case 'orders':
          return <OrdersTable />;
        case 'users':
          return <UsersTable />;
        case 'dishes':
          return <DishesTable/>;
        default:
          return <TablesTable/>;
      }}
  };
  const onLoad = async () => {
    fetchDishes();
    fetchUsers();
    fetchOrders();
    fetchTables();
    setShowButton(true);
    const response = await getUser();
    if (!response) {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  const renderNav = () =>{
    if(!(showProfile || showEditModal)){
      
      if(activeTable === 'tables'){
        return(
          <div className='body-nav'>
            <div className='nav-search'><DesktopSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
            <div className='body-tab'><DesktopNavTab activeTab={activeTab} setActiveTab={setActiveTab} tabData={uniqueSeatings(tables)} /></div>
            <button onClick = {() => setShowAddModal(true)}  className='add-button'>+ Add a table</button>
          </div>
        )
      }else if(activeTable === 'orders' || activeTable === 'users'){
        return(<div className='body-nav'>
            <div className='nav-search'><DesktopSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
            <div className='body-tab'><DesktopNavTab activeTab={activeTab} setActiveTab={setActiveTab} tabData={activeTable === 'orders' ? uniqueSeatings(orders): uniqueRoles(users)} /></div>
          </div>)
      }else{
        return(<div className='body-nav'>
            <div className='nav-search'><DesktopSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
            <button onClick = {() => setShowAddModal(true)} className='add-button'>+ Add a dish</button>
          </div>)
      }
    }
  }

  useEffect(() =>{
    onLoad();
  }, [])

  return (
    <Layout 
      props={{
        heading:'Welcome Admin',
        showNav: true,
        user,
      }}
    
    >
      <div className='admin_container'>
        {renderNav()}
        <hr />
        {renderTable()} 
      </div>
    </Layout>
  );
};

export default Admin;
