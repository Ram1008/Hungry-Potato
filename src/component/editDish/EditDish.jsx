import { useState } from 'react';
import './EditDish.scss';
import { host } from '../../constants/appConstants';

const EditDish = ({ editData, onConfirm, onCancel }) => {

    const [name, setName] = useState(editData? editData.name : '');
    const [foodType, setFoodType] = useState(editData? editData.foodType : '');
    const [description, setDescription] = useState(editData? editData.description : '');
    const [servingSize, setServingSize] = useState(editData? editData.servingSize : []);
    const [tags, setTags] = useState(editData? editData.tags.join(', ') : '');
    const [available, setAvailable] = useState(editData? editData.available : false);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(editData? editData.image.url? editData.image.url : editData.image? editData.image:'': '');
    const [addons, setAddons] = useState(editData? editData.addons:[]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'foodType':
                setFoodType(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'tags':
                setTags(value);
                break;
            default:
                break;
        }
    };

    const handleCheckboxChange = (e) => {
        setAvailable(e.target.checked);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
            if (file) {
                setPreviewImage(URL.createObjectURL(file)); 
                setImage(file);
            }
    };

    const handleServingSizeChange = (index, field, value) => {
        const newServingSize = [...servingSize];
        newServingSize[index] = {
            ...newServingSize[index],
            [field]: value,
        };
        setServingSize(newServingSize);
    };
    const handleAddonChange = (index, field, value) => {
        const newAddons = [...addons];
        newAddons[index] = {
            ...newAddons[index],
            [field]: value,
        };
        setAddons(newAddons);
    };

    const handleSubmit = () => {
        // Ensure the servingSize and addons are correctly passed as arrays of objects
        onConfirm(
            editData ? editData._id : null, 
            name, 
            description,
            addons,  // Pass the addons array of objects
            tags.split(',').map(tag => tag.trim()),  // Split tags into an array
            servingSize,  // Pass the servingSize array of objects
            available,
            image,
            foodType
        );
        onCancel();
    };
    

    return (
        <div className="editDish_backdrop" onClick={onCancel}>
            <div className="editDish_container" onClick={(e) => e.stopPropagation()}>
                <div className="editDish_header">
                    <h2>Edit Dish</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>
                <div className="editDish_body">
                    <div>
                        <label htmlFor= "name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Food Type:</label>
                        <input
                            type="text"
                            name="foodType"
                            value={foodType}
                            onChange={handleInputChange}
                        />
                    
                    </div>
                    <div>
                    <label>
                        Description:
                        </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div>
                            
                    <label>
                        Available:
                        </label>
                        <input
                            type="checkbox"
                            name="available"
                            checked={available}
                            onChange={handleCheckboxChange}
                        />
                        </div>
                        <div>
                    <label>
                        Tags:
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={tags}
                            onChange={handleInputChange}
                        />
                    </div>
                    {servingSize.map((size, index) => (
                        <div key={index}>
                            <div>
                            <label>
                                Serving Size {index + 1}:
                                </label>
                                <input
                                    type="text"
                                    value={size.size}
                                    onChange={(e) =>
                                        handleServingSizeChange(index, 'size', e.target.value)
                                    }
                                />
                                </div>
                                <div>
                            <label>
                                Price:
                                </label>
                                <input
                                    type="number"
                                    value={size.price}
                                    onChange={(e) =>
                                        handleServingSizeChange(index, 'price', e.target.value)
                                    }
                                />
                                </div>
                        </div>
                    ))}
                    {addons.map((addon, index) => (
                        <div key={index}>
                            <div>
                            <label>
                                Addon {index + 1}:
                                </label>
                                <input
                                    type="text"
                                    value={addon.name}
                                    onChange={(e) =>
                                        handleAddonChange(index, 'name', e.target.value)
                                    }
                                />
                                </div>
                                <div>
                            <label>
                                Price:
                                </label>
                                <input
                                    type="number"
                                    value={addon.price}
                                    onChange={(e) =>
                                        handleAddonChange(index, 'price', e.target.value)
                                    }
                                />
                                </div>
                        </div>
                    ))}
                    <div>
                    <label>
                        Upload Image:
                        </label>
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
                <div className="editDish_footer">
                    <button type="button" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditDish;
