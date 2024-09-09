import React from 'react';
import './UsersTable.scss';
import UserProfile from '../../assets/images/UserProfilePhoto.svg';

const UsersTable = ({admin}) => {
    const handleEditClick = () =>{
    
    }
    const handleDeleteClick = () =>{
  
    }
  return (
    <table className="users_table">
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
            {admin.users.map((user, index) => (
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
                  <button className="action_btn edit_btn" onClick={handleEditClick}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button className="action_btn delete_btn" onClick={handleDeleteClick}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default UsersTable