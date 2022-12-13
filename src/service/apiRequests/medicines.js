import axiosInstance from '../axiosInstance';

async function fetchMedicines(wasRead) {
  try {
    const { data } = await axiosInstance.get('/medicines', {
      params: {
        ...(wasRead || !wasRead ? { wasRead } : {}),
      },
    });

    const totalPages = Math.ceil(data.count / 8);
    return { data, totalPages };
  } catch (error) {
    throw new Error('Error when fetching list of medicines');
  }
}

async function getMedicineById(id) {
  try {
    const { data } = await axiosInstance.get(`/medicines/${id}`);

    return data;
  } catch {
    throw new Error('Error when fetching medicine by id');
  }
}

// async function updateVolunteerParticipationStatus(volunteer) {
//   try {
//     await axiosInstance.patch(`/volunteers/${volunteer.id}/participation`, {
//       currentlyParticipation: !volunteer.participation,
//     });
//   } catch (error) {
//     throw new Error('Erro ao atualizar o status de participação do voluntário');
//   }
// }

async function deleteMedicine(medicineId) {
  try {
    await axiosInstance.delete(`medicines/${medicineId}`);
  } catch (error) {
    throw new Error('Error deleting volunteer');
  }
}

export {
  fetchMedicines,
  deleteMedicine,
  getMedicineById,
  //  updateVolunteerParticipationStatus
};
