/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import trashIcon from '../../assets/trash.svg';
import detailsIcon from '../../assets/details.svg';
import { useToast } from '../../contexts/toastContext';
import { usePermissions } from '../../contexts/permissionsContext';
import { ADMIN_MASTER } from '../../data/permissions';
import formatExpirationDate from '../../utils/formatExpirationDate';

export default function Medicine({
  medicine,
  openModal,
  setMedicineToBeDeleted,
}) {
  const { userPermission } = usePermissions();
  const { addToast } = useToast();

  function handleRemoveMedicine() {
    if (userPermission === ADMIN_MASTER) {
      setMedicineToBeDeleted(medicine.id);
      openModal();
    } else {
      addToast('warning');
    }
  }

  return (
    <>
      <td className="text-center">
        <p>{medicine?.wasRead ? 'Lido' : 'Não lido'}</p>
      </td>
      <td className="text-center">
        <p>{medicine?.fullName}</p>
      </td>
      <td className="text-center">
        <p>{medicine?.medicineName}</p>
      </td>
      <td className="text-center">
        <p>{medicine?.quantity}</p>
      </td>
      <td className="text-center">
        <p>{medicine?.milligrams}</p>
      </td>
      <td className="text-center">
        <p>{medicine?.pharmaceuticalForm}</p>
      </td>
      <td className="text-center">
        <p>{formatExpirationDate(medicine?.expirationDate)}</p>
      </td>

      <td>
        <div className="flex items-center justify-center gap-2">
          <Link to={`/medicamentos/${medicine.id}`} title="Ir para página de detalhes do medicamento">
            <img src={detailsIcon} alt="Ícone de página com conteúdo escrito" />
          </Link>
          <button type="button" title="Remover medicamento" onClick={handleRemoveMedicine}>
            <img src={trashIcon} alt="Ícone de lixeira" />
          </button>
        </div>
      </td>
    </>
  );
}
