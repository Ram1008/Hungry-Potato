import './deleteModal.scss'; 

const DeleteConfirmationModal = ({ onConfirm, onCancel, label }) => {
    return (
        <div className='delete_modal'>
            <div className='modal_content'>
                <p>Are you sure you want to delete this {label}?</p>
                <button onClick={onConfirm} className='confirm_button'>Yes, Delete</button>
                <button onClick={onCancel} className='cancel_button'>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
