'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import CustomFormField, {
  CustomFormFieldProps,
  FormFieldTypes,
} from './CustomFormField';
import SubmitBtn from './SubmitBtn';
import { userFormSchema } from '@/lib/zodValidations';
import { createUser } from '@/lib/actions/patients';

const defaultFormValues = {
  name: '',
  email: '',
  phone: '',
};

// Array in which each object represents an input for the form
const formFields: Omit<CustomFormFieldProps, 'control'>[] = [
  {
    name: 'name',
    label: 'Full Name',
    placeholder: 'John Doe',
    description: 'This is the description for name',
    icon: { src: 'assets/icons/user.svg', alt: 'user' },
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'example@gmail.com',
    icon: { src: 'assets/icons/email.svg', alt: 'email' },
  },
  {
    name: 'phone',
    fieldType: FormFieldTypes.PHONE_INPUT,
    label: 'Phone number',
    placeholder: '(351) 000 000 000',
  },
];

const PatientForm = () => {
  // Define form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultFormValues,
  });

  const {
    formState: { isLoading },
  } = form;

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      // Get user values
      // Store user in DB
      // Pass user values via router
    } catch (error) {}
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Start booking your appointments</p>
        </section>
        {/* Create a form field for each */}
        {formFields.map((field, index) => (
          <CustomFormField
            key={`${index}-${field.name}`}
            control={form.control}
            {...field}
          />
        ))}
        <SubmitBtn isLoading={isLoading}>Get Started</SubmitBtn>
      </form>
    </Form>
  );
};

export default PatientForm;
