import RegisterForm from '@/components/forms/RegisterForm';
import { APP_NAME, ICONS_URL, IMAGES_URL } from '@/constants';
import { getUser } from '@/lib/actions/patients';
import Image from 'next/image';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src={`${ICONS_URL}/logo-full.svg`}
            className="mb-12 h-10 w-fit"
            height={1000}
            width={1000}
            alt="logo"
          />
          {/* Used to Register user, NOT authenticate */}
          {user && <RegisterForm user={user} />}
          <p className="copyright py-12">© 2024 {APP_NAME}</p>
        </div>
      </section>
      <Image
        src={`${IMAGES_URL}/register-img.png`}
        className="side-img max-w-[390px]"
        height={1000}
        width={1000}
        alt="register-bg"
      />
    </div>
  );
};

export default Register;
