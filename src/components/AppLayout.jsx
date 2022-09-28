import React from 'react';
import { UserAuth } from '../context/AuthContext';

import AddApplication from '../components/AddApplication';
import ApplicationsTable from '../components/ApplicationsTable';
import CoverLetter from '../components/CoverLetter';
import Profile from '../components/Profile';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';

import { mainNav } from '../constants/nav';

function IndexPage() {
  const { selectedNav } = UserAuth();

  return (
    <>
      <div className=" border-b border-primary-border py-4 px-5">
        <Navigation />
      </div>
      <div className="px-5">
        {selectedNav === mainNav.Dashboard && <Dashboard />}
        {selectedNav === mainNav.Apply && <AddApplication />}
        {selectedNav === mainNav.Applications && <ApplicationsTable />}
        {selectedNav === mainNav.CoverLetter && <CoverLetter />}
        {selectedNav === mainNav.Profile && <Profile />}
      </div>
    </>
  );
}
export default IndexPage;
