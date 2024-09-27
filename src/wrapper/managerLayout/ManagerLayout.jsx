import { memo } from 'react';
import './ManagerLayout.scss';
import UserProfile from '../../assets/images/UserProfilePhoto.svg';
import { DesktopSearch, DesktopNavTab } from '../../component';
import { useLocation, useNavigate } from 'react-router-dom';

const ManagerLayout = ({ props, children }) => {
  const {
    heading,
    showProfile,
    setShowProfile,
    dineInOrders,
    setActiveRestro,
    searchTerm,
    setSearchTerm,
    user,
    activeRestro,
    showLogin = true,
    showBody = true,
    showSummary = false
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const handleProfileClick = () => setShowProfile(true);

  const uniqueSeatings = new Set(['All', ...(dineInOrders?.map(order => order.restroNumber) || [])]);
  const tabOptions = Array.from(uniqueSeatings);

  const handleLogout = () => {
    localStorage.removeItem('hungry&Potato-token');
    navigate('/login', { state: { from: location.pathname } });
  };

  return (
    <div className="managerLayout_container">
      <header>
        <div className="logo"></div>
        {showLogin && (
          <div className='btn-container'>
            {user ? (
              <button className='button-danger' onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button className='button-primary'>Login</button>
                <button className='button-primary'>Register</button>
              </>
            )}
          </div>
        )}
      </header>
      <div className="managerLayout_body">
        <div className="body-header">
          <h1>{heading}</h1>
          {showLogin && (
            <img
              src={user?.user.profilePicture.url || UserProfile}
              onClick={handleProfileClick}
              alt="Profile"
            />
          )}
        </div>
        {showBody && !showProfile && !showSummary && (
          <div className='body-nav'>
            <div className='nav-search'>
              <DesktopSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className='body-tab'>
              <DesktopNavTab activeTab={activeRestro} setActiveTab={setActiveRestro} tabData={tabOptions} />
            </div>
          </div>
        )}
        <hr />
        {children}
      </div>
    </div>
  );
};

export default memo(ManagerLayout);
