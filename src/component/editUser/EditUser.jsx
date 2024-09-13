import { useState } from 'react';
import './editUser.scss';
import { host } from '../../constants/appConstants';

const EditUser = ({ editData, onConfirm, onCancel }) => {

    const imageURL = `${host}/uploads/`;
    const [updatedUser, setUpdatedUser] = useState(editData || {});
    const [previewImage, setPreviewImage] = useState(editData?.profilePicture || '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setUpdatedUser({
                    ...updatedUser,
                    profilePicture: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        onConfirm(updatedUser);
        onCancel();
    };

    return (
        <div className="modal__overlay" onClick={onCancel}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Edit User</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>
                <div className="modal__body">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedUser.name || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={updatedUser.email || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={updatedUser.phone || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={updatedUser.address || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={updatedUser.dateOfBirth ? new Date(updatedUser.dateOfBirth).toISOString().substring(0, 10) : ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Upload Profile Picture:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                    {previewImage && (
                        <img
                            src={previewImage.startsWith('data') ? previewImage : imageURL + previewImage}
                            alt="Preview"
                            className="modal__image-preview"
                        />
                    )}
                </div>
                <div className="modal__footer">
                    <button type="button" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
