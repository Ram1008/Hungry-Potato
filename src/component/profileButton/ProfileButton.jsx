import React, { useContext } from 'react';
import './profile.scss';
import { FaUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context';

const ProfileButton = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  console.log(user);
  const handleProfileClick = async () => {
    if (user) { 
      navigate('profile');
    } else {
      navigate('login');
    }
  };

  return (
    <div className='profileButton-container'>
      <button onClick={handleProfileClick}>
        {user && user.profilePicture? <img src= {user.profilePicture}/> :<FaUser size={25} color='#3A3A3A' />}
      </button>
    </div>
  );
};

export default React.memo(ProfileButton);
