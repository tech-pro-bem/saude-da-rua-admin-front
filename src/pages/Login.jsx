import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import eyeClosedIcon from '../assets/eye-off.svg';
import eyeOpenIcon from '../assets/eye-on.svg';
import { saveLocalStorage, getLocalStorage } from '../utils/localStorage';

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasLoginErrorOccurred, setHasLoginErrorOccurred] = useState(false);

  const formInitialState = { email: '', password: '' };
  const {
    register,
    handleSubmit,
    reset,

  function onSubmit(data) {
    alert(JSON.stringify(data));
    setHasLoginErrorOccurred(true);
  }

  return (
    <main className="min-h-screen flex justify-center items-center relative">
      <section className="bg-base w-full max-w-[563px] py-[142px] px-12 shadow-xl">
        <h1 className="font-semibold text-[32px] leading-[48px] text-center mb-8 text-primary-black">Saúde da Rua</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="flex flex-col mb-6">
            <span className="text-primary-black mb-2">E-mail</span>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Digite o e-mail cadastrado"
              className={`px-6 py-3 bg-transparent rounded-lg text-primary-black placeholder:text-medium-grey
                outline outline-1 ${hasLoginErrorOccurred ? 'outline-error' : 'outline-primary-black'}`}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('email')}
            />
          </label>
          <label htmlFor="password" className="flex flex-col mb-5">
            <span className="text-primary-black mb-2">Senha</span>
            <div className="w-full relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                required
                placeholder="Digite a sua senha"
                className={`w-full px-6 py-3 pr-14 bg-transparent rounded-lg text-primary-black placeholder:text-medium-grey
                outline outline-1 ${hasLoginErrorOccurred ? 'outline-error' : 'outline-primary-black'}`}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('password')}
              />
              <div className="pl-2 absolute inset-y-0 right-4 h-full flex items-center">
                <button
                  type="button"
                  onClick={() => { setIsPasswordVisible(!isPasswordVisible); }}
                  title={isPasswordVisible ? 'Esconder senha' : 'Mostrar senha'}
                >
                  {isPasswordVisible ? (
                    <img src={eyeClosedIcon} alt="Ícone de um olho fechado." />
                  ) : (
                    <img src={eyeOpenIcon} alt="Ícone de um olho aberto." />
                  )}
                </button>
              </div>
            </div>
            {hasLoginErrorOccurred && (
              <span className="mt-1 text-sm text-error">
                E-mail e/ou senha incorretos
              </span>
            )}
          </label>
          <div className="flex items-center gap-2 mb-[60px]">
            <input type="checkbox" name="remember" id="remember" className="scale-125" />
            <span className="mt-1">Lembrar de mim no próximo acesso</span>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn primary-btn btn-small">
              Entrar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
export default Login;
