import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Modal from '../components/Modal';
import ToastContainer from '../components/Toast/ToastContainer';
import { useToast } from '../contexts/toastContext';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import axiosInstance from '../service/axiosInstance';
import { usePermissions } from '../contexts/permissionsContext';
import { ADMIN_MASTER } from '../data/permissions';

export default function PixUpdate() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { dirtyFields, isValid, errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { pixKey: '', confirmPixKey: '' },
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentPixKey, setCurrentPixKey] = useState('');
  const [newPixKey, setNewPixKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToast } = useToast();
  const { userPermission } = usePermissions();

  const getPixKey = async () => {
    try {
      const response = await axiosInstance.get('/pix');
      const { key } = response.data;
      setCurrentPixKey(key);
    } catch {
      addToast('error');
    }
  };

  useEffect(() => {
    getPixKey();
  }, []);

  useEffect(() => {
    if (userPermission && userPermission !== ADMIN_MASTER) {
      addToast('warning');
    }
  }, [userPermission]);

  useEffect(() => {
    if (Object.values(dirtyFields).every(Boolean) && isValid) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [dirtyFields, isValid, errors]);

  const onSubmit = () => {
    setIsModalOpen(true);
  };

  const updatePixKey = async () => {
    try {
      const response = await axiosInstance.put('/pix', { key: newPixKey });

      if (response.status === 209) {
        setCurrentPixKey(newPixKey);
        addToast('success');
        reset();
      }
    } catch {
      addToast('error');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <main className=" min-h-screen w-[435px]">
        <h1 className="mt-16 mb-[2px] text-dark-blue text-[32px] leading-[48px] font-semibold">
          Chave Pix
        </h1>
        <span className="leading-6 text-primary-black">Consulte a nossa chave Pix abaixo.</span>
        <div className="border-b-2 border-light-silver pb-8 ">
          <h2 className="font-bold text-primary-black leading-[27px] text-lg mb-6 mt-12">
            Chave pix atual
          </h2>
          <div className=" bg-ultra-light-grey w-full flex items-center h-[45px] px-6 rounded-lg ">
            <p className="text-dark-grey font-semibold">{currentPixKey}</p>
          </div>
        </div>

        {userPermission === ADMIN_MASTER ? (
          <>
            <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
              <h2 className="font-bold text-primary-black leading-[27px] text-lg mb-6 mt-8">
                Atualizar Chave PIX
              </h2>
              <div className="flex flex-col mb-6">
                <Input
                  placeholder="saudedarua@gmail.com.br"
                  name="pixKey"
                  control={control}
                  label="Nova chave PIX"
                  onChange={(e) => setNewPixKey(e.target.value)}
                  rules={{
                    validate: (v) => v !== '',
                    deps: ['confirmPixKey'],
                  }}
                />
              </div>
              <div className="flex flex-col mb-12">
                <Input
                  placeholder="saudedarua@gmail.com.br"
                  name="confirmPixKey"
                  control={control}
                  label="Confirmar a nova chave Pix"
                  rules={{
                    validate: (v) => (v !== '' && v === newPixKey) || 'As chaves digitadas não conferem',
                    deps: ['pixKey'],
                  }}
                />
              </div>
              <div className="flex content-center items-center gap-x-6">
                <Link to="/">
                  <button
                    type="button"
                    className="w-[202px] border-primary-black border-[1px] rounded-full font-bold h-12"
                  >
                    Voltar
                  </button>
                </Link>
                <button
                  type="submit"
                  className="btn primary-btn h-12 w-[202px]"
                  disabled={isButtonDisabled}
                >
                  Atualizar
                </button>
              </div>
            </form>
            <Modal
              open={isModalOpen}
              setOpen={setIsModalOpen}
              onCommit={updatePixKey}
              confirmationTitle="Alterar chave PIX"
              cancelButtonText="Cancelar"
              confirmationButtonText="Sim, atualizar"
            >
              <span className="pb-6 block">
                A chave Pix que é exibida no site do Saúde da Rua será alterada.
              </span>
              <span className="pb-1 block">
                De:
                {' '}
                {currentPixKey}
              </span>
              <strong className="pb-6 block">
                Para:
                {' '}
                {newPixKey}
              </strong>
              <span>Confirmar a atualização da chave Pix?</span>
            </Modal>
          </>
        ) : (
          <Link to="/">
            <button type="button" className="btn primary-btn h-12 w-[202px] mt-[72px]">
              Voltar
            </button>
          </Link>
        )}
      </main>
      <ToastContainer />
    </AuthenticatedLayout>
  );
}
