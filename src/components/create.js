import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', gender: '', major: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`/http://127.0.0.1:5000/students/${currentId}`, form);
    } else {
      await axios.post('/http://127.0.0.1:5000/students', form);
    }
    setForm({ name: '', gender: '', major: '' });
    setIsEditing(false);
    setCurrentId(null);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setIsEditing(true);
    setCurrentId(student.ID);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/http://127.0.0.1:5000/students/${id}`);
    fetchStudents();
  };

  const downloadCSV = () => {
    const csvData = students.map(student => ({
      ID: student.ID,
      Name: student.NAME,
      Gender: student.GENDER,
      Major: student.MAJOR
    }));
    const csv = [
      ['ID', 'Name', 'Gender', 'Major'],
      ...csvData.map(row => Object.values(row))
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'students.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="App">
      <h1>Student Database</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={form.gender}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="major"
          placeholder="Major"
          value={form.major}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Student</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Major</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.ID}>
              <td>{student.ID}</td>
              <td>{student.NAME}</td>
              <td>{student.GENDER}</td>
              <td>{student.MAJOR}</td>
              <td>
                <button onClick={() => handleEdit(student)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(student.ID)} className="delete-button">Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={downloadCSV} className="download-button">Download CSV</button>
    </div>
  );
}

export default App;
