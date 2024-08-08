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
import { decryptKey, encryptKey } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// TODO:: Create token validation with server connection instead fo local storage encrypt
const PasskeyModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  // Get encrypted key from local storage
  // * Note:: We need to check for type fo window because of NextJS specifics
  const accessData =
    typeof window !== 'undefined'
      ? localStorage && window.localStorage.getItem('encryptedData')
      : null;

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

    // Check if entered passkey is equal to our passkey defined on .env (not sure if this is where passkey should be defined)
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      // 1. Create encrypt key so we can store it in local storage and tell browser user is authenticated
      const encryptedData = encryptKey(passkey);

      // 2. Store the encrypt key object in local storage
      // * NOTE:: Storing the encryption key and IV in local storage is highly insecure. For production we should use token authentication
      localStorage.setItem('encryptedData', JSON.stringify(encryptedData));

      // 3. Navigate to admin
      router.push('/admin');
    } else {
      // Show error
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    // Check if there's a encrypted key object in local storage. If so see if it's valid
    if (accessData) {
      // Decrypt passkey object and get passkey
      const passkey = decryptKey(JSON.parse(accessData));

      // Compare it to NEXT_PUBLIC_ADMIN_PASSKEY to know if we navigate user to admin
      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        // Navigate to admin page
        router.push('/admin');
      } else {
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessData]);

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
