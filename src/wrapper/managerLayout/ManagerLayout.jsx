import { useContext, useEffect } from 'react';
import './ManagerLayout.scss';
import UserProfile from '../../assets/images/UserProfilePhoto.svg';
import { DesktopSearch, DesktopNavTab } from '../../component';
import { userContext } from '../../context';
import {managerContext} from '../../container';

const ManagerLayout = ({ props, children}) => {

    const {heading, showProfile, setShowProfile, dineInOrders, onlineOrders, setActiveRestro, searchTerm, setSearchTerm, user, activeRestro, showLogin = true, showBody = true } = props;
    
    const handleProfileClick = () => {
        setShowProfile(true);
    };

    const uniqueSeatings = new Set();
    uniqueSeatings.add('All');
    dineInOrders ? dineInOrders.forEach((order) => {
      uniqueSeatings.add(order.restroNumber);
    }): null;
    const tabOptions = Array.from(uniqueSeatings);

    // console.log(tabOptions)
    
    

  return (
    <div className="managerLayout_container">
      <header>
        <div className="logo"></div>
        
        {showLogin && <div className='btn-container'>

          {user == null ? <><button className='button-primary'>Login</button>
          <button className='button-primary'>Register</button></> :
          <button className='button-danger'>Logout</button>}
        </div>}
      </header>
      <div className="managerLayout_body">
        <div className="body-header">
          <h1>{heading}</h1>
          {showLogin &&<img src={user?user.user.profilePicture.url:UserProfile} onClick={handleProfileClick} alt="Profile" />}
        </div>
        {showBody && <div className='body-nav'>
          {!showProfile && 
            <>
              <div className='nav-search'><DesktopSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/></div>
              <div className='body-tab'><DesktopNavTab activeTab={activeRestro} setActiveTab={setActiveRestro} tabData={tabOptions} /></div>
            </>
          }
        </div>}
        <hr />
        {children}
      </div>
    </div>
  );
};

export default ManagerLayout;
