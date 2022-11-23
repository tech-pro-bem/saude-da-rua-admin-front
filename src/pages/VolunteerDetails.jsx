import React from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import MainVolunterrDetails from '../components/MainVolunterrDetails';

function VolunteerDetails() {
  return (
    <AuthenticatedLayout>
      <MainVolunterrDetails />
    </AuthenticatedLayout>
  );
}

export default VolunteerDetails;
