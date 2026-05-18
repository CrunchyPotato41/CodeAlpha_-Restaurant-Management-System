import { NavLink } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Restaurant Manager</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Dashboard</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/menu">Menu</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tables">Tables</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/reservations">Reservations</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/orders">Orders</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/inventory">Inventory</NavLink></li>
          </ul>
          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
