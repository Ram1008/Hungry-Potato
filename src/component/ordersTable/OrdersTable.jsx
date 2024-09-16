

const OrdersTable = ({orders}) => {

    const handleEditClick = () =>{
    
    }
    const handleDeleteClick = () =>{
  

    }

    const dishes = [];
    orders.forEach(element => {
      element.order.forEach(dish =>{
        dishes.push(dish.name)
      })
    });

  return (
    <table className="admin_table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Seating</th>
              <th>Table Number</th>
              <th>Ordered dishes</th>
              <th>Addons</th>
              <th>Serving</th>
              <th>Price</th>
              <th className="action_column">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                {/* <td>{status.seating}</td> */}
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
        </table>
  )
}

export default OrdersTable ;