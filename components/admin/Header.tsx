import { ICONS_URL } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="admin-header">
      <div className="admin-header-wrapper">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={`${ICONS_URL}/logo-icon.svg`}
            className="logo-icon !h-10"
            height={24}
            width={24}
            alt="logo"
          />
          <p className="text-18-bold">Health Oversight</p>
        </Link>
        {/* User info */}
        {/* TODO:: Add user image? It doesn't seem like we have one */}
        <p className="text-14-medium">Admin Dashboard</p>
      </div>
    </header>
  );
};

export default Header;
