import RegisterForm from '@/components/forms/RegisterForm';
import { ICONS_URL, IMAGES_URL } from '@/constants';
import { getUser } from '@/lib/actions/patients';
import { getCopyRightText } from '@/lib/utils';
import Image from 'next/image';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
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

          {/* Used to Register user, NOT authenticate */}
          {user && <RegisterForm user={user} />}
          <p className="copyright py-12">{getCopyRightText()}</p>
        </div>
      </section>
      <Image
        src={`${IMAGES_URL}/register-img.jpg`}
        className="side-img max-w-[390px]"
        height={1000}
        width={1000}
        alt="register-bg"
      />
    </div>
  );
};

export default Register;
