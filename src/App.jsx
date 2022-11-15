import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './contexts/toastContext';
import { VolunteersProvider } from './contexts/volunteersContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Volunteers from './pages/Volunteers';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/voluntarios"
            element={(
              <VolunteersProvider>
                <Volunteers />
              </VolunteersProvider>
            )}
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
