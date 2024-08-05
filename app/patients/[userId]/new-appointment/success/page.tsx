import React from 'react';
import { Button } from '@/components/ui/button';
import { ICONS_URL, DOCTORS, LOTTIE_URL } from '@/constants';
import { getAppointmentById } from '@/lib/actions/appointments';
import { formatDateTime, getCopyRightText } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import LottieAnimation from '@/components/LottieAnimation';

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  // Get appointment id from our search params using useSearchParams hook
  const { appointmentId } = searchParams;

  // Makes ure typescript knows we have appointment id and it's a string
  if (!appointmentId || typeof appointmentId !== 'string') {
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="m-auto flex flex-1 flex-col items-center">
          <p>Something went wrong</p>
        </div>
      </div>
    );
  }

  // Get appointment by appointment id
  const appointment = await getAppointmentById(appointmentId);

  // Get doctor info from appointment primary physician name
  const doctor = DOCTORS.find(
    (doctor) => doctor.name === appointment?.primaryPhysician,
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <div className="mb-10 flex items-center">
            <Image
              src={`${ICONS_URL}/logo-icon.svg`}
              className="logo-icon"
              height={24}
              width={24}
              alt="logo"
            />
            <p className="sub-header">Health Oversight</p>
          </div>
        </Link>
        <section className="flex flex-col items-center text-center">
          <div className="mb-6 max-w-md">
            <LottieAnimation src={`${LOTTIE_URL}/success_lottie.json`} />
          </div>

          <h2 className="header mb-6 max-w-xl">
            Your <span className="text-primary-500">appointment request</span>{' '}
            has been successfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm</p>
        </section>
        <section className="request-details">
          <p>Appointment details:</p>
          <div className="flex items-center gap-3">
            {doctor && (
              <>
                <Image
                  src={doctor.image}
                  className="size-6"
                  height={100}
                  width={100}
                  alt="doctor"
                />
                <p className="whitespace-nowrap">Dr. {doctor.name}</p>
              </>
            )}
            <div className="flex">
              <Image
                className="ml-2"
                src={`${ICONS_URL}/calendar.svg`}
                height={24}
                width={24}
                alt="calendar"
              />
              {appointment && (
                <p>{formatDateTime(appointment.schedule).dateTime}</p>
              )}
            </div>
          </div>
        </section>
        <Button className="shad-primary-btn" variant="outline" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New appointment
          </Link>
        </Button>
        <p className="copyright py-12">{getCopyRightText()}</p>
      </div>
    </div>
  );
};

export default Success;
