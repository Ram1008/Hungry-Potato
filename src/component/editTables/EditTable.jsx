import { useState } from 'react';
import './editTable.scss';

const EditTable = ({ editData, onConfirm, onCancel }) => {
    
    const [seating, setSeating] = useState(editData.seating || '');
    const [tableNumber, setTableNumber] = useState(editData.tableNumber || '');
    const [booked, setBooked] = useState(editData.booked || false);
    const [chairs, setChairs] = useState(editData.chairs || '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'seating':
                setSeating(value);
                break;
            case 'tableNumber':
                setTableNumber(value);
                break;
            case 'booked':
                setBooked(e.target.checked);
                break;
            case 'chairs':
                setChairs(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        const updatedTable = { seating, tableNumber, booked, chairs };
        onConfirm(updatedTable);
        onCancel(); 
    };

    return (
        <div className="editTable_backdrop" onClick={onCancel}>
            <div className="editTable_container" onClick={(e) => e.stopPropagation()}>
                <div className="editTable_header">
                    <h2>Edit Table</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>
                <div className="editTable_body">
                    <div>
                        <label>Seating:</label>
                            <input
                                type="text"
                                name="seating"
                                value={seating}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>Table Number:</label>
                        <input
                            type="text"
                            name="tableNumber"
                            value={tableNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Booked:</label>
                        <input
                            type="checkbox"
                            name="booked"
                            checked={booked}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Number of Chairs:</label>
                        <input
                            type="number"
                            name="chairs"
                            value={chairs}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="editTable_footer">
                    <button type="button" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditTable;
