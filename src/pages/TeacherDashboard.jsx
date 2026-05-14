import React from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TeacherDashboard = () => {
  const classPerformanceData = {
    labels: ['Class A', 'Class B', 'Class C'],
    datasets: [
      {
        label: 'Average Score (%)',
        data: [78, 85, 72],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
    ],
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Teacher Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, Mr. Anderson</p>
        </div>
        <div className="text-end">
          <div className="text-muted small">Current Date</div>
          <div className="fw-bold">{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="glass-card p-4 d-flex align-items-center h-100">
            <div className="bg-primary bg-opacity-25 p-3 rounded-circle me-3">
              <i className="bi bi-book text-primary fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Assigned Classes</h6>
              <h3 className="mb-0 fw-bold">3</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="glass-card p-4 d-flex align-items-center h-100">
            <div className="bg-success bg-opacity-25 p-3 rounded-circle me-3">
              <i className="bi bi-people text-success fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Total Students</h6>
              <h3 className="mb-0 fw-bold">142</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="glass-card p-4 d-flex align-items-center h-100">
            <div className="bg-warning bg-opacity-25 p-3 rounded-circle me-3">
              <i className="bi bi-calendar-check text-warning fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Pending Attendance</h6>
              <h3 className="mb-0 fw-bold">1 Class</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="glass-card p-4 d-flex align-items-center h-100">
            <div className="bg-info bg-opacity-25 p-3 rounded-circle me-3">
              <i className="bi bi-journal-text text-info fs-4"></i>
            </div>
            <div>
              <h6 className="text-muted mb-1">Upcoming Exams</h6>
              <h3 className="mb-0 fw-bold">2</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="glass-card p-4 h-100">
            <h5 className="mb-4">Class Performance Overview</h5>
            <div style={{ height: '300px' }}>
              <Bar 
                data={classPerformanceData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true, max: 100 } }
                }} 
              />
            </div>
          </div>
        </div>
        
        <div className="col-12 col-lg-4">
          <div className="glass-card p-4 h-100">
            <h5 className="mb-4">Quick Actions</h5>
            <div className="d-grid gap-3">
              <Link to="/attendance" className="btn btn-outline-primary d-flex align-items-center justify-content-between p-3 rounded">
                <div className="d-flex align-items-center">
                  <i className="bi bi-person-check fs-4 me-3"></i>
                  <span className="fw-medium">Mark Attendance</span>
                </div>
                <i className="bi bi-chevron-right"></i>
              </Link>
              <Link to="/marks" className="btn btn-outline-success d-flex align-items-center justify-content-between p-3 rounded">
                <div className="d-flex align-items-center">
                  <i className="bi bi-file-earmark-spreadsheet fs-4 me-3"></i>
                  <span className="fw-medium">Enter Marks</span>
                </div>
                <i className="bi bi-chevron-right"></i>
              </Link>
              <Link to="/reports" className="btn btn-outline-warning d-flex align-items-center justify-content-between p-3 rounded">
                <div className="d-flex align-items-center">
                  <i className="bi bi-bar-chart fs-4 me-3"></i>
                  <span className="fw-medium">View Reports</span>
                </div>
                <i className="bi bi-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
