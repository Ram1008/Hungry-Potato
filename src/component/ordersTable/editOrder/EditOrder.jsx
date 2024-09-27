import { memo, useState } from 'react';
import './EditOrder.scss';

const EditOrder = ({ editData = null, onConfirm, onCancel, label  }) => {
    
    const [status, setStatus] = useState(editData ? editData.status : '');
    

    const handleInputChange = (e) => {
        setStatus = (e.target.value);
    };

    const handleSubmit = () => {
        onConfirm(editData?editData._id: null, status);
        onCancel(); 
    };

    return (
        <div className="editOrder_backdrop" onClick={onCancel}>
            <div className="editOrder_container" onClick={(e) => e.stopPropagation()}>
                <div className="editOrder_header">
                    <h2>{label}</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>
                <div className="editOrder_body">
                    <div>
                        <label>Status:</label>
                            <input
                                type="text"
                                name="seating"
                                value={status}
                                onChange={handleInputChange}
                            />
                            <button onClick={() => setStatus('completed')} >Mark Complete</button>
                    </div>
                    
                </div>
                <div className="editOrder_footer">
                    <button type="button" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default memo(EditOrder);
