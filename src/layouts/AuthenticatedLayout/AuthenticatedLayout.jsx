/* eslint-disable react/prop-types */
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
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
        <Sidebar />
      </div>
      {children}
    </div>
  );
}

export default AuthenticatedLayout;
