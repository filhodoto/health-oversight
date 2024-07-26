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

// Helper function to group the fields into pairs, so we can use it to prevent duplication
const groupFieldsInPairs = (
  fields: Omit<CustomFormFieldProps, 'control'>[],
) => {
  const pairs = [];
  for (let i = 1; i < fields.length - 1; i += 2) {
    pairs.push(fields.slice(i, i + 2));
  }
  return pairs;
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
  {
    name: 'address',
    label: 'Address',
    placeholder: 'ex: Rua do sitio da varzea',
  },
  {
    name: 'occupation',
    label: 'Occupation',
    placeholder: 'Wood worker',
  },
  {
    name: 'emergencyContactName',
    label: 'Emergency Contact Name',
  },
  {
    name: 'emergencyContactNumber',
    fieldType: FormFieldTypes.PHONE_INPUT,
    label: 'Emergency contact number',
    placeholder: '(351) 000 000 000',
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
          {/* NAME INPUT BECAUSE IT NEEDS TO BE FULL WIDTH */}
          <CustomFormField control={form.control} {...personalFormFields[0]} />

          {/* Create div for each pair of elements in our personalFormFields object */}
          {groupFieldsInPairs(personalFormFields).map((pair, index) => (
            <div key={index} className="flex flex-col gap-6 xl:flex-row">
              {pair.map((field) => (
                <CustomFormField
                  key={field.name}
                  control={form.control}
                  {...field}
                />
              ))}
            </div>
          ))}
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
