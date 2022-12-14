import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PermissionsProvider } from './contexts/permissionsContext';
import { ToastProvider } from './contexts/toastContext';
import Home from './pages/Home';
import Login from './pages/Login';
import PixKey from './pages/PixKey';
import VolunteerDetails from './pages/VolunteerDetails';
import Volunteers from './pages/Volunteers';
import Medicines from './pages/Medicines';
import MedicineDetails from './pages/MedicineDetails';
import FinancialReports from './pages/FinancialReports';

function App() {
  return (
    <ToastProvider>
      <PermissionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chave-pix" element={<PixKey />} />
            <Route path="/medicamentos" element={<Medicines />} />
            <Route path="/medicamentos/:id" element={<MedicineDetails />} />
            <Route path="/relatorios" element={<FinancialReports />} />
            <Route
              path="/voluntarios"
              element={<Volunteers />}
            />
            <Route path="/voluntarios/:volunteerId" element={<VolunteerDetails />} />
          </Routes>
        </BrowserRouter>
      </PermissionsProvider>
    </ToastProvider>
  );
}

export default App;
