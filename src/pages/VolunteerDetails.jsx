/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { formatInTimeZone } from 'date-fns-tz';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import editIcon from '../assets/edit.svg';
import ToastContainer from '../components/Toast/ToastContainer';
import { useToast } from '../contexts/toastContext';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import axiosInstance from '../service/axiosInstance';

function VolunteerDetails() {
  const textMaxSize = 255;

  const { volunteerId } = useParams();
  const { addToast } = useToast();

  const [comments, setComments] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [volunteerData, setVolunteerData] = useState(null);
  const [dataFetchingError, setDataFetchingError] = useState(false);

  const commentsRef = useRef(null);

  async function getVolunteerData() {
    setDataFetchingError(false);
    try {
      const { data } = await axiosInstance.get(`/volunteer/${volunteerId}`);
      console.log(data);
      setVolunteerData(data);
    } catch (error) {
      setDataFetchingError(true);
      addToast('error');
    }
  }

  function handleSubmit() {
    if (!comments) {
      addToast('error');
      return;
    }

    console.log(comments);
    /* Chamar API do backend passando o valor do estado "comments"! */
  }

  useEffect(() => {
    if (isEditing) {
      commentsRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    getVolunteerData();
  }, []);

  if (!dataFetchingError && !volunteerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-3xl text-primary-blue">
          Carregando...
        </p>
      </div>
    );
  }

  if (dataFetchingError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-3xl text-error flex flex-col gap-4 items-center justify-center">
          <span className="block">Algo deu errado :/</span>
          <span className="block">Por favor, tente novamente.</span>
        </p>
      </div>
    );
  }

  return (
    <AuthenticatedLayout>
      <main className="flex flex-col gap-10 pt-16 pb-56 max-w-[1030px] w-full">
        <div className="border-b-2 border-dark-blue ">
          <h1 className="font-semibold text-[2rem] text-dark-blue leading-[3rem]">
            Formulário do voluntário
          </h1>
        </div>

        <div className="w-full border border-light-grey px-6 py-4 flex flex-col gap-4 rounded-lg">
          <h3 className="font-bold text-lg text-primary-black">Dados pessoais</h3>
          <div className="flex">
            <div className="flex flex-col w-7/12">
              <span className="font-semibold text-primary-black">
                Nome:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.fullName}
                </span>
              </span>
            </div>
            <div>
              <span className="font-semibold text-primary-black">
                Data de nascimento:
                <span className="font-normal text-primary-black">
                  {' '}
                  {formatInTimeZone(new Date(volunteerData.birthdate), 'America/Sao_Paulo', 'dd/MM/yyyy')}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full border border-light-grey px-6 py-4 flex flex-col gap-4 rounded-lg">
          <h3 className="font-bold text-lg text-primary-black">Profissional</h3>
          <div className="flex">
            <div className="flex flex-col w-7/12 gap-4">
              <span className="font-semibold text-primary-black">
                Ocupação:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.occupation}
                </span>
              </span>

              <span className="font-semibold text-primary-black">
                Universidade:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.university}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                Experiência em Saúde da Mulher:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.timeOfExperience}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-primary-black">
                Curso:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.speciality}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                Semestre:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.semester}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full border border-light-grey px-6 py-4 flex flex-col gap-4 rounded-lg">
          <h3 className="font-bold text-lg text-primary-black">Contato</h3>
          <div className="flex ">
            <div className="flex flex-col w-7/12">
              <span className="font-semibold text-primary-black">
                Email:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.email}
                </span>
              </span>
            </div>
            <div>
              <span className="font-semibold text-primary-black">
                Telefone:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.cellphoneNumberWithDDD}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full border border-light-grey px-6 py-4 flex flex-col gap-4 rounded-lg">
          <h3 className="font-bold text-lg text-primary-black">Adicionais</h3>
          <div className="flex">
            <div className="flex flex-col w-7/12 gap-4">
              <span className="font-semibold text-primary-black">
                Disponibilidade:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.listFreeDaysOfWeek.join(' e ').toLowerCase()}
                </span>
              </span>
              <span className="font-semibold text-primary-black">
                Já participou de alguma ação:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.howMuchParticipate.startsWith('NOT') ? 'Não' : 'Sim'}
                </span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-primary-black">
                Como ficou sabendo do Saúde da Rua:
                <span className="font-normal text-primary-black">
                  {' '}
                  {volunteerData.howDidKnowOfSDR}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full py-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg px-6 text-primary-black">
              Observações
            </h3>
            <span className="flex">
              <img src={editIcon} alt="icone editar" />
              <button type="button" className="font-bold" onClick={() => setIsEditing(true)}>
                editar
              </button>
            </span>
          </div>
          <textarea
            className={`bg-ultra-light-grey rounded py-6 px-4 resize-none border-2  
              ${comments.length > 255 ? 'outline-error border-error' : 'outline-primary-blue border-transparent'
              }`}
            ref={commentsRef}
            onChange={(e) => setComments(e.target.value)}
            disabled={!isEditing}
          />
          {isEditing && (
            <span className={`text-right ${comments.length > textMaxSize ? 'text-error' : 'text-primary-black'}`}>
              {`${comments.length}/${textMaxSize}`}
            </span>
          )}
        </div>
        <div className="flex gap-6 mb-[103px]">
          <Link
            className="py-4 px-24 border-[1.5px] border-primary-black rounded-full font-bold"
            to="/voluntarios"
          >
            Voltar
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            className="py-4 px-24 bg-primary-black text-base font-bold rounded-full disabled:bg-light-grey disabled:text-medium-grey disable:cursor-not-allowed"
            disabled={comments.length > textMaxSize || !isEditing}
          >
            Salvar
          </button>
        </div>
      </main>
      <ToastContainer />
    </AuthenticatedLayout>
  );
}
export default VolunteerDetails;
