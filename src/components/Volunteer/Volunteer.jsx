/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import detailsIcon from '../../assets/details.svg';
import trashIcon from '../../assets/trash.svg';
import weekDays from '../../data/weekDays';

export default function Volunteer({
  volunteer,
  openModal,
  setVolunteerToBeRemoved,
  handleUpdateVolunteerParticipationStatus,
}) {
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
                ${volunteer.participation ? 'bg-primary-blue' : 'bg-medium-grey'}`}
              type="checkbox"
              title="Alterar status de participação do(a) voluntário(a)"
              checked={volunteer.participation}
              role="switch"
              onChange={() => { handleUpdateVolunteerParticipationStatus(volunteer); }}
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      </td>
      <td>{volunteer.fullName}</td>
      <td>{volunteer.occupation}</td>
      <td>
        <div className="flex items-center gap-1">
          {volunteer.availability.map((isAvailableDay, index) => (
            <span
              key={index}
              className={`w-[18px] h-8 rounded-[4px] p-1 
                ${isAvailableDay ? 'bg-light-blue' : 'bg-transparent'}`}
            >
              {weekDays[index].charAt(0)}
            </span>
          ))}
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center gap-2">
          <Link to={`/volunteer/${volunteer.id}`} title="Ir para página de detalhes do voluntário">
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
