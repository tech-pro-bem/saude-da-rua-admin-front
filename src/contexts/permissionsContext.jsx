/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../service/axiosInstance';
import { useToast } from './toastContext';
import { ADMIN_MASTER, ADMIN_VOLUNTEER, PERMISSION_LEVEL } from '../data/permissions';

const permissionsContext = React.createContext({});

export function PermissionsProvider({ children }) {
  const [userPermission, setUserPermission] = useState('');

  const { addToast } = useToast();

  const getPermissions = async () => {
    try {
      const response = await axiosInstance.get('/get/admin/me');
      if (response.data.permissionLevel === PERMISSION_LEVEL) {
        setUserPermission(ADMIN_MASTER);
      } else {
        setUserPermission(ADMIN_VOLUNTEER);
      }
    } catch {
      addToast('error');
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <permissionsContext.Provider value={{ userPermission, getPermissions }}>
      {children}
    </permissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(permissionsContext);
  if (!context) {
    throw Error('PermissionsProvider needs to be set before using the context.');
  }

  return context;
}
