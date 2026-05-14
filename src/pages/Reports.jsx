import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Line, PolarArea } from 'react-chartjs-2';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend);

const Reports = () => {
  const [studentRoll, setStudentRoll] = useState('101');
  
  // Mock Data for the report
  const studentData = {
    name: 'John Doe',
    rollNumber: '101',
    className: 'Class A',
    attendancePercent: 82,
    gpa: 8.4,
    subjects: [
      { name: 'Mathematics', marks: 85, max: 100, grade: 'A' },
      { name: 'Science', marks: 78, max: 100, grade: 'B+' },
      { name: 'English', marks: 92, max: 100, grade: 'A+' },
      { name: 'History', marks: 65, max: 100, grade: 'B' },
      { name: 'Computer', marks: 95, max: 100, grade: 'A+' },
    ]
  };

  const performanceChartData = {
    labels: ['Unit 1', 'Unit 2', 'Midterm', 'Unit 3', 'Finals'],
    datasets: [
      {
        label: 'Academic Trajectory (%)',
        data: [75, 80, 78, 85, 88],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4
      }
    ]
  };

  const subjectRadarData = {
    labels: studentData.subjects.map(s => s.name),
    datasets: [{
      label: 'Subject Performance',
      data: studentData.subjects.map(s => s.marks),
      backgroundColor: [
        'rgba(99, 102, 241, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(239, 68, 68, 0.6)',
        'rgba(139, 92, 246, 0.6)'
      ],
      borderWidth: 0,
    }]
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(studentData.subjects);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReportCard");
    XLSX.writeFile(wb, `${studentData.name}_Report.xlsx`);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Student Academic Report</h2>
        <div className="d-flex gap-2">
          <input 
            type="text" 
            className="form-control form-control-custom" 
            placeholder="Search Roll No..." 
            value={studentRoll}
            onChange={(e) => setStudentRoll(e.target.value)}
          />
          <button className="btn btn-primary-custom" onClick={exportToExcel}>
            <i className="bi bi-download me-2"></i>Export
          </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Profile Card */}
        <div className="col-12 col-xl-4">
          <div className="glass-card p-4 text-center h-100">
            <img src={`https://ui-avatars.com/api/?name=${studentData.name.replace(' ', '+')}&size=100&background=6366f1&color=fff`} className="rounded-circle mb-3 shadow" alt="Profile" />
            <h4 className="fw-bold mb-1">{studentData.name}</h4>
            <p className="text-muted mb-4">Roll No: {studentData.rollNumber} | {studentData.className}</p>
            
            <div className="row g-3">
              <div className="col-6">
                <div className={`p-3 rounded ${studentData.attendancePercent < 75 ? 'bg-danger bg-opacity-25 text-danger' : 'bg-primary bg-opacity-25 text-primary'}`}>
                  <h6 className="mb-1">Attendance</h6>
                  <h3 className="mb-0 fw-bold">{studentData.attendancePercent}%</h3>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 rounded bg-success bg-opacity-25 text-success">
                  <h6 className="mb-1">Overall GPA</h6>
                  <h3 className="mb-0 fw-bold">{studentData.gpa}</h3>
                </div>
              </div>
            </div>
            {studentData.attendancePercent < 75 && (
              <div className="alert alert-danger mt-3 mb-0 py-2 border-0 bg-opacity-25 text-white" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Low Attendance Alert!
              </div>
            )}
          </div>
        </div>

        {/* Charts */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="glass-card p-4 h-100">
            <h6 className="mb-4 text-muted">Subject Strengths</h6>
            <div className="d-flex justify-content-center align-items-center" style={{height: '250px'}}>
              <PolarArea data={subjectRadarData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-6 col-xl-4">
          <div className="glass-card p-4 h-100">
            <h6 className="mb-4 text-muted">Performance Trend</h6>
            <div className="d-flex justify-content-center align-items-center" style={{height: '250px'}}>
              <Line data={performanceChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="glass-card p-4">
        <h5 className="mb-4">Detailed Marks Breakdown</h5>
        <div className="table-responsive">
          <table className="table table-custom table-hover">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks Obtained</th>
                <th>Max Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentData.subjects.map((sub, idx) => (
                <tr key={idx}>
                  <td><span className="fw-medium">{sub.name}</span></td>
                  <td>{sub.marks}</td>
                  <td className="text-muted">{sub.max}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="me-2">{((sub.marks / sub.max) * 100).toFixed(0)}%</span>
                      <div className="progress flex-grow-1" style={{ height: '6px', backgroundColor: '#334155' }}>
                        <div className={`progress-bar ${sub.marks < 40 ? 'bg-danger' : 'bg-success'}`} style={{ width: `${(sub.marks / sub.max) * 100}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge bg-secondary bg-opacity-50">{sub.grade}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
