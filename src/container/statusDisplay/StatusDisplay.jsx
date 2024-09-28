import './StatusDisplay.scss';
import { useContext, useEffect} from 'react';
import statusDisplayContext from './statusDisplayContext';
import ManagerLayout from "../../wrapper/managerLayout/ManagerLayout";

const StatusDisplay = () => {
    const {orders, fetchOrders, commanSocket} = useContext(statusDisplayContext);

    useEffect(() => {
        fetchOrders();
        commanSocket();
      }, []); 

  return (
    <ManagerLayout props = {{heading: "Your Happy Meal", showLogin: false, showBody: false}}>
        <table className='status_container'>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Dishes</th>
            <th>Table Number / Online</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order._id.slice(-4)}</td>
              <td>{order.dishes.map(dish => dish.name).slice(0, 3).join(', ')}</td>
              <td>{order.tableNumber? order.tableNumber : 'Online'}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </ManagerLayout>
  )
}

export default StatusDisplay