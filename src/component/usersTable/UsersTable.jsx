  import React, { useState } from 'react';
  import './UsersTable.scss';
  import UserProfile from '../../assets/images/UserProfilePhoto.svg';
  import  DeleteModal  from "../deleteModal/DeleteModal";
import DesktopProfile from '../desktopProfile/DesktopProfile';

  const UsersTable = ({users}) => {

      const [showProfile, setShowProfile] = useState(false);
      const [editData, setEditData] = useState(null);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
    
      const handleEditClick = (user) =>{
        setEditData(user);
        setShowProfile(true);
      }

      const handleDeleteClick = () =>{
        setShowDeleteModal(true);
      }

      const handleDeleteItem = () =>{

        setShowDeleteModal(false);
      }
      const handleEditItem = () =>{

        setShowEditModal(false);
      }
    return (
      <>
      {!showProfile ? <table className='admin_table'>
            <thead>
              <tr>
                <th>Email address</th>
                <th>Phone</th>
                <th>Name</th>
                <th>Address</th>
                <th>DOB</th>
                <th className="action_column">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <div className="user_info">
                      <img src={user.profilePicture || UserProfile} alt="avatar" className="avatar" />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.address}</td>
                  <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>

                  <td className="action_column">
                    <button className="action_btn edit_btn" onClick={() => handleEditClick(user)}>
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className="action_btn delete_btn" onClick={() => handleDeleteClick(user._id||"")}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> : showProfile && <DesktopProfile editUser={handleEditItem} user={editData} setShowProfile={setShowProfile} />}
          {showDeleteModal && <DeleteModal onConfirm={handleDeleteItem} label={"user"} onCancel={() => setShowDeleteModal(false)}/>}
        </>
    )
  }

  export default UsersTable