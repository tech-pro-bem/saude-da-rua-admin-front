import weekDays from '../../data/weekDays';
import axiosInstance from '../axiosInstance';

async function fetchVolunteers(searchTerm, limit = 15, page = 0) {
  const searchParam = searchTerm ? `&searchTerm=${searchTerm}` : '';

  try {
    const { data } = await axiosInstance.get(
      `/volunteers?page=${page}&limit=${limit}${searchParam}`
    );
    const volunteers = data.volunteers.map((volunteer) => {
      const { id, fullName, isCurrentlyParticipating, email, listFreeDaysOfWeek, occupation } =
        volunteer;

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

    const totalPages = Math.ceil(data.count / limit);
    return { volunteers, totalPages };
  } catch (error) {
    throw new Error('Erro ao carregar a lista de voluntários');
  }
}

async function updateVolunteerParticipationStatus(volunteer) {
  try {
    await axiosInstance.patch(`/volunteers/${volunteer.id}`, {
      currentlyParticipation: !volunteer.participation,
    });
  } catch (error) {
    throw new Error('Erro ao atualizar o status de participação do voluntário');
  }
}

async function deleteVolunteer(volunteer) {
  try {
    await axiosInstance.delete(`volunteers/${volunteer}`);
  } catch (error) {
    throw new Error('Erro ao deletar voluntário');
  }
}

export { fetchVolunteers, updateVolunteerParticipationStatus, deleteVolunteer };
