/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useToast } from '../../contexts/toastContext';
import Toast from './Toast';

function ToastContainer() {
  const { toastList } = useToast();

  return (
    <div className="w-[calc(100%-94px)] fixed top-0 right-0 z-10 overflow-hidden">
      <div className="w-full flex flex-col gap-4">
        {toastList.map((toast) => <Toast key={toast.id} toast={toast} />)}
      </div>
    </div>
  );
}
export default ToastContainer;
