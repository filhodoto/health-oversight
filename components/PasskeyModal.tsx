'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { ICONS_URL } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PasskeyModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  // TODO:: Not sure about this way of doing things
  const closeModal = () => {
    // Close modal
    setIsOpen(false);

    // Navigate user to homepage (without ?admin=true)
    router.push('/');
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    //TODO:: Add correct validation
    // Close modal
    setError('Something went wrong');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              className="cursor-pointer"
              src={`${ICONS_URL}/close.svg`}
              width={20}
              height={20}
              alt="close"
              onClick={closeModal}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.....
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={setPasskey}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* Show error on OTP verification */}
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            className="shad-primary-btn w-full"
            onClick={validatePasskey}
          >
            Enter admin passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
