import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../service/axiosInstance';
import homepageImage from '../../assets/homepage.png';
import { useToast } from '../../contexts/toastContext';
import ToastContainer from '../Toast/ToastContainer';

function MainHome() {
  const [userName, setUserName] = useState('');

  const { addToast } = useToast();

  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/get/admin/me');
      setUserName(response.data.name);
    } catch {
      addToast('error');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <main className="pt-16 pr-[182px] pb-56">
        <h1 className="font-semibold text-3xl text-dark-blue leading-[3rem]">
          {`Olá, ${userName}`}
        </h1>
        <p className="font-normal text-lg leading-[27px] text-gray-900  mb-12">
          Boas-vindas! Este é o painel de gestão do site do Saúde da Rua.
        </p>
        <p className="font-normal text-lg leading-[27px] text-gray-900 mb-6 max-w-[1122px]">
          Aqui você pode consultar a
          {' '}
          <Link to="/voluntarios"><strong>Planilha de Voluntários</strong></Link>
          , doações de
          {' '}
          <Link to="/medicamentos"><strong>Medicamentos</strong></Link>
          , gerenciar os
          {' '}
          <Link to="/relatorios"><strong>Relatórios Financeiros</strong></Link>
          {' '}
          e alterar a
          {' '}
          <Link to="/chave-pix"><strong>Chave Pix</strong></Link>
          .
        </p>
        <figure className="flex flex-col items-end gap-y-2">
          <img
            src={homepageImage}
            alt="voluntários da equipe saúde da rua"
          />
          <figcaption className="font-normal leading-6 text-gray-900">Equipe Saúde da Rua em ação.</figcaption>
        </figure>
      </main>
      <ToastContainer />
    </>
  );
}
export default MainHome;
