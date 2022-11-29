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
import weekDays from '../data/weekDays';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import axiosInstance from '../service/axiosInstance';

export default function Volunteers() {
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [volunteersList, setVolunteersList] = useState([]);
  const [volunteerToBeRemoved, setVolunteerToBeRemoved] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const formInitialState = { searchValue: '' };
  const {
    register,
    handleSubmit,
  } = useForm({ defaultValues: formInitialState });

  function openModal() { setIsModalOpen(true); }
  function closeModal() { setIsModalOpen(false); }

  function clearVolunteersList() {
    setVolunteersList([]);
  }

  async function getVolunteers() {
    try {
      const { data } = await axiosInstance.get('/volunteers?limit=10');
      const volunteers = data.map((volunteer) => {
        const {
          id,
          fullName,
          isCurrentlyParticipating,
          email,
          listFreeDaysOfWeek,
          occupation,
        } = volunteer;

        const availability = weekDays.map((day) => listFreeDaysOfWeek.includes(day));

        return {
          id,
          fullName,
          email,
          occupation,
          availability,
          participation: isCurrentlyParticipating,
        };
      });
      setVolunteersList(volunteers);
    } catch (error) {
      addToast('error');
    }
  }

  async function updateVolunteerParticipationStatus(volunteer) {
    try {
      await axiosInstance.patch(`/volunteers/${volunteer.id}/participation`, {
        currentlyParticipation: !volunteer.participation,
      });
      addToast('success');
      getVolunteers();
    } catch (error) {
      addToast('error');
    }
  }

  async function deleteVolunteer() {
    if (!volunteerToBeRemoved || typeof volunteerToBeRemoved !== 'string') return;

    try {
      await axiosInstance.delete(`volunteers/${volunteerToBeRemoved}`);
      addToast('success');
    } catch (error) {
      addToast('error');
    } finally {
      setVolunteerToBeRemoved(null);
      closeModal();
      getVolunteers();
    }
  }

  async function filterVolunteersListByName(name) {
    if (!name || typeof name !== 'string' || !volunteersList.length) return;
    console.log(name);
  }

  async function fetchVolunteersListByPage(page) {
    console.log(page);
  }

  async function onSubmit({ searchValue }) {
    if (!searchValue) {
      clearVolunteersList();
      return;
    }

    filterVolunteersListByName(searchValue);
  }

  useEffect(() => {
    getVolunteers();
  }, []);

  useEffect(() => {
    if (!volunteersList.length) return;
    setNumberOfPages(3);
  }, [volunteersList]);

  return (
    <AuthenticatedLayout>
      <main className="w-full min-h-screen mr-[190px]">
        <h1 className="mt-16 mb-10 text-dark-blue text-[32px] leading-[48px] font-semibold">
          Voluntários
        </h1>
        <form
          className="relative -z-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="border-primary-black border w-full py-3 px-6 rounded-full text-primary-black placeholder:text-medium-grey"
            type="text"
            id="searchValue"
            name="searchValue"
            autoComplete="off"
            placeholder="Pesquise por nome, profissão, disponibilidade ou participação"
            {...register('searchValue')}
          />
          <button
            className="absolute inset-y-0 right-6"
            type="submit"
          >
            <img src={searchIcon} alt="Ícone de busca" />
          </button>
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
                      updateVolunteerParticipationStatus={updateVolunteerParticipationStatus}
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
                  fetchVolunteersListByPage={fetchVolunteersListByPage}
                />
            </div>
          </div>
        )}
      </main>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onCommit={deleteVolunteer}
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
