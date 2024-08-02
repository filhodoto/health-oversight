'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import CustomFormField, {
  CustomFormFieldProps,
  FormFieldTypes,
} from './CustomFormField';
import { SelectItem } from '@/components/ui/select';
import SubmitBtn from './SubmitBtn';
import { UserFormSchema } from '@/lib/zodValidations';
import { DOCTORS, ICONS_URL } from '@/constants';
import Image from 'next/image';
import { groupFieldsInPairs } from './fields/PersonalFormFields';
import { capitalizeFirstLetter } from '@/lib/utils';

const defaultFormValues = {
  name: '',
  email: '',
  phone: '',
};

interface NewAppointmentFormProps {
  userId: string;
  patientId: string;
  type: 'create' | 'cancel' | 'schedule';
}

const appointmentFields = [
  {
    fieldType: FormFieldTypes.TEXTAREA,
    name: 'reason',
    label: 'Reason for appointment',
    placeholder: 'ex: Annual monthly check-up',
  },
  {
    fieldType: FormFieldTypes.TEXTAREA,
    name: 'notes',
    label: 'Additional comments/notes',
    placeholder: 'ex: Prefer afternoon appointments, if possible',
  },
  {
    name: 'schedule',
    fieldType: FormFieldTypes.DATE_PICKER,
    label: 'Expected appointment date',
    placeholder: 'Select your appointment date',
    dateFormat: 'dd/MM/yyyy - h:mm aa',
    showTimeSelect: true,
  },
];

/* This form is used to Authenticate the User, but not to register it */
const AppointmentForm = ({
  userId,
  patientId,
  type,
}: NewAppointmentFormProps) => {
  // const router = useRouter();

  // Define form.
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: defaultFormValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserFormSchema>) {
    // Do something
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>
        {/* Primary care doctor here because it needs to be full width */}
        <CustomFormField
          fieldType={FormFieldTypes.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Care Doctor"
          placeholder="Select a doctor"
        >
          {/* This will be shown as props.children inside our FormControl */}
          {DOCTORS.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  className="rounded-full border border-dark-500"
                  alt={doctor.name}
                  width={32}
                  height={32}
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        {/* Create div for each pair of elements in our medicalFormFields object */}
        {groupFieldsInPairs(appointmentFields).map((pair, index) => (
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

        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for Cancelation"
            placeholder="Enter reason for cancellation"
          />
        )}

        <SubmitBtn isLoading={isSubmitting}>
          {capitalizeFirstLetter(type)} Appointment
        </SubmitBtn>
      </form>
    </Form>
  );
};

export default AppointmentForm;
