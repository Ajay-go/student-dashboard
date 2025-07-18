import { Routes, Route } from 'react-router-dom';
import AllStudents from './pages/AllStudents';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';
import Payfees from './pages/Payfees';
function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allstudents" element={<AllStudents />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/payfees" element={<Payfees />} />
    </Routes>

  );
}

export default App;
