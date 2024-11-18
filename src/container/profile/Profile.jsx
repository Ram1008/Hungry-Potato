import './Profile.scss';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import UserProfilePhoto from '../../assets/images/UserProfilePhoto.svg';

const Profile = () => {
  const { editUser, user, getUser } = useContext(userContext);
  const [profilePicture, setProfilePicture] = useState(user? user.user.profilePicture.url : UserProfilePhoto);
  const [profileName, setProfileName] = useState(user.user.name);
  const [profileDOB, setProfileDOB] = useState(user.user.dateOfBirth || "");
  const [profileAddress, setProfileAddress] = useState(user.user.address || "");
  const [profileEmail, setProfileEmail] = useState(user.user.email || "");
 const [photoFile, setPhototFile] = useState(null);


const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setProfilePicture(URL.createObjectURL(file)); 
    setPhototFile(file);
  }
};
  console.log(user);

  const handleUpdateChanges = () => {
    
    editUser(profileName, profileAddress, profileDOB, photoFile, profileEmail);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('hungry&Potato-token');
    navigate(-1);
  };

  useEffect(() =>{
    if(!user){
      getUser();
    }
  },[])

  return (
    <div className="profile_container">
      <div className="profile_head">
        <div className="profile_picture">
          <img src={profilePicture} name = "profilePicture" alt="Profile" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="profileImageInput"
            name="profilePicture"
          />
          <label htmlFor="profileImageInput"></label>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          id="profileNameInput"
          className="profile_name"
          name='profileName'
        />
        <input
          type="text"
          placeholder="Address"
          value={profileAddress}
          onChange={(e) => setProfileAddress(e.target.value)}
          id="profileAddressInput"
          className="profile_address"
          name='profileAddress'
        />
        <button className="edit_button" onClick={handleUpdateChanges}>
          Update Changes
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr;
        </button>
      </div>
      <div className="profile_body">
        <div className="profile_info">
          <div className="info_item">
            <i className="fas fa-envelope"></i>
            <input
              type="text"
              placeholder="Email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              id="profileEmailInput"
              className="profile_email"
              name='profileEmail'
            />
          </div>
          <div className="info_item">
            <i className="fas fa-phone"></i>
            <span>{user.user.phone}</span>
          </div>
          <div className="info_item">
            <i className="fas fa-birthday-cake"></i>
            <input
              type="date"
              value={profileDOB !== "" ? new Date(profileDOB).toISOString().substring(0, 10) : ""}
              onChange={(e) => setProfileDOB(e.target.value)}
              id="profileDOBInput"
              className="profile_dob"
              name='profileDOB'
            />
          </div>
        </div>
        <div className="profile_orders">
  <h2>Orders</h2>
  {user.orders.map((item) => (
    <div key={item._id} className="orders-list">
      {item.order.map((dish, idx) => (
        <div key={item._id + " " + idx} className="order-item">
          <img src={dish.image} alt={dish.name} />
          <div className="order-details">
            <div className='detail_grp'>
              <p className="order-name">{dish.name} </p>
              <span className="order-price">$&nbsp;{dish.price} </span>
            </div>
            <div className='detail_grp'>
              <p className="order-name">{dish.servingSize}&nbsp;&nbsp;&nbsp;&nbsp; <span className="order-quantity">X {dish.quantity} </span></p>
            </div>
            <div className='detail_grp'>
              {dish.addons.map((addon, index) => (
                <div key={index}>{addon.name}</div>
              ))}
            </div>
            
          </div>
        </div>
      ))}
    </div>
  ))}
</div>

      </div>
      <div className="profile_footer">
        <button className="logout_button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
