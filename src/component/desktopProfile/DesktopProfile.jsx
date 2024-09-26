import { memo, useState } from 'react';
import './DesktopProfile.scss';
import { avatars } from '../../constants/profileConstants';


const DesktopProfile = ({setShowProfile, editUser, user}) => {


  const [profilePicture, setProfilePicture] = useState(user ? user.profilePicture.url  : avatars[0]);
  const [name, setName] = useState(user && user.name || '');
  const [email, setEmail] = useState(user && user.email || '');
  const [dob, setDob] = useState(user && user.dateOfBirth || '');
  const [address, setAddress] = useState(user && user.address ||'');
  const [photoFile, setPhototFile] = useState(null);

  const handleAvatarChange = (avatar) => {
    setProfilePicture(avatar);
  };

  const handleImageChange = (event) =>{
    const file = event.target.files[0];
    if (file) {
        setProfilePicture(URL.createObjectURL(file)); 
        setPhototFile(file);
    }

  }

  const handleUpdateChanges = () => {
    
    editUser(name, address, dob, photoFile, email);
    setShowProfile(false);
  };
  

  return (
    <div className="desktop-profile">
      <div className="profile-image-section">
        <div className="profile-image" >
            <img src={profilePicture} alt="Profile" className="profile-image" />
        </div>
        <div className='image-tools'> 
            <div className='image-change'>
                <p>
                    Change profile image
                </p>
                <input
                    type="file"
                    onChange={handleImageChange}
                    id="profilePicture"
                    name="profilePicture"
                />
                <label htmlFor="profilePicture"></label>
            </div>
            <div className='choose-avatar'>
                <p>Or choose an avatar</p>
                <div className="avatar-options">
                {avatars.map((avatar, index) => (
                    <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className={`avatar ${profilePicture === avatar ? 'selected' : ''}`}
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
                    name='name'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name='email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                    name='phone'
                    id="phone"
                    type="text"
                    value={user?user.phone:''}
                    readOnly
                />
            </div>

            <div className="input-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                name='dob'
                type="date"
                value={dob !== "" ? new Date(dob).toISOString().substring(0, 10) : ""}
                onChange={(e) => setDob(e.target.value)}
                id="profileDOBInput"
                className="profile_dob"
                />

            </div>
            <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    name= 'address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

        </div>
        <div className="update-profile"> 
         <button className='update-btn' onClick={handleUpdateChanges}>Update profile</button>
         <button className='back-btn' onClick={() => setShowProfile(false)}>Back to orders</button>
        </div>
    </div>
  );
};

export default memo(DesktopProfile);
