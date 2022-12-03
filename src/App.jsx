import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './contexts/toastContext';
import { VolunteersProvider } from './contexts/volunteersContext';
import { PermissionsProvider } from './contexts/permissionsContext';
import Home from './pages/Home';
import Login from './pages/Login';
import PixKey from './pages/PixKey';
import Volunteers from './pages/Volunteers';

function App() {
  return (
    <ToastProvider>
      <PermissionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chave-pix" element={<PixKey />} />
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
      </PermissionsProvider>
    </ToastProvider>
  );
}

export default App;
