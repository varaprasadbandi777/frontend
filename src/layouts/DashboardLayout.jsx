import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', icon: 'bi-grid-1x2', label: 'Dashboard' },
    { path: '/attendance', icon: 'bi-calendar-check', label: 'Attendance' },
    { path: '/marks', icon: 'bi-journal-text', label: 'Marks Entry' },
    { path: '/timetable', icon: 'bi-clock', label: 'Timetable' },
    { path: '/reports', icon: 'bi-file-earmark-bar-graph', label: 'Reports' },
    { path: '/notifications', icon: 'bi-bell', label: 'Notifications' },
  ];

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none w-100 border-bottom border-secondary">
              <span className="fs-5 fw-bold gradient-text d-none d-sm-inline">CTMS Portal</span>
              <i className="bi bi-mortarboard-fill fs-4 d-sm-none text-primary"></i>
            </a>
            
            <ul className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100 mt-4" id="menu">
              {menuItems.map((item, idx) => (
                <li className="nav-item w-100" key={idx}>
                  <NavLink 
                    to={item.path} 
                    className={({isActive}) => `nav-link nav-link-custom w-100 d-flex align-items-center px-3 py-2 ${isActive ? 'active' : ''}`}
                  >
                    <i className={`bi ${item.icon} fs-5`}></i> 
                    <span className="ms-2 d-none d-sm-inline">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            
            <hr className="w-100 border-secondary" />
            <div className="dropdown pb-4 w-100">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle px-3 py-2 w-100 nav-link-custom" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                <span className="d-none d-sm-inline mx-2 text-muted">Admin User</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow w-100" aria-labelledby="dropdownUser">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Sign out</button></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col d-flex flex-column h-sm-100">
          <main className="flex-grow-1 p-4 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
