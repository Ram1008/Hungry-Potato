import { useContext } from "react";
import { adminContext, orderContext } from "../../context";
import './OrderTable.scss'
import  DeleteModal  from "../deleteModal/DeleteModal";
import EditOrder from "../editOrder/EditOrder";

const OrdersTable = ({orders}) => {

  const { setEditData, addATable, deleteData,showAddModal, setShowAddModal, setDeleteData, setShowEditModal, setShowDeleteModal, showDeleteModal, deleteTable, showEditModal, editData, editTable, activeTab, searchTerm } = useContext(adminContext);
  const{ deleteOrder, editOrder } = useContext(orderContext);

  let viewOrders = activeTab === 'All' ? orders : orders.filter(order => order.restroNumber === activeTab)

  if (searchTerm) {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    viewOrders = viewOrders.filter(order => {
      let dishesNamesArray = [];
      order.order.map(dish =>{
        dishesNamesArray.push(dish.name.toLowerCase());
      })
      return (
        order.tableNumber.toLowerCase().includes(lowercasedSearchTerm) ||
        (order.price.toLowerCase().includes(lowercasedSearchTerm)) ||
        (dishesNamesArray.includes(lowercasedSearchTerm)) 
      );
    });
  }

  const handleEditClick = (order) => {
    setEditData(order);
    setShowEditModal(true);
  };

  const handleDeleteClick = (orderId) => {
    setDeleteData(orderId);
    setShowDeleteModal(true);
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId);
    setShowDeleteModal(false);
  };

  const handleEditOrder = (id, status) => {
    editOrder(id, status)
    setShowEditModal(false);
  };

  return (
    <>
    <table className="orders_table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Seating</th>
              <th>Table Number</th>
              <th>Status</th>
              <th>Ordered dishes</th>
              <th>Price</th>
              <th className="action_column">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewOrders.map((order, index) => (
              <tr key={index}>
                { <td>{new Date(order.updatedAt).toLocaleDateString()}</td> }
                { <td>{order.restroNumber}</td> }
                <td>{order.tableNumber}</td>
                <td>{order.status}</td>
                <td className="dishes-container">
                 {order.dishes.map((dish, idx) =>  (
                    <div  key={idx}>
                      <p>Name: {dish.name}</p>
                      <p>Quantity: {dish.quantity}</p>
                      <p>Size: {dish.servingSize}</p>
                      <p>Price: {dish.price}</p>
                      <p>Addons: {dish.addons.map((addon) => ` ${addon.name}- ${addon.price} `)}</p>
                    </div>
                  )
                 )}
                </td>
                <td>{order.totalAmount}</td>

                <td className="action_column">
                  <button className="action_btn edit_btn" onClick={() => handleEditClick(order)}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button className="action_btn delete_btn" onClick={() => handleDeleteClick(order._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody> 
        </table>
        {showDeleteModal && <DeleteModal onConfirm={() => handleDeleteOrder(deleteData)} label={"order"} onCancel={() => setShowDeleteModal(false)}/>}
        {showEditModal && <EditOrder onConfirm={handleEditOrder} editData={editData} onCancel={() => setShowEditModal(false)} label = "Edit Order"/>}
        </>
  )
}

export default OrdersTable ;