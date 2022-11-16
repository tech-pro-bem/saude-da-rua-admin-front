import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './contexts/toastContext';
import Home from './pages/Home';
import Login from './pages/Login';
import VoluteerDetails from './pages/VolunteerDetails';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Rota temporaria, ate que rota da tabela de voluntarios nao estiver pronta */}
          <Route path="/:id" element={<VoluteerDetails />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
