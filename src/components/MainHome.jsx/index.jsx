import React, { useEffect, useState } from 'react';
import axiosInstance from '../../service/axiosInstance';
import homepageImage from '../../assets/homepage.png';

function MainHome() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    axiosInstance.get('/get/admin/me').then((response) => {
      setUserName(response.data.name);
    });
  }, []);

  return (
    <main className="pt-16 pr-[182px] pb-56">
      <h1 className="font-semibold text-3xl text-gray-900 leading-[3rem]">
        {`Olá, ${userName}`}
      </h1>
      <p className="font-normal text-lg leading-[27px] text-gray-900  mb-12">
        Boas vindas! Este é o painel de gestão do site do Saúde da Rua.
      </p>
      <p className="font-normal text-lg leading-[27px] text-gray-900 mb-6 max-w-[1122px]">
        Aqui você pode consultar a Planilha de Voluntários e os Relatórios Financeiros,
        além de editar o seu perfil e definir os usuários com permissão para editar o site.
      </p>
      <figure className="flex flex-col items-end gap-y-2">
        <img
          src={homepageImage}
          alt="voluntários da equipe saúde da rua"
        />
        <figcaption className="font-normal leading-6 text-gray-900">Equipe Saúde da Rua em ação.</figcaption>
      </figure>
    </main>
  );
}
export default MainHome;
