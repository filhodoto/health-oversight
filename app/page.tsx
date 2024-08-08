import Image from 'next/image';
import React from 'react';
import PatientForm from '@/components/forms/PatientForm';
import Link from 'next/link';
import { APP_NAME, ICONS_URL, IMAGES_URL } from '@/constants';
import PasskeyModal from '@/components/PasskeyModal';

const Home = ({ searchParams }: SearchParamProps) => {
  // Check if it's admin navigation by checking "/?admin=true" in url
  const isAdmin = searchParams.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">
      {/* If it's a navigation to admin, show Passkey Modal*/}
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="mb-12 flex items-center">
            <Image
              src={`${ICONS_URL}/logo-icon.svg`}
              className="logo-icon"
              height={24}
              width={24}
              alt="logo"
            />
            <p className="sub-header">Health Oversight</p>
          </div>
          {/* Used to Authenticate the User, NOT to register it */}
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify">© 2024 {APP_NAME}</p>
            <Link href="/?admin=true" className="text-primary-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src={`${IMAGES_URL}/onboarding-img.png`}
        className="side-img max-w-[50%]"
        height={1000}
        width={1000}
        alt="patient"
      />
    </div>
  );
};

export default Home;
