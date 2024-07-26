'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl } from '@/components/ui/form';
import { z } from 'zod';

import SubmitBtn from './SubmitBtn';
import { userFormSchema } from '@/lib/zodValidations';
import { createUser } from '@/lib/actions/patients';
import PersonalFormFields from './fields/PersonalFormFields';

const defaultFormValues = {
  name: '',
  email: '',
  phone: '',
};

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();

  // Define form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultFormValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      // Store user in DB
      const newUser = await createUser(values);
      // Pass user values via router and navigate user
      if (newUser) router.push(`/patients/${newUser.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">
            Welcome <span className="text-green-500">{user.name}</span>
          </h1>
          <p className="text-dark-700">
            Please fill the necessary information.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="sub-header">Personal Information</h2>
          <PersonalFormFields formControl={form.control} />
        </section>
        <section className="space-y-6">
          <h2 className="sub-header">Medical Information</h2>
        </section>
        <section className="space-y-6">
          <h2 className="sub-header">Identification and Verification</h2>
        </section>

        <SubmitBtn isLoading={isSubmitting}>Get Started</SubmitBtn>
      </form>
    </Form>
  );
};

export default RegisterForm;
