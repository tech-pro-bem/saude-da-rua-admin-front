/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useState
} from 'react';
import volunteers from '../data/volunteers';

const VolunteersContext = React.createContext({});

export function VolunteersProvider({ children }) {
  const [volunteersList, setVolunteersList] = useState([]);

  async function getVolunteersList() {
    setVolunteersList(volunteers);
  }

  async function fetchVolunteersListByPage(page) {
    console.log(page);
    setVolunteersList(volunteers);
  }

  async function filterVolunteersListByName(name) {
    if (!name || typeof name !== 'string') return;

    const newVolunteersList = volunteers.filter(
      (volunteer) => volunteer.name.toLowerCase().includes(name.toLowerCase()),
    );

    setVolunteersList(newVolunteersList);
  }

  function clearVolunteersList() {
    setVolunteersList([]);
  }

  async function updateVolunteerParticipationStatus(volunteerId) {
    alert(`id do voluntário para atualização: ${volunteerId}`);
  }

  async function deleteVolunteer(volunteerId) {
    if (!volunteerId || typeof volunteerId !== 'number') return;
    alert(`id do voluntário a ser removido: ${volunteerId}`);
  }

  useEffect(() => {
    getVolunteersList();
  }, []);

  return (
    <VolunteersContext.Provider value={{
      volunteersList,
      clearVolunteersList,
      getVolunteersList,
      deleteVolunteer,
      filterVolunteersListByName,
      fetchVolunteersListByPage,
      updateVolunteerParticipationStatus,
    }}
    >
      {children}
    </VolunteersContext.Provider>
  );
}

export const useVolunteers = () => useContext(VolunteersContext);
