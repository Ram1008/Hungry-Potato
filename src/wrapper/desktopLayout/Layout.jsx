import './layout.scss';
import UserIcon from '../../assets/icons/users.svg'
import CurrentStatusIcon from '../../assets/icons/currentStatus.svg'
import DishesIcon from '../../assets/icons/dishes.svg'
import UserProfile from '../../assets/images/UserProfilePhoto.svg'
import { DesktopSearch, DesktopNavTab } from '../../component';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const Layout = ({ heading, showTab = false, showButton = false, showNav= false, buttonLabel=null, buttonLink=null, setShowProfile, children }) => {

    // const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(true);

    const handleButtonClick = () =>{

    }
    const handleProfileClick = () =>{
      setShowSearch(false);
      setShowProfile(true); 
    }

  return (
    <div className="layout_container">
      <header>
        <div></div>
        {showNav && <nav>
            
            <h3> <img src={CurrentStatusIcon}/> Current Status </h3>
            <h3> <img src={UserIcon}/> Users </h3>
            <h3> <img src={DishesIcon}/> Dishes </h3>

        </nav>}
      </header>
      <div className="layout_body">
        <div className="body-header">
          <h1>{heading}</h1>
          <img src={UserProfile} onClick={handleProfileClick} alt="" />
        </div>
        {showTab && <div className='body-tab'>
            <DesktopNavTab/>
        </div>}
        <div className='body-nav'>
            {showSearch && <div className='nav-search'>
                <DesktopSearch/>
            </div>}
            {showButton && <button onClick={handleButtonClick}>+{buttonLabel}</button>}
        </div>
        
        <hr />
          {children}
      </div>
    </div>
  )
}

export default Layout;
