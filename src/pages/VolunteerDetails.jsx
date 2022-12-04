import React from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import MainVolunteerDetails from '../components/MainVolunteerDetails';

function VolunteerDetails() {
  return (
    <AuthenticatedLayout>
      <MainVolunteerDetails />
    </AuthenticatedLayout>
  );
}

export default VolunteerDetails;
