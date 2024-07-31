import Image from 'next/image';
import React from 'react';
import PatientForm from '@/components/forms/PatientForm';
import Link from 'next/link';
import { APP_NAME, ICONS_URL, IMAGES_URL } from '@/constants';

const Home = () => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO:: Add OTP verification | Passkey Modal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src={`${ICONS_URL}/logo-full.svg`}
            className="mb-12 h-10 w-fit"
            height={1000}
            width={1000}
            alt="logo"
          />
          {/* Used to Authenticate the User, NOT to register it */}
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify">© 2024 {APP_NAME}</p>
            <Link href="/?admin=true" className="text-green-500">
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
