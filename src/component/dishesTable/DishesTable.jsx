import './dishesTable.scss';
import { Dish } from '../../constants/dishConstants';
import React from 'react';

const DishesTable = () => {
    const handleEditClick = () =>{
    
    }
    const handleDeleteClick = () =>{
  
    }
  return (

    <table className="users_table">
          <thead>
            <tr>
              <th>Name</th>
              {Dish[0].servingSize.map((item, idx) =>(
                <th key={idx}>{item.size}</th>
              ))
                }
              <th>Tags</th>
              <th>Availability</th>
              <th>Veg/Non-Veg</th>
              <th className="action_column">Action</th>
            </tr>
          </thead>
          <tbody>
            {Dish.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                {item.servingSize.map((item, idx) =>(
                    <td key={idx}>{item.price}</td>
                ))}
                <td>
                {item.tags.map((item, idx) =>(
                    <td key={idx}>{item}</td>
                ))}
                </td>
                <td>{item.available}</td>
                <td>{item.foodType}</td>

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

export default DishesTable;