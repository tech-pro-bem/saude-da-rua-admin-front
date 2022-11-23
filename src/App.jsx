import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './contexts/toastContext';
import Home from './pages/Home';
import Login from './pages/Login';
import VolunteerDetails from './pages/VolunteerDetails';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/voluntarios/:id" element={<VolunteerDetails />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
