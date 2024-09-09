import './CurrentStatus.scss';

import React from 'react'

const CurrentStatus = ({admin}) => {
    const handleEditClick = () =>{
    
    }
    const handleDeleteClick = () =>{
  
    }
  return (
    <table className="users_table">
          <thead>
            <tr>
              <th>Seating</th>
              <th>Table Number</th>
              <th>Booking Status</th>
              <th>Number of chairs</th>
              <th className="action_column">Action</th>
            </tr>
          </thead>
          <tbody>
            {admin.tables.map((status, index) => (
              <tr key={index}>
                <td>{status.seating}</td>
                <td>{status.tableNumber}</td>
                <td>
                 {status.booked? 'Booked': 'Vacant'}
                </td>
                <td>{status.chairs}</td>

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

export default CurrentStatus;