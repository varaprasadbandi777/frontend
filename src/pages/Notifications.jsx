import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, title: 'Low Attendance Alert', message: 'John Doe has dropped below 75% attendance in Mathematics.', type: 'danger', date: 'Just now', icon: 'bi-exclamation-triangle' },
    { id: 2, title: 'Marks Uploaded', message: 'Midterm marks for Class A Science have been published.', type: 'success', date: '2 hours ago', icon: 'bi-check-circle' },
    { id: 3, title: 'Timetable Change', message: 'Friday afternoon Sports period swapped with Library.', type: 'info', date: 'Yesterday', icon: 'bi-info-circle' },
    { id: 4, title: 'Fee Reminder', message: 'Term 2 fees are due by the end of the month.', type: 'warning', date: '3 days ago', icon: 'bi-wallet2' }
  ];

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">System Notifications</h2>
        <button className="btn btn-outline-secondary btn-sm">Mark All as Read</button>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8 mx-auto">
          {notifications.map((notif) => (
            <div key={notif.id} className={`glass-card p-4 mb-3 border-start border-4 border-${notif.type}`}>
              <div className="d-flex w-100 justify-content-between align-items-start">
                <div className="d-flex">
                  <div className={`text-${notif.type} me-3 mt-1`}>
                    <i className={`bi ${notif.icon} fs-4`}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold">{notif.title}</h6>
                    <p className="mb-1 text-muted">{notif.message}</p>
                  </div>
                </div>
                <small className="text-muted text-nowrap ms-3">{notif.date}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
