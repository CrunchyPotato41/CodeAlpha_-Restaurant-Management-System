import { useEffect, useState } from 'react';
import API from '../api';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [form, setForm] = useState({
    customerName: '', phone: '', tableId: '', date: '', time: '', partySize: ''
  });

  const fetchReservations = async () => {
    try {
      const res = await API.get('/reservations');
      setReservations(res.data);
    } catch (err) {
      console.error('Error fetching reservations', err);
    }
  };

  const fetchTables = async () => {
    try {
      const res = await API.get('/tables');
      setTables(res.data);
    } catch (err) {
      console.error('Error fetching tables', err);
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchTables();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reservations', { ...form, partySize: Number(form.partySize) });
      setForm({ customerName: '', phone: '', tableId: '', date: '', time: '', partySize: '' });
      fetchReservations();
      fetchTables();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating reservation');
    }
  };

  const handleCancel = async (id) => {
    try {
      await API.put(`/reservations/${id}`, { status: 'cancelled' });
      fetchReservations();
      fetchTables();
    } catch (err) {
      console.error('Error cancelling reservation', err);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Reservations</h2>

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Customer Name" name="customerName"
              value={form.customerName} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Phone" name="phone"
              value={form.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <select className="form-select" name="tableId" value={form.tableId} onChange={handleChange} required>
              <option value="">Select Table</option>
              {tables.map((t) => (
                <option key={t._id} value={t._id}>Table {t.tableNumber}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input type="date" className="form-control" name="date"
              value={form.date} onChange={handleChange} required />
          </div>
          <div className="col-md-1">
            <input type="time" className="form-control" name="time"
              value={form.time} onChange={handleChange} required />
          </div>
          <div className="col-md-1">
            <input type="number" className="form-control" placeholder="Party" name="partySize"
              value={form.partySize} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Reserve</button>
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Table</th>
            <th>Date</th>
            <th>Time</th>
            <th>Party</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r._id}>
              <td>{r.customerName}</td>
              <td>{r.phone}</td>
              <td>Table {r.tableId?.tableNumber ?? '?'}</td>
              <td>{r.date}</td>
              <td>{r.time}</td>
              <td>{r.partySize}</td>
              <td>
                <span className={`badge ${r.status === 'confirmed' ? 'bg-success' : 'bg-secondary'}`}>
                  {r.status}
                </span>
              </td>
              <td>
                {r.status === 'confirmed' && (
                  <button className="btn btn-sm btn-danger" onClick={() => handleCancel(r._id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;
