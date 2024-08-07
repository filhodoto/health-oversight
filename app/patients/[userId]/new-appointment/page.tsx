import AppointmentForm from '@/components/forms/AppointmentForm';
import { APP_NAME, ICONS_URL, IMAGES_URL } from '@/constants';
import { getPatient } from '@/lib/actions/patients';
import { getCopyRightText } from '@/lib/utils';
import Image from 'next/image';

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  // Get patient
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
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
          {/* TODO:: Create a better solution that can be used everywhere if */}
          {!patient ? (
            <p>Something went wrong fetching patient</p>
          ) : (
            <AppointmentForm
              userId={userId}
              patientId={patient.$id}
              {...patient}
              type="create"
            />
          )}
          <p className="copyright py-12">{getCopyRightText()}</p>
        </div>
      </section>
      <Image
        src={`${IMAGES_URL}/appointment-img.jpg`}
        className="side-img max-w-[390px] bg-bottom"
        height={1000}
        width={1000}
        alt="register-bg"
      />
    </div>
  );
};

export default NewAppointment;
