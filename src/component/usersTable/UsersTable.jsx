import './UsersTable.scss';
import UserProfile from '../../assets/images/UserProfilePhoto.svg';
import  DeleteModal  from "../deleteModal/DeleteModal";
import { adminContext } from '../../container';
import { useContext } from 'react';
import EditUser from './editUser/EditUser';

  const UsersTable = () => {
    const { users, removeUser, updateUser, setEditData,  setDeleteData, setShowEditModal, setShowDeleteModal, showDeleteModal, showEditModal, editData, activeTab, searchTerm } = useContext(adminContext);

    let viewUsers = activeTab === 'All' ? users : users.filter(user => user.role === activeTab)

    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
    
      viewUsers = viewUsers.filter(user => {
    
        return (
          user.name.toLowerCase().includes(lowercasedSearchTerm) ||
          (user.email.toLowerCase().includes(lowercasedSearchTerm) )||
          (user.phone.toLowerCase().includes(lowercasedSearchTerm))
        );
      });
    }

      const handleEditClick = (user) =>{
        setEditData(user);
        setShowEditModal(true);
      }

      const handleDeleteClick = (userId) =>{
        setDeleteData(userId);
        setShowDeleteModal(true);
      }

      const handleDeleteUser = (userId) =>{
        removeUser(userId);
        setShowDeleteModal(false);
      }
      const handleEditUser = (id, name, address, dateOfBirth, profilePicture, email) =>{
        updateUser(id, name, address, dateOfBirth, profilePicture, email)
        setShowEditModal(false);
      }

      
    return (
      <>
      <table className='admin_table'>
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
              {viewUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <div className="user_info">
                      <img src={user.profilePicture? user.profilePicture.url :    UserProfile} alt="avatar" className="avatar" />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.address}</td>
                  <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>

                  <td className="action_column">
                    <button className="action_btn edit_btn" onClick={() => handleEditClick(user)}>
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className="action_btn delete_btn" onClick={() => handleDeleteClick(user._id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
          {showEditModal && <EditUser onConfirm={handleEditUser} editData={editData} onCancel={() => setShowEditModal(false)} label= 'Edit User' />}
          {showDeleteModal && <DeleteModal onConfirm={handleDeleteUser} label={"user"} onCancel={() => setShowDeleteModal(false)}/>}
        </>
    )
  }

  export default UsersTable