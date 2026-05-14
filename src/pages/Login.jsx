import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authService.login(email, password);
      if (data) {
        // Redirect based on role
        if (data.role === 'Admin') navigate('/admin');
        else if (data.role === 'Teacher') navigate('/teacher');
        else if (data.role === 'Student') navigate('/student');
        else if (data.role === 'Parent') navigate('/parent');
        else navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="glass-card p-5" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h2 className="gradient-text fw-bold mb-2">CTMS</h2>
          <p className="text-muted">Welcome back! Please login to your account.</p>
        </div>
        
        {error && (
          <div className="alert alert-danger bg-opacity-25 text-white border-0 py-2 small mb-3" role="alert">
            {error}
          </div>
        )}

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
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control form-control-custom border-end-0" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button 
                className="btn btn-outline-custom border-start-0" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary-custom w-100 mb-3" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center">
            <p className="text-muted small mb-0">
              Don't have an account? <Link to="/register" className="text-primary text-decoration-none">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
