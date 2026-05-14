import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Student Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, John Doe (Roll No: 101)</p>
        </div>
        <Link to="/reports" className="btn btn-primary-custom">
          View Full Report Card
        </Link>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="glass-card p-4 d-flex align-items-center h-100">
            <div className="bg-success bg-opacity-25 p-3 rounded-circle me-3">
              <i className="bi bi-calendar-check text-success fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Overall Attendance</h6>
              <h3 className="mb-0 fw-bold text-success">82%</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="glass-card p-4 d-flex align-items-center h-100">
            <div className="bg-primary bg-opacity-25 p-3 rounded-circle me-3">
              <i className="bi bi-graph-up text-primary fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Current CGPA</h6>
              <h3 className="mb-0 fw-bold">8.4</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="glass-card p-4 d-flex align-items-center h-100">
            <div className="bg-warning bg-opacity-25 p-3 rounded-circle me-3">
              <i className="bi bi-bell text-warning fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Unread Notifications</h6>
              <h3 className="mb-0 fw-bold">3</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="glass-card p-4 h-100">
            <h5 className="mb-4">Today's Schedule</h5>
            <div className="timeline">
              {[
                { time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Anderson', status: 'completed' },
                { time: '10:30 AM', subject: 'Physics', teacher: 'Mrs. Smith', status: 'ongoing' },
                { time: '12:00 PM', subject: 'Lunch Break', teacher: '-', status: 'upcoming' },
                { time: '01:00 PM', subject: 'Computer Science', teacher: 'Ms. Davis', status: 'upcoming' }
              ].map((cls, idx) => (
                <div key={idx} className="d-flex mb-3 align-items-start">
                  <div className={`me-3 fw-bold ${cls.status === 'ongoing' ? 'text-primary' : 'text-muted'}`}>
                    {cls.time}
                  </div>
                  <div className={`flex-grow-1 p-3 rounded border ${cls.status === 'ongoing' ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'}`}>
                    <div className="d-flex justify-content-between">
                      <h6 className={`mb-1 ${cls.status === 'ongoing' ? 'text-primary' : ''}`}>{cls.subject}</h6>
                      {cls.status === 'completed' && <i className="bi bi-check-circle-fill text-success"></i>}
                      {cls.status === 'ongoing' && <span className="spinner-grow spinner-grow-sm text-primary" role="status"></span>}
                    </div>
                    <small className="text-muted">Instructor: {cls.teacher}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-12 col-lg-4">
          <div className="glass-card p-4 mb-4">
            <h5 className="mb-4">Recent Marks</h5>
            <ul className="list-group list-group-flush bg-transparent">
              <li className="list-group-item bg-transparent text-white px-0 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Computer Science</h6>
                  <small className="text-muted">Midterm Exam</small>
                </div>
                <span className="badge bg-success rounded-pill fs-6">95/100</span>
              </li>
              <li className="list-group-item bg-transparent text-white px-0 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Mathematics</h6>
                  <small className="text-muted">Midterm Exam</small>
                </div>
                <span className="badge bg-success rounded-pill fs-6">85/100</span>
              </li>
              <li className="list-group-item bg-transparent text-white px-0 border-0 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">History</h6>
                  <small className="text-muted">Unit Test 2</small>
                </div>
                <span className="badge bg-warning text-dark rounded-pill fs-6">65/100</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
