import React from 'react';
import StudentDashboard from './StudentDashboard';

const ParentDashboard = () => {
  return (
    <div>
      <div className="alert alert-info bg-opacity-10 border-info text-info mx-4 mt-4 mb-0 d-flex align-items-center" role="alert">
        <i className="bi bi-info-circle-fill me-2 fs-5"></i>
        <div>
          <strong>Parent View:</strong> You are viewing the dashboard for your ward: <strong>John Doe (Class A)</strong>
        </div>
      </div>
      <StudentDashboard />
    </div>
  );
};

export default ParentDashboard;
