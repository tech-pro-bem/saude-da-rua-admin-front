/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ghostImg from '../assets/ghost.svg';
import searchIcon from '../assets/search.svg';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination/Pagination';
import ToastContainer from '../components/Toast/ToastContainer';
import VolunteerData from '../components/VolunteerData';
import { useToast } from '../contexts/toastContext';
import { useVolunteers } from '../contexts/volunteersContext';
import tableHeaders from '../data/tableHeaders';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';

export default function Volunteers() {
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volunteerToBeRemoved, setVolunteerToBeRemoved] = useState(null);

  const {
    volunteersList,
    clearVolunteersList,
    filterVolunteersListByName,
    deleteVolunteer,
  } = useVolunteers();

  const formInitialState = { searchValue: '' };
  const {
    register,
    handleSubmit,
  } = useForm({ defaultValues: formInitialState });

  function openModal() { setIsModalOpen(true); }
  function closeModal() { setIsModalOpen(false); }

  async function onSubmit({ searchValue }) {
    if (!searchValue) {
      clearVolunteersList();
      return;
    }

    filterVolunteersListByName(searchValue);
  }

  async function handleDeleteVolunteer() {
    if (volunteerToBeRemoved === null) return;
    try {
      await deleteVolunteer(volunteerToBeRemoved);
      addToast('success');
    } catch (error) {
      addToast('error');
      console.log(error);
    }
    closeModal();
  }

  return (
    <AuthenticatedLayout>
      <main className="w-full min-h-screen mr-[190px]">
        <h1 className="mt-16 mb-10 text-dark-blue text-[32px] leading-[48px] font-semibold">
          Voluntários
        </h1>
        <form
          className="relative"
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
                    <VolunteerData
                      key={volunteer.id}
                      volunteer={volunteer}
                      openModal={openModal}
                      setVolunteerToBeRemoved={setVolunteerToBeRemoved}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-12 flex justify-center">
              <Pagination />
            </div>
          </div>
        )}
      </main>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        confirmationTitle="Confirmar ação"
        onCommit={handleDeleteVolunteer}
        cancelButtonText="Cancelar"
        text="Deseja mesmo realizar essa exclusão?"
        confirmationButtonText="Sim, excluir"
      />
      <ToastContainer />
    </AuthenticatedLayout>
  );
}
