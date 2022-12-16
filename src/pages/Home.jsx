import React from 'react';
import MainHome from '../components/MainHome';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';

function HomePage() {
  return (
    <AuthenticatedLayout>
      <MainHome />
    </AuthenticatedLayout>
  );
}

export default HomePage;
