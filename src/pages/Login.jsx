import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login logic, navigate to admin for now
    navigate('/admin');
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="glass-card p-5" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h2 className="gradient-text fw-bold mb-2">CTMS</h2>
          <p className="text-muted">Welcome back! Please login to your account.</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-muted small">Email Address</label>
            <input 
              type="email" 
              className="form-control form-control-custom" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label text-muted small d-flex justify-content-between">
              Password
              <a href="#" className="text-primary text-decoration-none">Forgot?</a>
            </label>
            <input 
              type="password" 
              className="form-control form-control-custom" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn btn-primary-custom w-100 mb-3">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
