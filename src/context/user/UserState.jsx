import { useState } from 'react';
import userContext from './userContext';
import { host } from '../../constants/appConstants';


const UserState = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const fetchApi = async (url, method, body = null, requireToken = false) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (requireToken) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('hungry&Potato-token')}`;
    }
  
    try {
      const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null});
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
      console.log(response);
      setUser(response.data);
      return response.status;
    }
  };

  const getUsers = async () => {
    const data = await fetchApi(`your-api-url/users`, 'GET');
    if (data) setUsers(data);
  };

  const getUsersByRole = async (role) => {
    const data = await fetchApi(`your-api-url/users/role`, 'POST', { role });
    if (data) setUsers(data);
  };

  const addUser = async (name, email, dob, mobileNumber) => {
    const data = await fetchApi(`your-api-url/users`, 'POST', { name, email, dob, mobileNumber });
    if (data) setUsers([...users, data]);
  };

  const deleteUser = async (id) => {
    const data = await fetchApi(`your-api-url/users/${id}`, 'DELETE');
    if (data) {
      setUsers(users.filter(user => user._id !== id));
    //   props.showAlert(data.msg, "success");
    } else {
    //   props.showAlert('An error occurred while deleting the user.', "error");
    }
  };

  const editUser = async (name, address, dateOfBirth, profilePhoto, email) => {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (address) formData.append('address', address);
    if (dateOfBirth) formData.append('dateOfBirth', dateOfBirth);
    if (profilePhoto) formData.append('profilePicture', profilePhoto); // Append the file object directly
    if (email) formData.append('email', email);
  
    const response = await fetchApi(`${host}/users/profile`, 'PUT', formData, true);
    if (response.status) {
      console.log("Successfully edited", response.data);
    }
  };

  return (
    <userContext.Provider value={{ user, getUser, getUsers, getUsersByRole, addUser, deleteUser, editUser }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
