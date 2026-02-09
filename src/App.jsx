import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Signup from './pages/SignUp';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;