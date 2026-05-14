import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import Attendance from './pages/Attendance';
import Marks from './pages/Marks';
import Timetable from './pages/Timetable';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['Admin', 'Teacher', 'Student', 'Parent']} />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            
            {/* Role-Specific Dashboards */}
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
              <Route path="admin" element={<AdminDashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['Teacher', 'Admin']} />}>
              <Route path="teacher" element={<TeacherDashboard />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="marks" element={<Marks />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
              <Route path="student" element={<StudentDashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['Parent']} />}>
              <Route path="parent" element={<ParentDashboard />} />
            </Route>
            
            {/* Shared Routes */}
            <Route path="timetable" element={<Timetable />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
