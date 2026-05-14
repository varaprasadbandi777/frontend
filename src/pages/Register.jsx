import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Teacher');
  const [adminSecret, setAdminSecret] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authService.register(name, email, password, role, adminSecret);
      if (data) {
        // Redirect based on role
        if (data.role === 'Admin') navigate('/admin');
        else if (data.role === 'Teacher') navigate('/teacher');
        else if (data.role === 'Student') navigate('/student');
        else if (data.role === 'Parent') navigate('/parent');
        else navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="glass-card p-5" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <h2 className="gradient-text fw-bold mb-2">Create Account</h2>
          <p className="text-muted">Join the Class Teacher Management System</p>
        </div>
        
        {error && (
          <div className="alert alert-danger bg-opacity-25 text-white border-0 py-2 small mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-muted small">Full Name</label>
            <input 
              type="text" 
              className="form-control form-control-custom" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>

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
          
          <div className="mb-3">
            <label className="form-label text-muted small">Password</label>
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

          <div className="mb-4">
            <label className="form-label text-muted small">Role</label>
            <select 
              className="form-select form-control-custom"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
            </select>
          </div>

          {role === 'Admin' && (
            <div className="mb-4 animate-fade-in">
              <label className="form-label text-danger small fw-bold">Admin Registration Secret</label>
              <div className="input-group">
                <input 
                  type={showSecret ? "text" : "password"} 
                  className="form-control form-control-custom border-danger border-end-0" 
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  required
                  placeholder="Enter secret key to register as Admin"
                />
                <button 
                  className="btn btn-outline-danger border-start-0" 
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  <i className={`bi bi-eye${showSecret ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary-custom w-100 mb-3" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="text-center">
            <p className="text-muted small mb-0">
              Already have an account? <Link to="/login" className="text-primary text-decoration-none">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
