import { useContext } from 'react';
import './Layout.scss';
import UserIcon from '../../assets/icons/users.svg';
import CurrentStatusIcon from '../../assets/icons/currentStatus.svg';
import DishesIcon from '../../assets/icons/dishes.svg';
import UserProfile from '../../assets/images/UserProfilePhoto.svg';
import { DesktopSearch, DesktopNavTab } from '../../component';
import { adminContext, orderContext, userContext } from '../../context';

const Layout = ({ children, heading }) => {
  const { user, users } = useContext(userContext);
  const { orders } = useContext(orderContext);
  const { tables, showSearch, setShowButton, showProfile, setButtonLabel, setTabData, setShowTab, activeTable, setShowAddModal, setShowProfile, showNav, setActiveTable, showButton, buttonLabel, showTab} = useContext(adminContext);


  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleAddClick = () =>{
    setShowAddModal(true);
  }

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
  
  const handleActiveTable = (name) =>{
    setActiveTable(name);
    switch(name){
      case 'users':
        setShowTab(true);
        setShowButton(false);
        setTabData(uniqueRoles(users));
        setButtonLabel("Add a user");
        break;
      case 'orders':
        setShowTab(true);
        setTabData(uniqueSeatings(orders));
        setButtonLabel("Add an order");
        setShowButton(false);
        break;
      case 'dishes':
        setShowButton(true);
        setShowTab(false);
        setButtonLabel("Add a dish");
        break;
        case 'currentStatus':
        setShowButton(true);
        setShowTab(true);
        setButtonLabel("Add a table");
        setTabData(uniqueSeatings(tables));
        break;
      default:
          break;
    }
  }

  return (
    <div className="layout_container">
      <header>
        <div className="logo"></div>
        {showNav && (
          <nav>
            <button onClick={() => handleActiveTable('currentStatus')} className={`nav-button ${activeTable === 'currentStatus'? 'active': ''}`}>
              <img src={CurrentStatusIcon} alt="Current Status" /> Current Status
            </button>
            <button onClick={() => handleActiveTable('orders')} className={`nav-button ${activeTable === 'orders'? 'active': ''}`}>
              <img src={CurrentStatusIcon} alt="Current Status" /> Orders
            </button>
            <button onClick={() => handleActiveTable('users')} className={`nav-button ${activeTable === 'users'? 'active': ''}`}>
              <img src={UserIcon} alt="Users" /> Users   
            </button>
            <button onClick={() => handleActiveTable('dishes')} className={`nav-button ${activeTable === 'dishes'? 'active': ''}`}>
              <img src={DishesIcon} alt="Dishes" /> Dishes
            </button>
          </nav>
        )}
        <div className='btn-container'>

          {user == null ? <><button className='button-primary'>Login</button>
          <button className='button-primary'>Register</button></> :
          <button className='button-danger'>Logout</button>}
        </div>
      </header>
      <div className="layout_body">
        <div className="body-header">
          <h1>{heading}</h1>
          <img src={user?user.user.profilePicture.url:UserProfile} onClick={handleProfileClick} alt="Profile" />
        </div>
        <div className='body-nav'>
          {!showProfile && 
            <>
              {showSearch && <div className='nav-search'><DesktopSearch /></div>}
              {activeTable === 'dishes' ? null : showTab &&  <div className='body-tab'><DesktopNavTab /></div>}
              {showButton && <button onClick={handleAddClick} className='add-button'>+ {buttonLabel}</button>}
            </>
          }
        </div>
        <hr />
        {children}
      </div>
    </div>
  );
};

export default Layout;
