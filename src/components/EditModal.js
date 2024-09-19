import React from 'react';

const EditModal = ({ form, handleChange, handleSubmit, setShowEditModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                <h2>Edit Item</h2>
                <form onSubmit={handleSubmit}>
                    <label>Date of Purchase:</label>
                    <input type="date" name="date_of_purchase" value={form.date_of_purchase} onChange={handleChange} required />
                    <label>Category:</label>
                    <input type="text" name="category" value={form.category} onChange={handleChange} required />
                    <label>Product Code:</label>
                    <input type="text" name="product_code" value={form.product_code} onChange={handleChange} required />
                    <label>Product Name:</label>
                    <input type="text" name="product_name" value={form.product_name} onChange={handleChange} required />
                    <label>Price:</label>
                    <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required />
                    <label>Warranty Date:</label>
                    <input type="date" name="warranty_date" value={form.warranty_date} onChange={handleChange} required />
                    <label>Status:</label>
                    <select name="status" value={form.status} onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button type="submit">Update Item</button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
