/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import ghostImg from '../assets/ghost.svg';
import tableHeaders from '../data/medicinesTableHeaders';
import Medicine from '../components/Medicine';
import Modal from '../components/Modal';
import { fetchMedicines, deleteMedicine } from '../service/apiRequests/medicines';
import { useToast } from '../contexts/toastContext';
import ToastContainer from '../components/Toast/ToastContainer';

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicineToBeDeleted, setMedicineToBeDeleted] = useState({});
  const [viewFilter, setViewFilter] = useState('unread');

  const { addToast } = useToast();

  const viewMode = (view, medicine) => {
    switch (view) {
      case 'read':
        return medicine?.wasRead;

      case 'unread':
        return !medicine?.wasRead;

      default:
        return true;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function getMedicines() {
    try {
      const { data } = await fetchMedicines();
      setMedicines(data);
    } catch (error) {
      addToast('error');
    }
  }

  useEffect(() => {
    getMedicines();
  }, []);

  async function handleDeleteVolunteer() {
    if (!medicineToBeDeleted || typeof medicineToBeDeleted !== 'string') return;

    try {
      await deleteMedicine(medicineToBeDeleted);
      addToast('success');
    } catch (error) {
      addToast('error');
    } finally {
      setMedicineToBeDeleted(null);
      closeModal();
      await getMedicines();
    }
  }

  return (
    <AuthenticatedLayout>
      <main className="pt-16 pr-[182px] pb-56">
        <h1 className="font-semibold text-[32px] leading-[48px] text-dark-blue">
          Medicamentos
        </h1>
        <span className="leading-6 text-primary-black">Doações de medicamentos registradas pelo site.</span>
        <div className="mt-8">
          <label htmlFor="view" className="font-medium text-lg">Exibir:</label>
          <select
            name="view"
            id="view"
            defaultValue={viewFilter}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block cursor-pointer p-2"
            onChange={(e) => setViewFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="unread">Apenas não lidos</option>
            <option value="read">Apenas lidos</option>
          </select>
        </div>

        {!medicines.length ? (
          <div className="mt-[134px] flex flex-col items-center">
            <img src={ghostImg} alt="Ilustração de um fantasma" />
            <span className="mt-[54px] font-medium text-[22px] leading-[33px]">
              Nenhum resultado encontrado.
            </span>
          </div>
        ) : (
          <div className="mt-12">
            <table className="w-[1209px] shadow-lg">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <td
                      key={header.title}
                      className="bg-dark-blue text-ultra-light-grey font-semibold text-center"
                    >
                      {header.title}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {medicines
                  .filter((medicine) => viewMode(viewFilter, medicine))
                  .map((medicine, index) => (
                    <tr key={medicine.id} className={`h-20 ${index % 2 === 0 ? 'bg-base' : 'bg-light-grey'}`}>
                      <Medicine
                        key={medicine.id}
                        medicine={medicine}
                        openModal={openModal}
                        setMedicineToBeDeleted={setMedicineToBeDeleted}
                      />
                    </tr>
                  ))}
              </tbody>
            </table>

          </div>
        )}
      </main>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onCommit={handleDeleteVolunteer}
        confirmationTitle="Confirmar ação"
        cancelButtonText="Cancelar"
        confirmationButtonText="Sim, excluir"
      >
        <span>Deseja mesmo realizar essa exclusão?</span>
      </Modal>
      <ToastContainer />
    </AuthenticatedLayout>
  );
}
