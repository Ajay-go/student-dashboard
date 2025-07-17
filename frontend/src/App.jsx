import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AllStudents from './pages/AllStudents';

const App = () => {
  const isLoggedIn = localStorage.getItem("token"); // For now, use token presence as login check

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <a href="/students" style={{ marginRight: '10px' }}>All Students</a>
        <a href="/profile">Profile</a>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/students" element={isLoggedIn ? <AllStudents /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
