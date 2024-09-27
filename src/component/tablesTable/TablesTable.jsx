import { useContext } from "react";
import './TablesTable.scss';
import DeleteModal from "../deleteModal/DeleteModal";
import EditTable from "./editTable/EditTable";
import AddTable from "./editTable/EditTable";
import { adminContext } from "../../container";

const TablesTable = () => {
  const {updateTable, deleteTable, activeTab, tables,
    searchTerm, setEditData, setShowEditModal, setShowAddModal,
    setShowDeleteModal, setDeleteData, createTable, showDeleteModal,
    showEditModal, showAddModal, deleteData, editData  } = useContext(adminContext);

  let viewTables = activeTab === 'All' ? tables : tables.filter(table => table.restroNumber === activeTab)

  if (searchTerm) {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
  
    viewTables = viewTables.filter(table => {
      const isSearchTermNumber = !isNaN(searchTerm);
  
      return (
        table.tableNumber.toLowerCase().includes(lowercasedSearchTerm) ||
        (isSearchTermNumber && table.seats === Number(searchTerm)) || 
        table.status.toLowerCase().includes(lowercasedSearchTerm)
      );
    });
  }
  

  const handleEditClick = (table) => {
    setEditData(table);
    setShowEditModal(true);
  };

  const handleDeleteClick = (tableId) => {
    setDeleteData(tableId);
    setShowDeleteModal(true);
  };

  const handleDeleteTable = (tableId) => {
    deleteTable(tableId);
    setShowDeleteModal(false);
  };

  const handleEditTable = (id, seating, tableNumber, status, chairs) => {
    updateTable(id, seating, tableNumber, status, chairs)
    setShowEditModal(false);
  };

  const handleAddTable = (id, seating, tableNumber, status, chairs) =>{
    createTable(seating, tableNumber, status, chairs);
    setShowAddModal(false);
  }

  return (
    <>
      <table className="currentStatus_container">
        <thead>
          <tr>
            <th>Restaurent</th>
            <th>Table Number</th>
            <th>Booking Status</th>
            <th>Number of chairs</th>
            <th className="action_column">Action</th>
          </tr>
        </thead>
        <tbody>
          {viewTables.map((table, index) => (
            <tr key={index}>
              <td>{table.restroNumber}</td>
              <td>{table.tableNumber}</td>
              <td>{table.status}</td>
              <td>{table.seats}</td>

              <td className="action_column">
                <button className="action_btn edit_btn" onClick={() => handleEditClick(table)}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="action_btn delete_btn" onClick={() => handleDeleteClick(table._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteModal && (
        <DeleteModal onConfirm={() => handleDeleteTable(deleteData)} label={"table"} onCancel={() => setShowDeleteModal(false)} />
      )}
      {showEditModal && (
        <EditTable onConfirm={handleEditTable} editData={editData} onCancel={() => setShowEditModal(false)} label = "Edit Table" />
      )}
      {showAddModal &&(
        <AddTable onConfirm={handleAddTable} onCancel={() => setShowAddModal(false)} label = "Add Table"/>
      )

      }
    </>
  );
};

export default TablesTable;
