/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, {
  useCallback, useContext, useEffect, useState
} from 'react';
import { v4 as uuidv4 } from 'uuid';

const ToastContext = React.createContext({});

export function ToastProvider({ children }) {
  const [toastList, setToastList] = useState([]);

  const addToast = (toastType) => {
    if (toastType !== 'success' && toastType !== 'error' && toastType !== 'warning') return;

    const toast = {
      id: uuidv4(),
      type: toastType
    };
    setToastList([...toastList, toast]);
  };

  const removeToast = useCallback((id) => {
    const newToastList = toastList.filter((toast) => toast.id !== id);
    setToastList(newToastList);
  }, [toastList, setToastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        removeToast(toastList[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, setToastList]);

  return (
    <ToastContext.Provider value={{ toastList, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
