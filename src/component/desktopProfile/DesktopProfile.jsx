import { useState } from 'react';
import './DesktopProfile.scss';
import { avatars } from '../../constants/profileConstants';
import ProfilePhoto from '../../assets/images/desktopProfileImage.svg';
import { IMAGEURL } from '../../constants/appConstants';


const DesktopProfile = ({setShowProfile, editUser, user}) => {

  const imageURL = `${IMAGEURL}user/`;

  const [profileImage, setProfileImage] = useState(user && user.profilePicture ? imageURL+user.profilePicture.filename : ProfilePhoto|| avatars[0]);
  const [name, setName] = useState(user && user.name || '');
  const [email, setEmail] = useState(user && user.email || '');
  const [dob, setDob] = useState(user && user.dateOfBirth || '');
  const [address, setAddress] = useState(user && user.address ||'');
  const [photoFile, setPhototFile] = useState(null);

  const handleAvatarChange = (avatar) => {
    setProfileImage(avatar);
  };

  const handleImageChange = (event) =>{
    const file = event.target.files[0];
    if (file) {
        setProfileImage(URL.createObjectURL(file)); 
        setPhototFile(file);
    }

  }

  const handleUpdateChanges = () => {
    
    editUser(name, address, dob, photoFile, email);
  };
  

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
                    value={user?user.phone:''}
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
         <button className='update-btn' onClick={handleUpdateChanges}>Update profile</button>
         <button className='back-btn' onClick={() => setShowProfile(false)}>Back to orders</button>
        </div>
    </div>
  );
};

export default DesktopProfile;
