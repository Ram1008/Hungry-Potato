import { useContext, useState } from 'react';
import userContext from './userContext';
import { host } from '../../constants/appConstants';
import adminContext from '../admin/adminContext';


const UserState = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  // const {setTabData, setShowTab, setButtonLabel} = useContext(adminContext)

  const fetchApi = async (url, method, body = null, requireToken = false) => {
    const headers = {};
    
    if (requireToken) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('hungry&Potato-token')}`;
    }

    if (body) {
      if (body instanceof FormData) {
        // headers['Content-Type'] = 'application/json';
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
      }
      
    }
  
    try {
      const response = await fetch(url, { method, headers, body: body ? body : null});
      const json = await response.json();

      return {
        status: response.ok,
        data: json
      };
    } catch (error) {
      return {
        status: false,
        data: error
      };
    }
  };

  const getUser = async () => {
    const response = await fetchApi(`${host}/users/profile`, 'GET', null, true);
    if (response.status) {
      setUser(response.data);
      return response.status;
    }
  };
  

  const getUsers = async () => {
    const {status, data} = await fetchApi(`${host}/admin/users`, 'GET', null, true);
    if (status) {
      setUsers(data);
    }
  };

  const addUser = async (name, address, dateOfBirth, profilePicture, email, phone) => {
    const {status, data} = await fetchApi(`${host}/admin/users`, 'POST', { name, address, dateOfBirth, profilePicture, email, phone });
    if (status) setUsers([...users, data]);
  };

  const deleteUser = async (id) => {
    const {status} = await fetchApi(`${host}/admin/users/${id}`, 'DELETE');
    if (status) {
      setUsers(users.filter(user => user._id !== id));
    //   props.showAlert(data.msg, "success");
    } else {
    //   props.showAlert('An error occurred while deleting the user.', "error");
    }
  };

  const editUser = async (name, address, dateOfBirth, profilePicture, email) => {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (address) formData.append('address', address);
    if (dateOfBirth) formData.append('dateOfBirth', dateOfBirth);
    if (profilePicture) formData.append('profilePicture', profilePicture); 
    if (email) formData.append('email', email);
    

    const response = await fetchApi(`${host}/users/profile`, 'PUT',formData, true);
    if (response.status) {
      console.log("Successfully edited", response.data);
      getUser();
    }
  };

  const editUserAdmin = async (id, name, address, dateOfBirth, profilePicture, email) => {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (address) formData.append('address', address);
    if (dateOfBirth) formData.append('dateOfBirth', dateOfBirth);
    if (profilePicture) formData.append('profilePicture', profilePicture); 
    if (email) formData.append('email', email);
    

    const response = await fetchApi(`${host}/admin/users/${id}`, 'PUT', formData, true);
    if (response.status) {
      console.log("Successfully edited", response.data);
    }
  };
  
  const getUsersByRole = async (role) => {
    const data = await fetchApi(`your-api-url/users/role`, 'POST', { role });
    if (data) setUsers(data);
  };




  return (
    <userContext.Provider value={{ user, getUser, getUsers, getUsersByRole, addUser, deleteUser, editUser, editUserAdmin, users }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
