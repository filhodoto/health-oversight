import Header from '@/components/Header';
import React from 'react';

const Admin = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />
      {/* <main className="mx-auto flex max-w-7xl flex-col space-y-14 border-2 border-yellow-300"> */}
      <main className="admin-main border-2 border-yellow-300">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">
            Start day with managing new appointments
          </p>
        </section>
        <section className="w-full space-y-4">
          <p className="text-dark-700">Admin stats</p>
        </section>
      </main>
    </div>
  );
};

export default Admin;
