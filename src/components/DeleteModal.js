import React from 'react';

const DeleteModal = ({ handleDeleteConfirm, setShowDeleteModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this item?</p>
                <button onClick={handleDeleteConfirm}>Yes</button>
                <button onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
        </div>
    );
};

export default DeleteModal;
