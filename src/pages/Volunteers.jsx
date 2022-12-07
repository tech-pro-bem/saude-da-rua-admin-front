/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ghostImg from '../assets/ghost.svg';
import searchIcon from '../assets/search.svg';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import ToastContainer from '../components/Toast/ToastContainer';
import Volunteer from '../components/Volunteer';
import { useToast } from '../contexts/toastContext';
import tableHeaders from '../data/tableHeaders';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import { deleteVolunteer, fetchVolunteers, updateVolunteerParticipationStatus } from '../service/apiRequests';

export default function Volunteers() {
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volunteersList, setVolunteersList] = useState([]);
  const [volunteerToBeRemoved, setVolunteerToBeRemoved] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    register,
    handleSubmit,
    getValues,
  } = useForm({ defaultValues: { searchTerm: '' } });

  function openModal() { setIsModalOpen(true); }
  function closeModal() { setIsModalOpen(false); }

  function clearVolunteersList() {
    setVolunteersList([]);
  }

  function resetCurrentPage() {
    setCurrentPage(1);
  }

  async function getVolunteers(page = 0) {
    const { searchTerm } = getValues();
    const limit = 15;

    try {
      const { volunteers, totalPages } = await fetchVolunteers(searchTerm, limit, page);
      setVolunteersList(volunteers);
      setNumberOfPages(totalPages);
      resetCurrentPage();
    } catch (error) {
      addToast('error');
    }
  }

  async function handleUpdateVolunteerParticipationStatus(volunteer) {
    try {
      await updateVolunteerParticipationStatus(volunteer);
      addToast('success');
      await getVolunteers();
    } catch (error) {
      addToast('error');
    }
  }

  async function handleDeleteVolunteer() {
    if (!volunteerToBeRemoved || typeof volunteerToBeRemoved !== 'string') return;

    try {
      await deleteVolunteer(volunteerToBeRemoved);
      addToast('success');
    } catch (error) {
      addToast('error');
    } finally {
      setVolunteerToBeRemoved(null);
      closeModal();
      await getVolunteers();
    }
  }

  async function onSubmit({ searchTerm }) {
    if (!searchTerm) {
      clearVolunteersList();
      return;
    }

    await getVolunteers();
  }

  useEffect(() => {
    getVolunteers();
  }, []);

  return (
    <AuthenticatedLayout>
      <main className="w-full min-h-screen mr-[190px] mb-16">
        <h1 className="mt-16 mb-10 text-dark-blue text-[32px] leading-[48px] font-semibold">
          Voluntários
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input
              className="border-primary-black border w-full py-3 px-6 rounded-full text-primary-black placeholder:text-medium-grey"
              type="text"
              id="searchValue"
              name="searchValue"
              autoComplete="off"
              placeholder="Pesquise por nome, profissão, disponibilidade ou participação"
              {...register('searchTerm')}
            />
            <button
              className="absolute inset-y-0 right-6"
              type="submit"
            >
              <img src={searchIcon} alt="Ícone de busca" />
            </button>
          </div>
        </form>
        {!volunteersList.length ? (
          <div className="mt-[134px] flex flex-col items-center">
            <img src={ghostImg} alt="Ilustração de um fantasma" />
            <span className="mt-[54px] font-medium text-[22px] leading-[33px]">
              Nenhum resultado encontrado. Que tal buscar por outra palavra?
            </span>
          </div>
        ) : (
          <div className="mt-12">
            <table className="w-full shadow-lg">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <td key={header.name} className={`bg-dark-blue text-ultra-light-grey font-semibold ${header.name}`}>
                      {header.alias}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {volunteersList.map((volunteer, index) => (
                  <tr key={volunteer.id} className={`h-16 ${index % 2 === 0 ? 'bg-base' : 'bg-light-grey'}`}>
                    <Volunteer
                      key={volunteer.id}
                      volunteer={volunteer}
                      openModal={openModal}
                      setVolunteerToBeRemoved={setVolunteerToBeRemoved}
                      handleUpdateVolunteerParticipationStatus={
                        handleUpdateVolunteerParticipationStatus
                      }
                    />
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-12 flex justify-center">
                <Pagination
                  numberOfPages={numberOfPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  getVolunteers={getVolunteers}
                />
            </div>
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
