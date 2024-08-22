import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { ICONS_URL } from '@/constants';

interface SubmitBtnProps {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
}

const SubmitBtn = ({ isLoading, className, children }: SubmitBtnProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={`shad-primary-btn w-full ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            className="animate-spin"
            src={`${ICONS_URL}/loader.svg`}
            alt="loader"
            width={24}
            height={24}
          />
          Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitBtn;
