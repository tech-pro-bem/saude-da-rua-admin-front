/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import File from '../../assets/file.svg';
import Home from '../../assets/home.svg';
import List from '../../assets/list.svg';
import Logout from '../../assets/logout.svg';
import Pix from '../../assets/pix.svg';
import Settings from '../../assets/settings.svg';
import User from '../../assets/user.svg';
import Medicines from '../../assets/medicines.svg';
import { removeSessionStorage } from '../../utils/sessionStorage';
import { removeLocalStorage } from '../../utils/localStorage';
import { usePermissions } from '../../contexts/permissionsContext';
import { ADMIN_MASTER } from '../../data/permissions';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const router = useLocation();
  const { userPermission } = usePermissions();

  const logOut = () => {
    removeLocalStorage('user');
    removeSessionStorage('token');
  };

  const items = [
    {
      name: 'Início',
      icon: Home,
      path: '/',
      isAdminVolunteerAllowed: true,
    },
    {
      name: 'Planilha de voluntários',
      icon: List,
      path: '/voluntarios',
      isAdminVolunteerAllowed: true,
    },
    {
      name: 'Relatórios financeiros',
      icon: File,
      path: '/relatorios',
      isAdminVolunteerAllowed: false,
    },
    {
      name: 'Chave PIX',
      icon: Pix,
      path: '/chave-pix',
      isAdminVolunteerAllowed: false,
    },
    {
      name: 'Medicamentos',
      icon: Medicines,
      path: '/medicamentos',
      isAdminVolunteerAllowed: true,
    },
    {
      name: 'Acessos',
      icon: User,
      path: '/acessos',
      isAdminVolunteerAllowed: true,
    },
    {
      name: 'Configurações da conta',
      icon: Settings,
      path: '/configuracoes',
      isAdminVolunteerAllowed: true,
    },
    {
      name: 'Sair',
      icon: Logout,
      path: '/login',
      color: 'text-error',
      isAdminVolunteerAllowed: true,
      handleClick: logOut,
    },
  ];
  const adminVolunteerAllowedItems = items.filter((menu) => menu.isAdminVolunteerAllowed);

  const menuItems = useMemo(
    () => (userPermission === ADMIN_MASTER ? items : adminVolunteerAllowedItems),
    [userPermission],
  );

  return (
    <aside
      className={`z-[999px] ${open ? 'w-[291px]' : 'w-[94px]'} 
      flex bg-base h-screen duration-500 transition-all fixed left-0
      shadow-[0_4px_4px_rgba(16,24,40,0.1)]
      `}
      aria-label="Sidebar"
    >
      <nav>
        <ul
          className="mt-16"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index} onClick={item.handleClick && item.handleClick}>
              <li
                className={`flex items-center mb-9 ml-0.5 px-8 py-3 hover:bg-light-blue ${
                  router.pathname === item.path && 'bg-light-blue'
                }`}
              >
                <img src={item.icon} alt="Home" className="w-7 h-7" />
                <span
                  className={`${
                    !open && 'scale-0 left-0 w-0'
                  } ml-3  duration-300 whitespace-nowrap origin-left ${
                    item.color || 'text-primary-black'
                  }`}
                >
                  {item.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
