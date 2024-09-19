import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryTable.css';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const InventoryTable = () => {
    const [inventory, setInventory] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAscending, setIsAscending] = useState(true); // State to track sort order
    const [form, setForm] = useState({
        date_of_purchase: '',
        category: '',
        product_code: '',
        product_name: '',
        price: '',
        warranty_date: '',
        status: 'Active'
    });

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/inventory');
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAdd = () => {
        setForm({
            date_of_purchase: '',
            category: '',
            product_code: '',
            product_name: '',
            price: '',
            warranty_date: '',
            status: 'Active'
        });
        setShowAddModal(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setForm({
            date_of_purchase: item.date_of_purchase,
            category: item.category,
            product_code: item.product_code,
            product_name: item.product_name,
            price: item.price,
            warranty_date: item.warranty_date,
            status: item.status
        });
        setShowEditModal(true);
    };

    const handleDelete = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (showAddModal) {
            try {
                await axios.post('http://127.0.0.1:5000/api/inventory', form);
                setShowAddModal(false);
                fetchInventory();
            } catch (error) {
                console.error('Error adding inventory', error);
            }
        } else if (showEditModal) {
            try {
                await axios.put(`http://127.0.0.1:5000/api/inventory/${selectedItem.id}`, form);
                setShowEditModal(false);
                fetchInventory();
            } catch (error) {
                console.error('Error updating inventory', error);
            }
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/inventory/${selectedItem.id}`);
            setShowDeleteModal(false);
            fetchInventory();
        } catch (error) {
            console.error('Error deleting inventory', error);
        }
    };

    const handleSort = () => {
        const sortedInventory = [...inventory].sort((a, b) => {
            if (isAscending) {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setInventory(sortedInventory);
        setIsAscending(!isAscending);
    };

    return (
        <div>
            <h1 className='heading'>Inventory Management System</h1>
            <div className="button-container">
                <button onClick={handleAdd} className="add-button">Add Item</button>
                <button onClick={handleSort} className="sort-button">
                    sort{isAscending ? '▲' : '▼'}
                </button>
            </div>
            <table className="inventory-table">
                <thead className='header'>
                    <tr>
                        <th>ID</th>
                        <th>Date of Purchase</th>
                        <th>Category</th>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Warranty Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.date_of_purchase}</td>
                            <td>{item.category}</td>
                            <td>{item.product_code}</td>
                            <td>{item.product_name}</td>
                            <td>{item.price}</td>
                            <td>{item.warranty_date}</td>
                            <td className={item.status === 'Active' ? 'status-active' : 'status-inactive'}>
                                {item.status}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(item)} className="edit-button">Edit</button>
                                <button onClick={() => handleDelete(item)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddModal && (
                <AddModal
                    form={form}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setShowAddModal={setShowAddModal}
                />
            )}

            {showEditModal && (
                <EditModal
                    form={form}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setShowEditModal={setShowEditModal}
                />
            )}

            {showDeleteModal && (
                <DeleteModal
                handleDeleteConfirm={handleDeleteConfirm}
                setShowDeleteModal={setShowDeleteModal}
                />
            )}
        </div>
    );
};

export default InventoryTable;
