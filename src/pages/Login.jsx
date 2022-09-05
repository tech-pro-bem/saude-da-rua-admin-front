import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import eyeClosedIcon from '../assets/eye-off.svg';
import eyeOpenIcon from '../assets/eye-on.svg';
import isValidEmail from '../utils/isValidEmail';

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /* Login error message */
  const [hasLogginErrorOccurred, setHasLogginErrorOccurred] = useState(false);
  useEffect(() => {
    if (hasLogginErrorOccurred) {
      setTimeout(() => {
        setHasLogginErrorOccurred(false);
      }, 5000); // 5 seconds
    }
  }, [hasLogginErrorOccurred]);

  /* useForm setup */
  const formInitialState = { email: '', password: '' };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formInitialState });

  function onSubmit(data) {
    alert(JSON.stringify(data));
    setHasLogginErrorOccurred(true);
  }

  return (
    <main className="min-h-screen flex justify-center items-center relative">
      <section className="bg-base w-full max-w-lg py-24 px-12 shadow-xl">
        <h1 className="font-semibold text-[32px] leading-[48px] text-center mb-8 text-primary-black">Saúde da Rua</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Form Control */}
          <label htmlFor="email" className="flex flex-col mb-6">
            <span className="text-primary-black mb-2">E-mail</span>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Digite o e-mail cadastrado"
              className={`px-6 py-3 bg-transparent rounded-lg text-primary-black placeholder:text-medium-grey
                outline outline-1 ${errors.email ? 'outline-error' : 'outline-primary-black'}`}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('email', {
                required: true,
                validate: isValidEmail,
              })}
            />
            {errors.email && (
              <span className="mt-1 text-sm text-error">
                {errors.email.type === 'required' ? 'O campo de e-mail é obrigatório' : 'Formato de e-mail inválido'}
              </span>
            )}
          </label>
          {/* Password Form Control */}
          <label htmlFor="password" className="flex flex-col mb-5">
            <span className="text-primary-black mb-2">Senha</span>
            <div className="w-full relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Digite a sua senha"
                className={`w-full px-6 py-3 pr-14 bg-transparent rounded-lg text-primary-black placeholder:text-medium-grey
                outline outline-1 ${errors.password ? 'outline-error' : 'outline-primary-black'}`}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('password', {
                  required: {
                    value: true,
                    message: 'O campo de senha é obrigatório',
                  },
                  minLength: {
                    value: 5,
                    message: 'A senha deve ter pelo menos 5 caracteres',
                  },
                  maxLength: {
                    value: 30,
                    message: 'A senha não deve exceder 30 caracteres',
                  },
                })}
              />
              {/* Eye Mask Button */}
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
            {errors.password && (
              <span className="mt-1 text-sm text-error">
                {errors.password.message}
              </span>
            )}
          </label>
          {/* "Remember Me" Checkbox */}
          <div className="flex items-center gap-2 mb-[60px]">
            <input type="checkbox" name="remember" id="remember" className="scale-125" />
            <span className="mt-1">Lembrar de mim no próximo acesso</span>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="btn primary-btn btn-small">
              Entrar
            </button>
          </div>
        </form>
      </section>
      {/* Login error message */}
      {hasLogginErrorOccurred && (
        <div className="py-3 px-20 w-full max-w-lg absolute bottom-24 bg-error text-white rounded mt-10 flex justify-center">
          <span className="text-center">E-mail e/ou senha incorretos</span>
        </div>
      )}
    </main>
  );
}
export default Login;
