import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { getSessionStorage } from '../../utils/sessionStorage';

function AuthenticatedLayout({ children }) {
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    const tokenExpirationTime = jwtDecode(token).exp * 1000;
    const currentTime = new Date().getTime();
    const isExpired = (tokenExpirationTime - currentTime) < 0;
    return isExpired;
  };

  useEffect(() => {
    const token = getSessionStorage('token');
    const isToken = !!token;

    if (!isToken || (isToken && isTokenExpired(token))) {
      navigate('/login');
    }
  }, []);
  return (
    <div className="flex">
      <div className="mr-[205px]">
        <SideBar />
      </div>
      {children}
    </div>
  );
}

export default AuthenticatedLayout;
