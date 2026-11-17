import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Sign from './pages/Sign';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
    </Routes>

    <div>
      <Toaster/>
    </div>
    </>
    
  );
}

export default App;
