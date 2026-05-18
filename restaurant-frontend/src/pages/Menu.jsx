import { useEffect, useState } from 'react';
import API from '../api';

function Menu() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '', description: '' });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await API.get('/menu');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching menu', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/menu/${editId}`, { ...form, price: Number(form.price) });
      } else {
        await API.post('/menu', { ...form, price: Number(form.price) });
      }
      setForm({ name: '', category: '', price: '', description: '' });
      setEditId(null);
      fetchItems();
    } catch (err) {
      console.error('Error saving menu item', err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ name: item.name, category: item.category, price: item.price, description: item.description });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/menu/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Error deleting menu item', err);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Menu Management</h2>

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Name" name="name"
              value={form.name} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Category" name="category"
              value={form.category} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input type="number" step="0.01" className="form-control" placeholder="Price" name="price"
              value={form.price} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Description" name="description"
              value={form.description} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.description}</td>
              <td>
                <span className={`badge ${item.isAvailable ? 'bg-success' : 'bg-secondary'}`}>
                  {item.isAvailable ? 'Yes' : 'No'}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
