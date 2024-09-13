import { useState } from "react";
import './CurrentStatus.scss';
import  DeleteModal  from "../deleteModal/DeleteModal";
import EditTable from "../editTables/EditTable";

const CurrentStatus = ({tables}) => {

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (table) =>{
      setEditData(table);
      setShowEditModal(true);
    }

    const handleDeleteClick = () =>{
      setShowDeleteModal(true);
    }

    const handleDeleteItem = () =>{

      setShowDeleteModal(false);
    }
    const handleEditItem = () =>{

      setShowEditModal(false);
    }

  return (
    <>
      <table className="table_container">
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
            {tables.map((table, index) => (
              <tr key={index}>
                <td>{table.seating}</td>
                <td>{table.tableNumber}</td>
                <td>
                 {table.booked? 'Booked': 'Vacant'}
                </td>
                <td>{table.chairs}</td>

                <td className="action_column">
                  <button className="action_btn edit_btn" onClick={() => handleEditClick(table)}>
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
      {showDeleteModal && <DeleteModal onConfirm={handleDeleteItem} label={"table"} onCancel={() => setShowDeleteModal(false)}/>}
      {showEditModal && <EditTable onConfirm={handleEditItem} editData={editData} onCancel={() => setShowEditModal(false)} />}
      </>
  )
}

export default CurrentStatus;