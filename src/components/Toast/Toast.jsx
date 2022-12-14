/* eslint-disable react/prop-types */
import React from 'react';
import closeIcon from '../../assets/close.svg';
import errorIcon from '../../assets/error.svg';
import successIcon from '../../assets/success.svg';
import warningIcon from '../../assets/warning.svg';
import { useToast } from '../../contexts/toastContext';

function Toast({ toast }) {
  const { removeToast } = useToast();
  const { id, type } = toast;

  return (
    <div className={`h-[76px] w-full py-6 px-8 flex justify-between
      ${type === 'success' && 'bg-success'}
      ${type === 'error' && 'bg-error'}
      ${type === 'warning' && 'bg-warning'}
    `}
    >
      <div className="flex gap-3 items-center">

        {type === 'success' && <img src={successIcon} alt="Ícone de confirmação" />}
        {type === 'error' && <img src={errorIcon} alt="Ícone de erro" />}
        {type === 'warning' && <img src={warningIcon} alt="Ícone de erro" />}

        <span className="text-white text-lg font-semibold">
          {type === 'success' && 'Tudo certo!'}
          {type === 'error' && 'Algo deu errado, tente novamente.'}
          {type === 'warning' && 'Usuário sem permissão para executar essa ação.'}
        </span>
      </div>
      <div>
        <button type="button" title="Fechar mensagem" onClick={() => removeToast(id)}>
          <img src={closeIcon} alt="Ícone de fechar mensagem" />
        </button>
      </div>
    </div>
  );
}
export default Toast;
