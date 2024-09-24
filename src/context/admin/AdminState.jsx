import adminContext from './adminContext';
import { host } from '../../constants/appConstants'; 
import { useState } from 'react';
import io from 'socket.io-client';

const AdminState = (props) => {
    const [activeTable, setActiveTable] = useState('dishes');
    const [showProfile, setShowProfile] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showTab, setShowTab] = useState(false);
    const [tabData, setTabData] = useState([]);
    const [activeTab, setActiveTab] = useState('All')
    const [buttonLabel, setButtonLabel] = useState('Add new dish');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tables, setTables] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

  
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

    const connectToSocket = () =>{

      const socket = io('https://restaurentmanagement-backend.onrender.com/', {transports: ['websocket'],
        withCredentials:true
      });
      

      socket.emit('join-room', 'admin');

      socket.on('newOrder', (notification) => {
        console.log('Admin received new order notification:', notification.order,notification.order.dishes, notification.table, notification);
      });

      socket.on('tableStatusUpdate', (notification)=>{
        console.log('Table update detected : ', notification);
      });

      socket.on('connect', () => {
        console.log('Admin connected to server');
      });

    }

    const getAllTables = async () =>{
      const response = await fetchApi(`${host}/tables`, 'GET', null, true);
      if (response.status) {
        setTables(response.data);
        setShowTab(true);
        
      }
    };

    const editTable = async (tableId, restroNumber, tableNumber, status, seats) =>{
      const response = await fetchApi(`${host}/tables/${tableId}`, 'PUT', {restroNumber, tableNumber, status, seats}, true);
      if (response.status) {
        console.log(response.data); 
        getAllTables();
      }
    };

    const deleteTable = async (tableId) =>{
      const response = await fetchApi(`${host}/tables/${tableId}`, 'DELETE', null, true);
      if (response.status) {
        getAllTables();
      }
    };

    const addATable = async (restroNumber, tableNumber, status, seats) => {
      const response = await fetchApi(`${host}/tables`, 'POST', { restroNumber, tableNumber, status, seats }, true);
      if (response.status) {
        setTables([...tables, response.data]);
      }
    };
    
    


  


  const contextValue = {
    activeTable, setActiveTable, showProfile, setShowProfile, showSearch, setShowSearch,
    showButton, setShowButton,buttonLabel, setButtonLabel, showNav, setShowNav,
    showTab, setShowTab, tabData, setTabData, activeTab, setActiveTab,showEditModal, setShowEditModal,
    editData, setEditData, showDeleteModal, setShowDeleteModal, getAllTables, tables, editTable, deleteTable,
    setDeleteData, deleteData, searchTerm, setSearchTerm, addATable, showAddModal, setShowAddModal, connectToSocket
  };

  return (
    <adminContext.Provider value={contextValue}>
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminState;
