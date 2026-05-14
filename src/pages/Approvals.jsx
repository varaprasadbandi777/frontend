import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const Approvals = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const data = await userService.getPendingUsers();
      setPendingUsers(data);
    } catch (error) {
      console.error('Failed to fetch pending users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await userService.approveUser(id);
      setPendingUsers(pendingUsers.filter(u => u._id !== id));
      setMessage('User approved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to approve user: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      try {
        await userService.rejectUser(id);
        setPendingUsers(pendingUsers.filter(u => u._id !== id));
        setMessage('User request rejected.');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Failed to reject user: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" role="status"></div></div>;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Pending Approvals</h2>
        <span className="badge bg-primary rounded-pill">{pendingUsers.length} Requests</span>
      </div>

      {message && (
        <div className={`alert ${message.includes('Failed') ? 'alert-danger' : 'alert-success'} bg-opacity-25 text-white border-0`} role="alert">
          {message}
        </div>
      )}

      <div className="glass-card p-4">
        {pendingUsers.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-person-check fs-1 text-muted mb-3 d-block"></i>
            <h5 className="text-muted">No pending approval requests</h5>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-custom table-hover align-middle">
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Requested On</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=6366f1&color=fff`} 
                          alt="" 
                          className="rounded-circle me-3" 
                          width="40"
                        />
                        <span className="fw-bold">{user.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge bg-${user.role === 'Admin' ? 'danger' : user.role === 'Teacher' ? 'warning' : 'info'} bg-opacity-25 text-${user.role === 'Admin' ? 'danger' : user.role === 'Teacher' ? 'warning' : 'info'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.email}</td>
                    <td><span className="text-muted small">{new Date(user.createdAt).toLocaleDateString()}</span></td>
                    <td className="text-end">
                      <div className="btn-group gap-2">
                        <button 
                          className="btn btn-sm btn-success-custom rounded"
                          onClick={() => handleApprove(user._id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger rounded"
                          onClick={() => handleReject(user._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvals;
