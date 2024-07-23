'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomFormField, { CustomFormFieldProps } from '../CustomFormField';

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const defaultFormValues = {
  username: '',
};

const formFields: Omit<CustomFormFieldProps, 'control'>[] = [
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Add your username',
    description: 'This is the description for username',
  },
];

const PatientForm = () => {
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
