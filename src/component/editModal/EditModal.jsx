import { useState } from 'react';
import './editModal.scss';

const EditModal = ({ editData, onConfirm, onCancel }) => {

    // const imageURL = `${APP_Host}/uploads/`;
    
    const [updatedBlog, setUpdatedBlog] = useState({
        title,
        description,
        image
    });
    const [previewImage, setPreviewImage] = useState(image);

    const handleInputChange = (e) => {
        const { name, value } = e.target;   
        setUpdatedBlog({
            ...updatedBlog,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setUpdatedBlog({
                    ...updatedBlog,
                    image: file, 
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        onConfirm();
        onCancel(false);
    };

    return (
        <div className="modal__overlay" onClick={onCancel}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Edit Blog</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>
                <div className="modal__body">
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={updatedBlog.title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={updatedBlog.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Upload Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                    {previewImage && (
                        <img
                            src={imageURL+previewImage}
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

export default EditModal;
