  import { host } from './constants/appConstants';

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
      const response = await fetch(url, { method, headers,  body: body ? body : null});
      const json = await response.json();
      return {
        status: response.ok,
        data: json,
      };
    } catch (error) {
      return {
        status: false,
        message: `Error fetching API: ${error.message || error}`,
      };
    }
  };

  //Dish apis

export const getDishes = async () => {
    const response = await fetchApi(`${host}/dishes`, 'GET', null, false);
    if (response.status)return response.data;
    else return null;
  };

export const addDish = async ( name, description, addons, tags, servingSize, available, dishImage, foodType) => {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);
    if (addons) formData.append('addons', JSON.stringify(addons));  
    if (tags) formData.append('tags', JSON.stringify(tags));
    if (servingSize) formData.append('servingSize', JSON.stringify(servingSize));  
    if (available)formData.append('available', available);
    if (dishImage) formData.append('dishImage', dishImage);
    if (foodType) formData.append('foodType', foodType);
  
    const response = await fetchApi(`${host}/dishes`, 'POST', formData, true);

    if (response.status)return response.data;
    else return null;

  };

  export const editDish = async (id, name, description, addons, tags, servingSize, available, dishImage, foodType) => {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);
    if (addons) formData.append('addons', JSON.stringify(addons));  
    if (tags) formData.append('tags', JSON.stringify(tags)); 
    if (servingSize) formData.append('servingSize', JSON.stringify(servingSize));
    if (available)formData.append('available', available);
    if (dishImage) formData.append('dishImage', dishImage);
    if (foodType) formData.append('foodType', foodType);
  
    const response = await fetchApi(`${host}/dishes/${id}`, 'PUT', formData, true);

    if (response.status)return response.data;
    else return null;
  };

  export const deleteDish = async (id) => {
    const response = await fetchApi(`${host}/dishes/${id}`, 'DELETE', null, true);
    if (response.status)return response.data;
    else return null;
  };

  // auth apis

  export const register = async (name, type, phone, otp) => {
    const response = await fetchApi(`${url}/register`, 'POST', { name, type, phone, otp });
    if (response.status)return response.data;
    else return null;
  };

  export const login = async (number, otp) => {
    const response = await fetchApi(`${url}/login`, 'POST', { phone: number, otp: otp });
    if (response.status)return response.data;
    else return null;
  };

  export const getOtp = async (number) => {
    const response = await fetchApi(`${host}/otp-services/send-otp`, 'POST', { phone: number });
    if (response.status) return response.data;
    else return null;
  };

// user apis

export const getUserProfile = async () => {
        const response = await fetchApi(`${host}/users/profile`, 'GET', null, true);
        if (response.status) return response.data;
        else return null;
    };
    
export const editUserProfile = async (name, address, dateOfBirth, profilePicture, email) => {
        const formData = new FormData();
        if (name) formData.append('name', name);
        if (address) formData.append('address', address);
        if (dateOfBirth) formData.append('dateOfBirth', dateOfBirth);
        if (profilePicture) formData.append('profilePicture', profilePicture); 
        if (email) formData.append('email', email);
        
        const response = await fetchApi(`${host}/users/profile`, 'PUT',formData, true);
        if (response.status) return response.data;
        else return null;
    };

export const getUsers = async () => {
        const response = await fetchApi(`${host}/admin/users`, 'GET', null, true);
        if (response.status) return response.data;
        else return null;
    };

export const addUser = async (name, address, dateOfBirth, profilePicture, email, phone) => {
        const response = await fetchApi(`${host}/admin/users`, 'POST', { name, address, dateOfBirth, profilePicture, email, phone });
        if (response.status) return response.data;
        else return null;
    };

export const deleteUser = async (id) => {
        const response = await fetchApi(`${host}/admin/users/${id}`, 'DELETE');
        if (response.status) return response.data;
        else return null;
    };

export const editUser = async (id, name, address, dateOfBirth, profilePicture, email) => {
        const formData = new FormData();
        if (name) formData.append('name', name);
        if (address) formData.append('address', address);
        if (dateOfBirth) formData.append('dateOfBirth', dateOfBirth);
        if (profilePicture) formData.append('profilePicture', profilePicture); 
        if (email) formData.append('email', email);
    
        const response = await fetchApi(`${host}/admin/users/${id}`, 'PUT', formData, true);
        if (response.status) return response.data;
        else return null;
    };

//table apis

export const getTables = async () =>{
    const response = await fetchApi(`${host}/tables`, 'GET', null, true);
    if (response.status) return response.data;
    else return null;
};

export const addTable = async (restroNumber, tableNumber, status, seats) => {
    const response = await fetchApi(`${host}/tables`, 'POST', { restroNumber, tableNumber, status, seats }, true);
    if (response.status) return response.data;
    else return null;
};

export const editTable = async (tableId, restroNumber, tableNumber, status, seats) =>{
    const response = await fetchApi(`${host}/tables/${tableId}`, 'PUT', {restroNumber, tableNumber, status, seats}, true);
    if (response.status) return response.data;
    else return null;
};

export const deleteTable = async (tableId) =>{
    const response = await fetchApi(`${host}/tables/${tableId}`, 'DELETE', null, true);
    if (response.status) return response.data;
    else return null;
};

export const bookTable = async (tableId) =>{
    const response = await fetchApi(`${host}/tables/occupied/${tableId}`);
    if (response.status) return response.data;
    else return null;
}

export const getOrdersOnTable = async (tableId)=>{
    const response = await fetchApi(`${host}/tables/${tableId}`, 'GET');
    if (response.status) return response.data;
    else return null;
};

export const getDineinOrders = async () => {
    const response = await fetchApi(`${host}/tables/current-orders`, 'GET', null, true);
    if (response.status) return response.data.tables;
    else return null;
};

//orders apis

export const getOrders = async () =>{
    const response = await fetchApi(`${host}/orders`, 'GET', null, true);
    if (response.status) return response.data;
    else return null;
};  

export const getCurrentOrders = async () =>{
    const response = await fetchApi(`${host}/orders/current`, 'GET');
    if (response.status) return response.data.orders;
    else return null;
};

export const getUncookedOrders = async () =>{
    const response = await fetchApi(`${host}/orders/unprepared`, 'GET', null, true);
    if (response.status) return response.data.orders;
    else return null;
};  

export const addOrder = async (tableId, order) => {
    let newBody = {};
    newBody.tableId = tableId;
    newBody.ord = order;

    
    const response = await fetchApi(`${host}/orders`, 'POST', newBody, true);
    if (response.status) return response.data;
    else return null;
};

export const editOrder = async (orderId, status = null) =>{
    const response = await fetchApi(`${host}/orders/${orderId}`, 'PUT', {status: status || 'prepared'}, true);
    if (response.status) return response.data;
    else return null;
};

export const deleteOrder = async (orderId) => {
    const response = await fetchApi(`${host}/orders/${orderId}`, 'DELETE', null, true);
    if (response.status) return response.data;
    else return null;
};

export const getOnlineOrders = async () => {
    const response = await fetchApi(`${host}/orders/online-orders`, 'GET', null, true);
    if (response.status) return response.data.tables;
    else return null;
};

// payment apis

export const payOnCounter = async () => {
  const response = await fetchApi(`${host}/payment/confirm-table-payment`, 'GET', null, true);
    if (response.status) return response.data.tables;
    else return null;
}


