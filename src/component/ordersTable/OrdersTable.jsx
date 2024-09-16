

const OrdersTable = ({orders}) => {

  const { setEditData, addATable, deleteData,showAddModal, setShowAddModal, setDeleteData, setShowEditModal, setShowDeleteModal, showDeleteModal, deleteTable, showEditModal, editData, editTable, activeTab, searchTerm } = useContext(adminContext);

  let viewOrders = activeTab === 'All' ? orders : orders.filter(order => order.restroNumber === activeTab)

  if (searchTerm) {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
  
    viewOrders = viewOrders.filter(order => {
      let dishesNamesArray = [];
      order.order.map(dish =>{
        dishesNamesArray.push(dish.name.toLowerCase());
      })
      dishesNamesArray = dishesNamesArray.join(' ');
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
    deleteTable(orderId);
    setShowDeleteModal(false);
  };

  const handleEditOrder = (id, seating, tableNumber, status, chairs) => {
    editTable(id, seating, tableNumber, status, chairs)
    setShowEditModal(false);
  };

  return (
    <table className="admin_table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Seating</th>
              <th>Table Number</th>
              {}
              <th>Ordered dishes</th>
              <th>Addons</th>
              <th>Serving</th>
              <th>Price</th>
              <th className="action_column">Action</th>
            </tr>
          </thead>
          {/* <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                { <td>{status.seating}</td> }
                <td>{order.tableNumber}</td>
                <td>
                 {dishes.map((dish) => {dish})}
                </td>
                <td>{order.chairs}</td>

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
          
          
          */}

        </table>
  )
}

export default OrdersTable ;