import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMedicineById } from '../service/apiRequests/medicines';
import { useToast } from '../contexts/toastContext';
import formatExpirationDate from '../utils/formatExpirationDate';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';

function MedicineDetails() {
  const [medicineDetails, setMedicineDetails] = useState({});

  const { addToast } = useToast();
  const { id } = useParams();

  const getMedicine = async () => {
    try {
      const data = await getMedicineById(id);
      setMedicineDetails(data);
    } catch {
      addToast('error');
    }
  };

  useEffect(() => {
    getMedicine();
  }, []);

  return (
    <AuthenticatedLayout>
      <main className="flex flex-col gap-10 pt-16 pb-56 max-w-[1030px] w-full">
        <div className="border-b-2 border-dark-blue ">
          <h1 className="font-semibold text-[2rem] text-dark-blue leading-[3rem]">
            Detalhes do medicamento
          </h1>
        </div>

        <div className="w-full border border-light-grey px-6 py-4 flex flex-col gap-4 rounded-lg">
          <h3 className="font-bold text-lg text-primary-black">Contato</h3>
          <div className="flex">
            <div className="flex flex-col w-7/12 gap-4">
              <span className="font-semibold text-primary-black">
                Nome:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.fullName}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                Email:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.email}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-primary-black">
                Telefone:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.cellPhoneWithDDD}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full border border-light-grey px-6 py-4 flex flex-col gap-4 rounded-lg">
          <h3 className="font-bold text-lg text-primary-black">Endereço</h3>
          <div className="flex">
            <div className="flex flex-col w-7/12 gap-4">
              <span className="font-semibold text-primary-black">
                Endereço:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.address}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                Cidade:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.city }
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-primary-black">
                Estado:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.state}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                CEP:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.CEP}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full border border-light-grey px-6 py-4 flex flex-col gap-4 rounded-lg">
          <h3 className="font-bold text-lg text-primary-black">Medicamento</h3>
          <div className="flex">
            <div className="flex flex-col w-7/12 gap-4">
              <span className="font-semibold text-primary-black">
                Nome do medicamento:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.medicineName}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                Concentração:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.milligrams}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                Quantidade:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.quantity}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-primary-black">
                Prazo de validade:
                <span className="font-normal text-primary-black">
                  {' '}
                  {formatExpirationDate(medicineDetails?.expirationDate)}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                Forma Farmacêutica:
                <span className="font-normal text-primary-black">
                  {' '}
                  {medicineDetails?.pharmaceuticalForm}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mb-[103px]">
          <Link
            to="/medicamentos"
            className="py-4 px-24 bg-primary-black text-base font-bold rounded-full disabled:bg-light-grey disabled:text-medium-grey disable:cursor-not-allowed"
          >
            Voltar
          </Link>
        </div>
      </main>
    </AuthenticatedLayout>
  );
}

export default MedicineDetails;
