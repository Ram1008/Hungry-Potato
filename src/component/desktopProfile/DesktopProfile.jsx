import React, { useState } from 'react';
import './DesktopProfile.scss';
import { cook, avatars } from '../../constants/profileConstants';
import './desktopProfile.scss';
import ProfilePhoto from '../../assets/images/desktopProfileImage.svg';


const DesktopProfile = ({setShowProfile}) => {
  const [profileImage, setProfileImage] = useState(ProfilePhoto|| avatars[0]);
  const [name, setName] = useState(cook.name || '');
  const [email, setEmail] = useState(cook.email || '');
  const [dob, setDob] = useState(cook.email || '');
  const [address, setAddress] = useState(cook.address||'');

  const handleAvatarChange = (avatar) => {
    setProfileImage(avatar);
  };

  const handleImageChange = () =>{
    

  }
  

  return (
    <div className="desktop-profile">
      <div className="profile-image-section">
        <div className="profile-image" >
            <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
        <div className='image-tools'> 
            <div className='image-change'>
                <p>
                    Change profile image
                </p>
                <button onClick={handleImageChange}></button>

            </div>
            <div className='choose-avatar'>
                <p>Or choose an avatar</p>
                <div className="avatar-options">
                {avatars.map((avatar, index) => (
                    <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className={`avatar ${profileImage === avatar ? 'selected' : ''}`}
                    onClick={() => handleAvatarChange(avatar)}
                    />
                ))}
                </div>
            </div>
            
        </div>
      </div>
      <div className="profile-details-section">
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                    id="phone"
                    type="text"
                    value={cook.phoneNumber}
                    readOnly
                />
            </div>

            <div className="input-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

        </div>
        <div className="update-profile"> 
         <button className='update-btn'>Update profile</button>
         <button className='back-btn' onClick={() => setShowProfile(false)}>Back to orders</button>
        </div>
    </div>
  );
};

export default DesktopProfile;
