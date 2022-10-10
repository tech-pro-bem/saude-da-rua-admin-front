import React from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import MainHome from '../components/MainHome.jsx';

function HomePage() {
  return (
    <AuthenticatedLayout>
      <MainHome />
    </AuthenticatedLayout>
  );
}

export default HomePage;
