import { useEffect, useState } from 'react';
import API from '../api';

function Dashboard() {
  const [sales, setSales] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const fetchDashboard = async () => {
    try {
      const salesRes = await API.get('/reports/daily-sales');
      setSales(salesRes.data);
      const alertsRes = await API.get('/reports/stock-alerts');
      setAlerts(alertsRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data', err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Today's Orders</h5>
              <p className="card-text display-6">{sales?.orderCount ?? 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Today's Sales</h5>
              <p className="card-text display-6">${sales?.totalSales?.toFixed(2) ?? '0.00'}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Low Stock Alerts</h5>
              <p className="card-text display-6">{alerts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="mt-3">
          <h5>Low Stock Items</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>In Stock</th>
                <th>Threshold</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td className="text-danger fw-bold">{item.quantityInStock}</td>
                  <td>{item.lowStockThreshold}</td>
                  <td>{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
