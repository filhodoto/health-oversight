'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl } from '@/components/ui/form';
import { z } from 'zod';
import CustomFormField, {
  CustomFormFieldProps,
  FormFieldTypes,
} from './CustomFormField';
import SubmitBtn from './SubmitBtn';
import { userFormSchema } from '@/lib/zodValidations';
import { createUser } from '@/lib/actions/patients';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { GENDER_OPTIONS, ICONS_URL } from '@/constants';
import { Label } from '../ui/label';

const defaultFormValues = {
  name: '',
  email: '',
  phone: '',
};

// TODO:: Move this to a utils file
const renderRadioGroupOptions = (options: string[]) => {
  return options.map((option) => {
    return (
      <div key={option} className="radio-group">
        <RadioGroupItem value={option} id={option}>
          <Label htmlFor={option} className="cursor-pointer">
            {option}
          </Label>
        </RadioGroupItem>
      </div>
    );
  });
};

// Array in which each object represents an input for the form
const personalFormFields: Omit<CustomFormFieldProps, 'control'>[] = [
  {
    name: 'name',
    label: 'Full Name',
    placeholder: 'John Doe',
    description: 'This is the description for name',
    icon: { src: `${ICONS_URL}/user.svg`, alt: 'user' },
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'example@gmail.com',
    icon: { src: `${ICONS_URL}/email.svg`, alt: 'email' },
  },
  {
    name: 'phone',
    fieldType: FormFieldTypes.PHONE_INPUT,
    label: 'Phone number',
    placeholder: '(351) 000 000 000',
  },
  {
    name: 'birthDate',
    fieldType: FormFieldTypes.DATE_PICKER,
    label: 'Date of Birth',
    placeholder: 'Select your birth date',
  },
  {
    name: 'gender',
    fieldType: FormFieldTypes.SKELETON,
    label: 'Select gender',
    placeholder: 'Select your birth date',
    renderSkeleton: (field) => {
      return (
        <FormControl>
          <RadioGroup
            className="flex h-11 gap-6 xl:justify-between"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            {renderRadioGroupOptions(GENDER_OPTIONS)}
          </RadioGroup>
        </FormControl>
      );
    },
  },
];

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
        className="flex-1 space-y-12 border-2 border-green-300"
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
          <div className="flex flex-col flex-wrap gap-6 border-2 border-red-400 xl:flex-row">
            {personalFormFields.map((field, index) => {
              return (
                <CustomFormField
                  key={`${index}-${field.name}`}
                  control={form.control}
                  {...field}
                  // Make sure first input will be full size as per design
                  {...(index === 0 && {
                    className: 'border-2 border-red-600 flex-1 basis-full;',
                  })}
                />
              );
            })}
          </div>
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
