import './profile.scss';
import { useContext, useState } from 'react';
import { userContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { host } from '../../constants/appConstants';
import UserProfilePhoto from '../../assets/images/UserProfilePhoto.svg';

const Profile = () => {
  const imageURL = `${host}/uploads/users/`;
  const { editUser, user } = useContext(userContext);
  const [profilePhoto, setProfilePhoto] = useState(user.user.profilePicture ? imageURL + user.user.profilePicture : UserProfilePhoto);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null); // Store the file object
  const [profileName, setProfileName] = useState(user.user.name);
  const [profileDOB, setProfileDOB] = useState(user.user.dateOfBirth || "");
  const [profileAddress, setProfileAddress] = useState(user.user.address || "");
  const [profileEmail, setProfileEmail] = useState(user.user.email || "");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhotoFile(file); // Store the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // Display the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateChanges = () => {
    editUser(profileName, profileAddress, profileDOB, profilePhotoFile, profileEmail);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('hungry&Potato-token');
    navigate('/');
  };

  return (
    <div className="profile_container">
      <div className="profile_head">
        <div className="profile_picture">
          <img src={profilePhoto} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="profileImageInput"
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
        />
        <input
          type="text"
          placeholder="Address"
          value={profileAddress}
          onChange={(e) => setProfileAddress(e.target.value)}
          id="profileAddressInput"
          className="profile_address"
        />
        <button className="edit_button" onClick={handleUpdateChanges}>
          Update Changes
        </button>
        <button className="back-button" onClick={() => navigate('/')}>
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
            />
          </div>
        </div>
        <div className="profile_orders">
          <h2>Orders</h2>
          <div className="orders-list">
            {user.orders.map((order) => (
              <div key={order._id} className="order-item">
                <img src={order.order[0].image} alt={order.order[0].name} />
                <div className="order-details">
                  <p className="order-name">
                    {order.order[0].name} - <span>{order.order[0].servingSize}</span>
                  </p>
                  <div className="order-addons">
                    {order.order[0].addons.map((addon, index) => (
                      <span key={index}>{addon.name}</span>
                    ))}
                  </div>
                  <div className="order-price">${order.totalAmount}</div>
                </div>
              </div>
            ))}
          </div>
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
