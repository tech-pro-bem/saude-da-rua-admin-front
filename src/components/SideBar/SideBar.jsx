/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Home from '../../assets/home.svg';
import List from '../../assets/list.svg';
import File from '../../assets/file.svg';
import User from '../../assets/user.svg';
import Settings from '../../assets/settings.svg';
import Logout from '../../assets/logout.svg';

function SideBar() {
  const [open, setOpen] = useState(false);
  const router = useLocation();

  const Menus = [
    {
      name: 'Início',
      icon: Home,
      path: '/',
    },
    {
      name: 'Planilha de voluntários',
      icon: List,
      path: '/planilha',
    },
    {
      name: ' Relatórios financeiros',
      icon: File,
      path: '/relatorios',
    },
    {
      name: 'Acessos',
      icon: User,
      path: '/acessos',
    },
    {
      name: 'Configurações da conta',
      icon: Settings,
      path: '/congifuracoes',
    },
    {
      name: 'Sair',
      icon: Logout,
      path: '/login',
      color: 'text-error',
    },
  ];

  return (
    <aside
      className={` ${
        open ? 'w-[291px]' : 'w-[94px]'
      } flex fixed left-0 bg-base h-screen duration-300 ease-in-out 
      shadow-[0_4px_4px_rgba(16,24,40,0.1)]
      `}
      aria-label="Sidebar"
    >
      <nav>
        <ul
          className="mt-10"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {Menus.map((menu) => (
            <Link to={menu.path}>
              <li
                key={menu.title}
                className={`flex items-center mb-4 ml-2 p-4 rounded-lg hover:bg-light-blue ${
                  router.pathname === menu.path && 'bg-light-blue'
                }`}
              >
                <img
                  src={menu.icon}
                  alt="Home"
                  className="w-[23.33px] h-[25.67px] ml-2"
                />
                <span
                  className={`${
                    !open && 'scale-0 left-0 w-0'
                  } ml-2  duration-300 whitespace-nowrap origin-left ${
                    menu.color || 'text-primary-black'
                  }`}
                >
                  {menu.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
