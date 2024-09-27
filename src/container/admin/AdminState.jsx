import { useState} from 'react';
import adminContext from './adminContext';
import { getTables, editTable, deleteTable, addTable, editOrder, getOrders, deleteOrder, getUsers, deleteUser, editUser, getDishes, deleteDish, editDish, addDish } from '../../api';
import { toast } from 'react-toastify'; 
import io from 'socket.io-client';

const AdminState = ({ children }) => {
  const [activeTable, setActiveTable] = useState('tables');
  const [showProfile, setShowProfile] = useState(false);
  const [showTab, setShowTab] = useState(false);
  const [tabData, setTabData] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [buttonLabel, setButtonLabel] = useState('Add a dish');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showButton, setShowButton,] = useState(false);
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [dishes, setDishes] = useState([]);



  const fetchTables = async () => {
    const response = await getTables();
    if (response) {
      setTables(response);
      setShowTab(true);
    }
  };

  const updateTable = async (tableId, restroNumber, tableNumber, status, seats) => {
    const response = await editTable(tableId, restroNumber, tableNumber, status, seats);
    if (response) { 
      toast.success('Table updated successfully!', { autoClose: 2500 });
      fetchTables();
    }
  };

  const removeTable = async (tableId) => {
    const response = await deleteTable(tableId);
    if (response) {
      toast.success('Table deleted successfully!', { autoClose: 2500 });
      fetchTables();
    }
  };

  const createTable = async (restroNumber, tableNumber, status, seats) => {
    const response = await addTable(restroNumber, tableNumber, status, seats);
    if (response) {
      setTables([...tables, response]);
      toast.success('Table added successfully!', { autoClose: 2500 });
      setShowAddModal(false);
    }
  };

  const fetchOrders = async () =>{
    const response = await getOrders();
    if (response) {
        setOrders(response.orders);
    }
  }

  const removeOrder = async (orderId)=>{
    const response = await deleteOrder(orderId);
    if (response) {
        toast.success('Order deleted successfully!', { autoClose: 2500 });
    }
  }

  const updateOrder = async (orderId, status)=>{
    const response = await editOrder(orderId, status);
    if (response) {
        toast.success('Order updated successfully!', { autoClose: 2500 });
        fetchOrders();
    }
  }

  const fetchUsers = async () =>{
    const response = await getUsers();
    if (response) {
        setUsers(response);
    }
  }

  const removeUser = async (orderId)=>{
    const response = await deleteUser(orderId);
    if (response) {
        toast.success('User deleted successfully!', { autoClose: 2500 });
        fetchUsers();
    }
  }

  const updateUser = async (orderId, status)=>{
    const response = await editUser(orderId, status);
    if (response) {
        toast.success('User updated successfully!', { autoClose: 2500 });
        fetchUsers();
    }
  }
  const fetchDishes = async () =>{
    const response = await getDishes();
    if (response) {
        setDishes(response);
    }
  }

  const removeDish = async (dishId)=>{
    const response = await deleteDish(dishId);
    if (response) {
        toast.success('Dish deleted successfully!', { autoClose: 2500 });
        fetchDishes();
    }
  }

  const updateDish = async (id, name, description, addons, tags, servingSize, available, dishImage, foodType)=>{
    const response = await editDish(id, name, description, addons, tags, servingSize, available, dishImage, foodType);
    if (response) {
        toast.success('Dish updated successfully!', { autoClose: 2500 });
        fetchDishes();
    }
  }
  const createDish = async (name, description, addons, tags, servingSize, available, dishImage, foodType)=>{
    const response = await addDish(name, description, addons, tags, servingSize, available, dishImage, foodType);
    if (response) {
        toast.success('Dish added successfully!', { autoClose: 2500 });
        fetchDishes();
    }
  }

  const adminSocket = () =>{

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

  const contextValue = {
    activeTable,
    showTab,
    activeTab,
    setActiveTab,
    tabData,
    buttonLabel, 
    showButton,
    setShowButton,
    setActiveTable,
    showProfile,
    setShowProfile,
    setButtonLabel,
    setShowTab,
    setTabData,
    showEditModal,
    setShowEditModal,
    editData,
    setEditData,
    deleteData,
    setDeleteData,
    showDeleteModal,
    setShowDeleteModal,
    searchTerm,
    setSearchTerm,
    showAddModal,
    setShowAddModal,
    tables,
    orders,
    users,
    dishes,
    updateTable,
    removeTable,
    createTable,
    fetchTables,
    removeOrder,
    fetchOrders,
    updateOrder,
    fetchUsers,
    removeUser,
    updateUser,
    fetchDishes,
    createDish,
    removeDish,
    updateDish,
    adminSocket
  };

  return (
    <adminContext.Provider value={contextValue}>
      {children}
    </adminContext.Provider>
  );
};

export default AdminState;
