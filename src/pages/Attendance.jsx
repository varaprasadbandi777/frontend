import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState('Class A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock data for initial rendering without full DB seeded
  useEffect(() => {
    // In a real app, we would fetch students for this class here
    // api.get(`/students?className=${className}`)
    setStudents([
      { _id: '1', name: 'John Doe', rollNumber: '101', status: 'Present' },
      { _id: '2', name: 'Jane Smith', rollNumber: '102', status: 'Present' },
      { _id: '3', name: 'Robert Johnson', rollNumber: '103', status: 'Present' }
    ]);
  }, [className]);

  const handleStatusChange = (id, newStatus) => {
    setStudents(students.map(s => s._id === id ? { ...s, status: newStatus } : s));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const records = students.map(s => ({
        studentId: s._id,
        status: s.status
      }));

      // Await API call (mocked response logic if not connected)
      // await api.post('/attendance/bulk', { date, className, records });
      
      setMessage('Attendance successfully recorded!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to record attendance: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Record Attendance</h2>
      </div>

      <div className="glass-card p-4 mb-4">
        <form className="row g-3">
          <div className="col-md-4">
            <label className="form-label text-muted">Class</label>
            <select 
              className="form-select form-control-custom"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value="Class A">Class A</option>
              <option value="Class B">Class B</option>
              <option value="Class C">Class C</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label text-muted">Date</label>
            <input 
              type="date" 
              className="form-control form-control-custom"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </form>
      </div>

      {message && (
        <div className={`alert ${message.includes('Failed') ? 'alert-danger' : 'alert-success'} bg-opacity-25 text-white border-0`} role="alert">
          {message}
        </div>
      )}

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-custom table-hover">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>
                    <span className={`badge bg-${student.status === 'Present' ? 'success' : student.status === 'Absent' ? 'danger' : 'warning'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm" role="group">
                      <button 
                        type="button" 
                        className={`btn btn-outline-success ${student.status === 'Present' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(student._id, 'Present')}
                      >
                        Present
                      </button>
                      <button 
                        type="button" 
                        className={`btn btn-outline-danger ${student.status === 'Absent' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(student._id, 'Absent')}
                      >
                        Absent
                      </button>
                      <button 
                        type="button" 
                        className={`btn btn-outline-warning ${student.status === 'Leave' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(student._id, 'Leave')}
                      >
                        Leave
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="d-flex justify-content-end mt-4">
          <button 
            className="btn btn-primary-custom" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
