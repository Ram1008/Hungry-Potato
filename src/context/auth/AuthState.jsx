import authContext from './authContext';
import { host } from '../../constants/appConstants'; 

const AuthState = (props) => {
  const url = `${host}/users`;

  const fetchApi = async (url, method, body = null, requireToken = true) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (requireToken) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('hungry&Potato-token')}`;
    }
  
    try {
      const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
      const json = await response.json();
      return {
        status: response.ok,
        data: json,
      };
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  };

  const register = async (name, type, phone, otp) => {
    const response = await fetchApi(`${url}/register`, 'POST', { name, type, phone, otp });
    if (response.status) localStorage.setItem('hungry&Potato-token', response.data.token);
    return response;
  };
  
  const login = async (number, otp) => {
    const response = await fetchApi(`${url}/login`, 'POST', { phone: number, otp: otp });
    if (response.status) localStorage.setItem('hungry&Potato-token', response.data.token);
    return response;
  };
  
  const getOtp = async (number) => {
    const response = await fetchApi(`${host}/otp-services/send-otp`, 'POST', { phone: number });
    return response;
  };
  
  const contextValue = {
    login,
    register,
    getOtp,
  };

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
