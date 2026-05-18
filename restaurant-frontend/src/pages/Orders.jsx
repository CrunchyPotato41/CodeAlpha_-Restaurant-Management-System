import { useEffect, useState } from 'react';
import API from '../api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [orderItems, setOrderItems] = useState([{ menuItemId: '', quantity: 1 }]);

  const fetchOrders = async () => { try { const r = await API.get('/orders'); setOrders(r.data); } catch (e) { console.error(e); } };
  const fetchTables = async () => { try { const r = await API.get('/tables'); setTables(r.data); } catch (e) { console.error(e); } };
  const fetchMenu = async () => { try { const r = await API.get('/menu'); setMenuItems(r.data); } catch (e) { console.error(e); } };

  useEffect(() => { fetchOrders(); fetchTables(); fetchMenu(); }, []);

  const handleAddRow = () => setOrderItems([...orderItems, { menuItemId: '', quantity: 1 }]);
  const handleItemChange = (i, f, v) => { const u = [...orderItems]; u[i][f] = v; setOrderItems(u); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/orders', { tableId: selectedTable, items: orderItems.map((i) => ({ menuItemId: i.menuItemId, quantity: Number(i.quantity) })) });
      setSelectedTable(''); setOrderItems([{ menuItemId: '', quantity: 1 }]); fetchOrders(); fetchTables();
    } catch (err) { alert(err.response?.data?.message || 'Error placing order'); }
  };

  const handleStatusChange = async (id, status) => {
    try { await API.put(`/orders/${id}/status`, { status }); fetchOrders(); } catch (e) { console.error(e); }
  };

  return (
    <div>
      <h2 className="mb-4">Orders</h2>
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="mb-2">
          <select className="form-select" value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} required>
            <option value="">Select Table</option>
            {tables.map((t) => <option key={t._id} value={t._id}>Table {t.tableNumber}</option>)}
          </select>
        </div>
        {orderItems.map((item, index) => (
          <div className="row g-2 mb-2" key={index}>
            <div className="col-8">
              <select className="form-select" value={item.menuItemId} onChange={(e) => handleItemChange(index, 'menuItemId', e.target.value)} required>
                <option value="">Select Item</option>
                {menuItems.filter((m) => m.isAvailable).map((m) => <option key={m._id} value={m._id}>{m.name} - ${m.price.toFixed(2)}</option>)}
              </select>
            </div>
            <div className="col-4">
              <input type="number" min="1" className="form-control" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} required />
            </div>
          </div>
        ))}
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={handleAddRow}>+ Add Item</button>
          <button type="submit" className="btn btn-primary">Place Order</button>
        </div>
      </form>
      <table className="table table-striped">
        <thead><tr><th>Table</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>Table {o.tableId?.tableNumber ?? '?'}</td>
              <td>{o.items.map((it, i) => <div key={i}>{it.menuItemId?.name ?? 'Item'} x{it.quantity}</div>)}</td>
              <td>${o.totalAmount.toFixed(2)}</td>
              <td><span className={`badge ${o.status === 'completed' ? 'bg-success' : o.status === 'in-progress' ? 'bg-warning' : 'bg-info'}`}>{o.status}</span></td>
              <td>{o.status !== 'completed' && <select className="form-select form-select-sm" value={o.status} onChange={(e) => handleStatusChange(o._id, e.target.value)}><option value="pending">Pending</option><option value="in-progress">In Progress</option><option value="completed">Completed</option></select>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Orders;
