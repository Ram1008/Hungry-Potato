import { memo, useContext } from 'react';
import './DesktopLayout.scss';
import UserIcon from '../../assets/icons/users.svg';
import CurrentStatusIcon from '../../assets/icons/currentStatus.svg';
import DishesIcon from '../../assets/icons/dishes.svg';
import UserProfile from '../../assets/images/UserProfilePhoto.svg';
import { adminContext } from '../../container';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ props, children}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    heading,
    showNav,
    user,
  } = props;
  const {

    setShowProfile,
    setActiveTable,
    activeTable,
  } = useContext(adminContext);



  const handleProfileClick = () => {
    setShowProfile(true);
  };

  
  const handleActiveTable = (name) =>{
    if(activeTable !== name) setActiveTable(name);
  }

  const handleLogout = () => {
    localStorage.removeItem('hungry&Potato-token');
    navigate('/login', { state: { from: location.pathname } });
  };
  const handleLogin = () => {
    localStorage.removeItem('hungry&Potato-token');
    navigate('/login', { state: { from: location.pathname } });
  };
  const handleRegister = () => {
    localStorage.removeItem('hungry&Potato-token');
    navigate('/register', { state: { from: location.pathname } });
  };
  
  return (
    <div className="layout_container">
      <header>
        <div className="logo"></div>
        {showNav && (
          <nav>
            <button onClick={() => handleActiveTable('tables')} className={`nav-button ${activeTable === 'tables'? 'active': ''}`}>
              <img src={CurrentStatusIcon} alt="Tables" /> Tables
            </button>
            <button onClick={() => handleActiveTable('orders')} className={`nav-button ${activeTable === 'orders'? 'active': ''}`}>
              <img src={CurrentStatusIcon} alt="Orders" /> Orders
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

        {user ? (
              <button className='button-danger' onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button className='button-primary' onClick={handleLogin}>Login</button>
                <button className='button-primary' onClick={handleRegister}>Register</button>
              </>
            )}
        </div>
      </header>
      <div className="layout_body">
        <div className="body-header">
          <h1>{heading}</h1>
          <img src={user?user.user.profilePicture.url:UserProfile} onClick={handleProfileClick} alt="Profile" />
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default memo(Layout);
