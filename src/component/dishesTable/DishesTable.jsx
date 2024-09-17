import React, { useContext, useState } from 'react';
import  DeleteModal  from "../deleteModal/DeleteModal";
import EditDish from '../editDish/EditDish';
import { adminContext, dishContext } from '../../context';
import './DishesTable.scss';

const DishesTable = ({dishes}) => {
  const { setEditData, addATable, deleteData,showAddModal, setShowAddModal, setDeleteData, setShowEditModal, setShowDeleteModal, showDeleteModal, deleteTable, showEditModal, editData, editTable, activeTab, searchTerm } = useContext(adminContext);
  const { editDish, deleteDish, addDish } = useContext(dishContext);
  
  let filteredDishes = dishes;

  const emptyDish = {
    name:'',
    description: '',
    addons: [{ name: '', price: ''}],
    tags: [],
    servingSize: [{size: '', price: ''}],
    availibility: false,
    image: null, 
    foodType: ''

  }

  if (searchTerm) {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
  
    filteredDishes = dishes.filter(dish => {
  
      return (
        dish.name.toLowerCase().includes(lowercasedSearchTerm) ||
        dish.description.toLowerCase().includes(lowercasedSearchTerm)
      );
    });
  }

    const handleEditClick = (dish) =>{
      setEditData(dish);
      setShowEditModal(true);
    }

    const handleDeleteClick = (dishId) =>{
      setDeleteData(dishId);
      setShowDeleteModal(true);
    }

    const handleDeleteDish = (dishId) =>{
      deleteDish(dishId);
      setShowDeleteModal(false);
    }
    const handleEditDish = (id, name, description, addons, tags, servingSize, availibility, image, foodType) =>{
      console.log(id, name, description, addons, tags, servingSize, availibility, image, foodType)
      editDish(id, name, description, addons, tags, servingSize, availibility, image, foodType)
      setShowEditModal(false);
    }

    const handleAddDish = (id, name, description, addons, tags, servingSize, availibility, image, foodType) =>{
      addDish(name, description, addons, tags, servingSize, availibility, image, foodType);
    }

  return (
    <>
      <table className="dish_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Serving - Price</th>
              <th>Tags</th>
              <th>Addons</th>
              <th>Availability</th>
              <th>Veg/Non-Veg</th>
              <th className="action_column">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDishes.map((dish, index) => {
              const tags = dish.tags.join(',')
              return(
              
              <tr key={index}>
                <td>
                    <div className="user_info">
                      <img src={dish.image.url || dish.image} alt="avatar" className="avatar" />
                      <span>{dish.name}</span>
                    </div>
                  </td>
                <td>
                  {dish.servingSize.map((item) => ` ${item.size} - ${item.price} `)}
                </td>
                <td>
                {dish.tags.map((item,) =>`${item} `)}
                </td>
                <td>
                   {dish.addons.map((item,) =>`${item.name}- ${item.price} `)}
                </td>
                <td>{dish.available?'Available':'Un-Available'}</td>
                <td>{dish.foodType}</td>

                <td className="action_column">
                  <button className="action_btn edit_btn" onClick={() => handleEditClick(dish)}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button className="action_btn delete_btn" onClick={() => handleDeleteClick(dish._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        {showDeleteModal && <DeleteModal onConfirm={() => handleDeleteDish(deleteData)} label={"dish"} onCancel={() => setShowDeleteModal(false)}/>}
        {showEditModal && <EditDish onConfirm={handleEditDish} editData={editData} onCancel={() => setShowEditModal(false)} label = "Edit Dish"/>}
        {showAddModal &&(
          <EditDish onConfirm={handleAddDish} editData={emptyDish} onCancel={() => setShowAddModal(false)} label = "Add Dish"/>
        )}
      </>
  )
}

export default DishesTable;