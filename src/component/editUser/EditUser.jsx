import { useState } from 'react';
import './EditUser.scss';

const EditUser = ({ editData, onConfirm, onCancel, label }) => {

    const [name, setName] = useState(editData? editData.name : '');
    const [email, setEmail] = useState(editData? editData.email : '');
    const [phone, setPhone] = useState(editData? editData.phone : '');
    const [address, setAddress] = useState(editData? editData.address : '');
    const [dateOfBirth, setDateOfBirth] = useState(editData? editData.dateOfBirth : '');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(editData? editData.profilePicture && editData.profilePicture.url:  '');



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'dateOfBirth':
                setDateOfBirth(value);
                break;
            default:
                break;
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
            if (file) {
                setPreviewImage(URL.createObjectURL(file)); 
                setImage(file);
            }
    };


    const handleSubmit = () => {
        onConfirm(editData ? editData._id : null, name, address, dateOfBirth, image, email);
        onCancel();
    };

    return (
        <div className="editUser_backdrop" onClick={onCancel}>
            <div className="editUser_container" onClick={(e) => e.stopPropagation()}>
                <div className="editUser_header">
                    <h2>{label}</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>
                <div className="editUser_body">
                    <div>
                        <label htmlFor= "name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>
                        Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={phone || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                    <label>
                        Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={address || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                    <label>
                        Date of Birth:</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={dateOfBirth ? new Date(dateOfBirth).toISOString().substring(0, 10) : ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                    <label>
                        Upload Profile Picture:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    {previewImage && (
                        <div className="image-preview">
                            <img
                                src={previewImage}
                                alt="Preview"
                            />
                        </div>
                    )}
                </div>
                <div className="editUser_footer">
                    <button type="button" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
