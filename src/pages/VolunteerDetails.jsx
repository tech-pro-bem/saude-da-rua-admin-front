import React from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import MainVolunterrDetails from '../components/MainVolunterrDetails';

function VoluteerDetails() {
  return (
    <AuthenticatedLayout>
      <MainVolunterrDetails />
    </AuthenticatedLayout>
  );
}

export default VoluteerDetails;
