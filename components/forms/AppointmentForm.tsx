'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import CustomFormField, { FormFieldTypes } from './CustomFormField';
import { SelectItem } from '@/components/ui/select';
import SubmitBtn from './SubmitBtn';
import { getAppointmentSchema } from '@/lib/zodValidations';
import { DOCTORS } from '@/constants';
import Image from 'next/image';
import { groupFieldsInPairs } from './fields/PersonalFormFields';
import { capitalizeFirstLetter } from '@/lib/utils';
import { createAppointment as createAppointmentAction } from '@/lib/actions/appointments';

const defaultFormValues = {
  primaryPhysician: '',
  schedule: new Date(),
  reason: '',
  note: '',
  cancellationReason: '',
};

interface AppointmentFormProps {
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
    name: 'note',
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
const AppointmentForm = ({ userId, patientId, type }: AppointmentFormProps) => {
  const router = useRouter();

  // Get form schema depending on which type of form it is ('create' | 'cancel' | 'schedule')
  const schema = getAppointmentSchema(type);

  // Define form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Create appointment logic
  const createAppointment = async ({
    values,
    status,
  }: {
    values: z.infer<typeof schema>;
    status: Status;
  }) => {
    // Create the appointment in database
    const newAppointment = await createAppointmentAction({
      ...values,
      userId,
      patient: patientId,
      status,
      schedule: new Date(values.schedule),
      // We will always have reason here because of zod validation.
      // However we need to use nullish coalescing operator for typescript since it still thinks this might be undefined
      reason: values.reason ?? '',
    });

    // IF appointment is successfully created
    if (newAppointment) {
      // Reset form
      form.reset();

      // Navigate user to success page (this same page with type "success") and pass values we need in route
      router.push(
        `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`,
      );
    }
  };

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof schema>) {
    // Defined statues of appointment based on type of form
    const status: Status =
      type === 'schedule'
        ? 'scheduled'
        : type === 'cancel'
          ? 'cancelled'
          : 'pending';

    try {
      // Make sure typescript knows we have patient id before running this logic
      if (!patientId) throw new Error('patientId not provided');

      if (type === 'create') {
        await createAppointment({ values, status });
      }
    } catch (error) {
      console.error(error || error.message);
    }
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
