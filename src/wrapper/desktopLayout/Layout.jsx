import React, { useState } from 'react';
import './Layout.scss';
import UserIcon from '../../assets/icons/users.svg';
import CurrentStatusIcon from '../../assets/icons/currentStatus.svg';
import DishesIcon from '../../assets/icons/dishes.svg';
import UserProfile from '../../assets/images/UserProfilePhoto.svg';
import { DesktopSearch, DesktopNavTab } from '../../component';

const Layout = ({ heading, showTab = false, showButton = false, showNav = false, buttonLabel = null, setShowProfile, setActiveTable, activeTable= null, children }) => {
  const [showSearch, setShowSearch] = useState(true);

  const handleProfileClick = () => {
    setShowSearch(false);
    setShowProfile(true);
  };

  return (
    <div className="layout_container">
      <header>
        <div className="logo"></div>
        {showNav && (
          <nav>
            <button onClick={() => setActiveTable('currentStatus')} className={`nav-button ${activeTable === 'currentStatus'? 'active': ''}`}>
              <img src={CurrentStatusIcon} alt="Current Status" /> Current Status
            </button>
            <button onClick={() => setActiveTable('users')} className={`nav-button ${activeTable === 'users'? 'active': ''}`}>
              <img src={UserIcon} alt="Users" /> Users   
            </button>
            <button onClick={() => setActiveTable('dishes')} className={`nav-button ${activeTable === 'dishes'? 'active': ''}`}>
              <img src={DishesIcon} alt="Dishes" /> Dishes
            </button>
          </nav>
        )}
      </header>
      <div className="layout_body">
        <div className="body-header">
          <h1>{heading}</h1>
          <img src={UserProfile} onClick={handleProfileClick} alt="Profile" />
        </div>
        <div className='body-nav'>
          {showSearch && <div className='nav-search'><DesktopSearch /></div>}
          {showButton && <button onClick={() => {}} className='add-button'>+{buttonLabel}</button>}
        </div>
        {showTab && <div className='body-tab'><DesktopNavTab /></div>}
        <hr />
        {children}
      </div>
    </div>
  );
};

export default Layout;
