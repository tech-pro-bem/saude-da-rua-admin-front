import React from 'react';
import SideBar from '../../components/SideBar/SideBar';

function AuthenticatedLayout({ children }) {
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
