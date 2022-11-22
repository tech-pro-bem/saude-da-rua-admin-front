/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import detailsIcon from '../assets/details.svg';
import trashIcon from '../assets/trash.svg';
import { useToast } from '../contexts/toastContext';
import { useVolunteers } from '../contexts/volunteersContext';

export default function VolunteerData({ volunteer, openModal, setVolunteerToBeRemoved }) {
  const [participationStatus, setParticipationStatus] = useState(volunteer.participation);
  const { updateVolunteerParticipationStatus } = useVolunteers();
  const { addToast } = useToast();

  const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  async function handleChangeParticipationStatus() {
    try {
      await updateVolunteerParticipationStatus(volunteer.id);
      setParticipationStatus(!participationStatus);
      addToast('success');
    } catch (error) {
      addToast('error');
      // console.log(error);
    }
  }

  function handleRemoveVolunteer() {
    setVolunteerToBeRemoved(volunteer.id);
    openModal();
  }

  return (
    <>
      <td className="p-2 text-primary-black">
        <div className="flex justify-center">
          <div className="form-check form-switch">
            <input
              className={`form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm
                ${participationStatus ? 'bg-primary-blue' : 'bg-medium-grey'}`}
              type="checkbox"
              title="Alterar status de participação do(a) voluntário(a)"
              checked={participationStatus}
              role="switch"
              onChange={() => handleChangeParticipationStatus()}
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      </td>
      <td>{volunteer.name}</td>
      <td>{volunteer.occupation}</td>
      <td>
        <div className="flex items-center gap-1">
          {volunteer.availability.map((isAvailableDay, index) => (
            <span
              key={index}
              className={`w-[18px] h-8 rounded-[4px] p-1 
                ${isAvailableDay ? 'bg-light-blue' : 'bg-transparent'}`}
            >
              {weekDays[index]}
            </span>
          ))}
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {/* Mudar o link para página de detalhes do voluntário quando estiver pronta! */}
          <Link to="/" title="Ir para página de detalhes do voluntário">
            <img src={detailsIcon} alt="Ícone de página com conteúdo escrito" />
          </Link>
          <button type="button" title="Remover voluntário" onClick={handleRemoveVolunteer}>
            <img src={trashIcon} alt="Ícone de lixeira" />
          </button>
        </div>
      </td>

    </>
  );
}
