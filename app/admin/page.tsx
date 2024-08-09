import Header from '@/components/admin/Header';
import React from 'react';
import { ICONS_URL, STATUS_ICON } from '@/constants';
import { getRecentAppointments } from '@/lib/actions/appointments';
import AdminStats from '@/components/admin/AdminStats';

const Admin = async () => {
  const appointmentsData = await getRecentAppointments();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">
            Start day with managing new appointments
          </p>
        </section>
        <section className="w-full space-y-4">
          <p className="text-dark-700">Admin stats</p>
        </section>
        {appointmentsData && (
          <AdminStats appointmentStatus={appointmentsData.counts} />
        )}
      </main>
    </div>
  );
};

export default Admin;
