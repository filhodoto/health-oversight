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
  return options.map((option, index) => {
    return (
      <div key={option + index} className="radio-group">
        <RadioGroupItem value={option} id={option} />
        <Label htmlFor={option} className="cursor-pointer">
          {option}
        </Label>
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
    dateFormat: 'dd/MM/yyyy',
  },
  {
    name: 'gender',
    fieldType: FormFieldTypes.SKELETON,
    label: 'Gender',
    renderSkeleton: (field) => {
      return (
        <FormControl>
          <RadioGroup
            className="m-h-11 flex flex-wrap gap-6 xl:justify-between"
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
          <div className="grid gap-6 md:grid-cols-2">
            {personalFormFields.map((field, index) => {
              return (
                <CustomFormField
                  key={`${index}-${field.name}`}
                  control={form.control}
                  {...field}
                  // Make sure first input will be full size as per design
                  {...(index === 0 && {
                    className: 'md:col-span-2',
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
