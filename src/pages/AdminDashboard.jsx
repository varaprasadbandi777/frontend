import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const attendanceData = {
    labels: ['Class A', 'Class B', 'Class C', 'Class D'],
    datasets: [
      {
        label: 'Attendance %',
        data: [85, 92, 78, 88],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
    ],
  };

  const statusData = {
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [
      {
        data: [350, 40, 10],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#94a3b8' } },
    },
    scales: {
      y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
      x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: { legend: { position: 'right', labels: { color: '#94a3b8' } } }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Admin Dashboard</h2>
        <div className="text-muted">Today: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {[
          { label: 'Total Students', value: '450', icon: 'bi-people', color: 'primary' },
          { label: 'Total Teachers', value: '32', icon: 'bi-person-badge', color: 'success' },
          { label: 'Avg Attendance', value: '88%', icon: 'bi-graph-up', color: 'warning' },
          { label: 'Classes Today', value: '16', icon: 'bi-calendar-event', color: 'info' }
        ].map((stat, i) => (
          <div className="col-12 col-md-6 col-xl-3" key={i}>
            <div className="glass-card p-4 d-flex align-items-center">
              <div className={`bg-${stat.color} bg-opacity-25 p-3 rounded-circle me-3`}>
                <i className={`bi ${stat.icon} text-${stat.color} fs-4`}></i>
              </div>
              <div>
                <h6 className="text-muted mb-1">{stat.label}</h6>
                <h3 className="mb-0 fw-bold">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="glass-card p-4 h-100">
            <h5 className="mb-4">Class-wise Attendance Overview</h5>
            <div style={{ height: '300px' }}>
              <Bar options={chartOptions} data={attendanceData} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="glass-card p-4 h-100">
            <h5 className="mb-4">Today's Status</h5>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Doughnut options={pieOptions} data={statusData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
