import React, { useRef, useState, useEffect } from 'react';
import svgEdit from '../../assets/editar.svg';

function MainVolunteerDetails() {
  const lIMITCHAR = 255;
  const [charCount, setCharCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const textArea = useRef(null);

  function handleClick() {
    setIsEditing(true);
  }

  useEffect(() => {
    if (isEditing) {
      textArea.current.focus();
    }
  }, [isEditing]);

  return (
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
                Pedro Lima
              </span>
            </span>
          </div>
          <div>
            <span className="font-semibold text-primary-black">
              Data de nascimento:
              <span className="font-normal text-primary-black">
                {' '}
                01/01/2021
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
              <span className="font-normal text-primary-black"> Estudante</span>
            </span>

            <span className="font-semibold text-primary-black">
              Universidade:
              <span className="font-normal text-primary-black">
                {' '}
                Universidade dos Médicos
              </span>
            </span>
            <span className="font-semibold text-primary-black">
              Experiência em Saúde da Mulher:
              <span className="font-normal text-primary-black">
                {' '}
                Sim, menos de 1 ano
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-primary-black">
              Curso:
              <span className="font-normal text-primary-black">
                {' '}
                Enfermagem
              </span>
            </span>
            <span className="font-semibold text-primary-black">
              Semestre:
              <span className="font-normal text-primary-black"> 3º</span>
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
                pedro.lima@gmail.com
              </span>
            </span>
          </div>
          <div>
            <span className="font-semibold text-primary-black">
              Telefone:
              <span className="font-normal text-primary-black">
                {' '}
                (11) 11111-1111
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
                segunda e quarta-feira
              </span>
            </span>
            <span className="font-semibold text-primary-black">
              Já participou de alguma ação:
              <span className="font-normal text-primary-black"> Sim</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-primary-black">
              Como ficou sabendo do Saúde da Rua:
              <span className="font-normal text-primary-black"> Site</span>
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
            <img src={svgEdit} alt="icone editar" />
            <button type="button" className="font-bold" onClick={handleClick}>
              editar
            </button>
          </span>
        </div>
        <textarea
          className={`bg-ultra-light-grey rounded py-6 px-4 resize-none  ${
            charCount > 255
              ? 'outline-error border-2 border-error'
              : 'outline-primary-blue border-2 border-transparent'
          }`}
          ref={textArea}
          onChange={(e) => setCharCount(e.target.value.length)}
          disabled={!isEditing}
        />
        <span
          className={`text-right ${
            charCount > lIMITCHAR ? 'text-error' : 'text-primary-black'
          }`}
        >
          {`${charCount}/${lIMITCHAR}`}

        </span>
      </div>
      <div className="flex gap-6 mb-[103px]">
        <button
          type="button"
          className="py-4 px-24 border-[1.5px] border-primary-black rounded-full font-bold"
        >
          Voltar
        </button>
        <button
          type="button"
          className="py-4 px-24 bg-primary-black text-base font-bold rounded-full disabled:bg-light-grey disabled:text-medium-grey disable:cursor-not-allowed"
          disabled={charCount > lIMITCHAR || !isEditing}
        >
          Salvar
        </button>
      </div>
    </main>
  );
}

export default MainVolunteerDetails;
