import { useState } from 'react';
import API from '../api';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isRegister) {
        const res = await API.post('/auth/register', form);
        setMessage(res.data.message);
        setIsRegister(false);
      } else {
        const res = await API.post('/auth/login', {
          email: form.email,
          password: form.password
        });
        localStorage.setItem('token', res.data.token);
        onLogin();
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">
                {isRegister ? 'Register' : 'Login'}
              </h3>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name"
                      value={form.name} onChange={handleChange} required />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email"
                    value={form.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password"
                    value={form.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {isRegister ? 'Register' : 'Login'}
                </button>
              </form>
              <p className="text-center mt-3 mb-0">
                <button className="btn btn-link" onClick={() => setIsRegister(!isRegister)}>
                  {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
