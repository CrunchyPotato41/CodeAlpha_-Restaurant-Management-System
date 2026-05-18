import { useEffect, useState } from 'react';
import API from '../api';

function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', unit: '', quantityInStock: '', lowStockThreshold: '' });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => { try { const r = await API.get('/inventory'); setItems(r.data); } catch (e) { console.error(e); } };
  
  useEffect(() => { fetchItems(); }, []);
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, quantityInStock: Number(form.quantityInStock), lowStockThreshold: Number(form.lowStockThreshold) };
    try {
      if (editId) { await API.put(`/inventory/${editId}`, data); }
      else { await API.post('/inventory', data); }
      setForm({ name: '', unit: '', quantityInStock: '', lowStockThreshold: '' }); setEditId(null); fetchItems();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ name: item.name, unit: item.unit, quantityInStock: item.quantityInStock, lowStockThreshold: item.lowStockThreshold });
  };

  return (
    <div>
      <h2 className="mb-4">Inventory</h2>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-3"><input type="text" className="form-control" placeholder="Name" name="name" value={form.name} onChange={handleChange} required /></div>
          <div className="col-md-2"><input type="text" className="form-control" placeholder="Unit (kg, pcs)" name="unit" value={form.unit} onChange={handleChange} required /></div>
          <div className="col-md-2"><input type="number" className="form-control" placeholder="Qty In Stock" name="quantityInStock" value={form.quantityInStock} onChange={handleChange} required /></div>
          <div className="col-md-3"><input type="number" className="form-control" placeholder="Low Stock Threshold" name="lowStockThreshold" value={form.lowStockThreshold} onChange={handleChange} required /></div>
          <div className="col-md-2"><button type="submit" className="btn btn-primary w-100">{editId ? 'Update' : 'Add'}</button></div>
        </div>
      </form>
      <table className="table table-striped">
        <thead><tr><th>Name</th><th>Unit</th><th>In Stock</th><th>Threshold</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td><td>{item.unit}</td>
              <td>{item.quantityInStock}</td><td>{item.lowStockThreshold}</td>
              <td><span className={`badge ${item.quantityInStock <= item.lowStockThreshold ? 'bg-danger' : 'bg-success'}`}>{item.quantityInStock <= item.lowStockThreshold ? 'Low' : 'OK'}</span></td>
              <td><button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Inventory;
