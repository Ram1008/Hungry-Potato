  import './UsersTable.scss';
  import UserProfile from '../../assets/images/UserProfilePhoto.svg';
  import  DeleteModal  from "../deleteModal/DeleteModal";
import DesktopProfile from '../desktopProfile/DesktopProfile';
import { adminContext, userContext } from '../../context';
import { useContext } from 'react';

  const UsersTable = ({users}) => {
    const { setEditData, setShowProfile, showProfile, addATable, deleteData,showAddModal, setShowAddModal, setDeleteData, setShowEditModal, setShowDeleteModal, showDeleteModal, deleteTable, showEditModal, editData, editTable, activeTab, searchTerm } = useContext(adminContext);
    const {deleteUser, editUserAdmin, addUser} = useContext(userContext);

      const handleEditClick = (user) =>{
        setEditData(user);
        setShowProfile(true);
      }

      const handleDeleteClick = (userId) =>{
        setDeleteData(userId);
        setShowDeleteModal(true);
      }

      const handleDeleteUser = (userId) =>{
        deleteUser(userId);
        setShowDeleteModal(false);
      }
      const handleEditUser = (id, name, address, dateOfBirth, profilePicture, email) =>{
        editUserAdmin(id, name, address, dateOfBirth, profilePicture, email)
        setShowEditModal(false);
      }

      const handleAddUser = (id, name, address, dateOfBirth, profilePicture, email, phone) =>{
        addUser(name, address, dateOfBirth, profilePicture, email, phone)
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
                    <button className="action_btn delete_btn" onClick={() => handleDeleteClick(user._id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> : showProfile && <DesktopProfile editUser={handleEditUser} user={editData} setShowProfile={setShowProfile} />}
          {showDeleteModal && <DeleteModal onConfirm={handleDeleteUser} label={"user"} onCancel={() => setShowDeleteModal(false)}/>}
          {showAddModal &&(
            <DesktopProfile editUser={handleEditUser} user={editData} setShowProfile={setShowProfile}/>
          )}
        </>
    )
  }

  export default UsersTable