import { useEffect, useState } from 'react';
import API from '../api';

function Tables() {
  const [tables, setTables] = useState([]);
  const [form, setForm] = useState({ tableNumber: '', capacity: '' });

  const fetchTables = async () => {
    try {
      const res = await API.get('/tables');
      setTables(res.data);
    } catch (err) {
      console.error('Error fetching tables', err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tables', {
        tableNumber: Number(form.tableNumber),
        capacity: Number(form.capacity)
      });
      setForm({ tableNumber: '', capacity: '' });
      fetchTables();
    } catch (err) {
      console.error('Error adding table', err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/tables/${id}/status`, { status });
      fetchTables();
    } catch (err) {
      console.error('Error updating table status', err);
    }
  };

  const getBadgeColor = (status) => {
    if (status === 'available') return 'bg-success';
    if (status === 'occupied') return 'bg-danger';
    return 'bg-warning';
  };

  return (
    <div>
      <h2 className="mb-4">Table Management</h2>

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Table Number" name="tableNumber"
              value={form.tableNumber} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Capacity" name="capacity"
              value={form.capacity} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">Add Table</button>
          </div>
        </div>
      </form>

      <div className="row">
        {tables.map((table) => (
          <div className="col-md-3 mb-3" key={table._id}>
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Table {table.tableNumber}</h5>
                <p className="card-text">Capacity: {table.capacity}</p>
                <span className={`badge ${getBadgeColor(table.status)} mb-2`}>{table.status}</span>
                <div>
                  <select className="form-select form-select-sm"
                    value={table.status}
                    onChange={(e) => handleStatusChange(table._id, e.target.value)}>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tables;
