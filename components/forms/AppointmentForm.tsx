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
import { capitalizeFirstLetter } from '@/lib/utils';
import {
  createAppointment as createAppointmentAction,
  updateAppointment as updateAppointmentAction,
} from '@/lib/actions/appointments';
import { Appointment } from '@/types/appwrite.types';
import { Dispatch, SetStateAction } from 'react';

interface AppointmentFormProps {
  userId: string;
  patientId: string;
  type: 'create' | 'cancel' | 'schedule';
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const getDefaultFormValues = (appointment?: Appointment) => ({
  primaryPhysician: appointment?.primaryPhysician ?? '',
  schedule: appointment?.schedule
    ? new Date(appointment?.schedule)
    : new Date(),
  reason: appointment?.reason ?? '',
  note: appointment?.note ?? '',
  cancellationReason: appointment?.cancellationReason ?? '',
});

/* This form is used to Authenticate the User, but not to register it */
const AppointmentForm = ({
  userId,
  patientId,
  type = 'create',
  appointment,
  setOpen,
}: AppointmentFormProps) => {
  const router = useRouter();

  // Get form AppointmentFormValidation depending on which type of form it is ('create' | 'cancel' | 'schedule')
  const AppointmentFormValidation = getAppointmentSchema(type);

  // Define form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: getDefaultFormValues(appointment),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const isCancelForm = type === 'cancel';

  // Create appointment logic
  const createAppointment = async ({
    values,
    status,
  }: {
    values: z.infer<typeof AppointmentFormValidation>;
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

  const updateAppointment = async ({
    values,
    status,
  }: {
    values: z.infer<typeof AppointmentFormValidation>;
    status: Status;
  }) => {
    // TODO:: This formvalidation is not working
    const { primaryPhysician, schedule, cancellationReason } = values;

    // Make Typescript knows we have an appointment
    if (!appointment || !appointment.$id)
      throw new Error('No appointment found');

    const updated = await updateAppointmentAction({
      userId,
      appointmentId: appointment?.$id,
      appointment: {
        primaryPhysician,
        schedule: new Date(schedule),
        status,
        cancellationReason,
      },
      type,
    });

    if (updated) {
      // Close Modal that shows this Form
      setOpen && setOpen(false);

      // Reset form
      form.reset();
    }
  };

  // Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>,
  ) => {
    // Defined statues of appointment based on type of form
    const status: Status =
      type === 'schedule'
        ? 'scheduled'
        : type === 'cancel'
          ? 'cancelled'
          : 'pending';

    try {
      // Make sure typescript knows we have patient id before running this logic
      if (!patientId) throw new Error('patient id not provided');

      // If form is being called to create an appointment
      if (type === 'create') {
        await createAppointment({ values, status });
      } else {
        // If not, it means it is an appointment o update
        await updateAppointment({ values, status });
      }
    } catch (error) {
      console.error(error || error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
        {/* Only show this text if Form is type create  */}
        {type === 'create' && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Welcome</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}

        {/* Primary care doctor here because it needs to be full width */}
        <CustomFormField
          fieldType={FormFieldTypes.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Care Doctor"
          placeholder="Select a doctor"
          disabled={isCancelForm}
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

        {/* If form is type cancel show field for cancelation reason. If not, show scheduling inputs */}
        {isCancelForm ? (
          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for Cancelation"
            placeholder="Enter reason for cancellation"
          />
        ) : (
          <>
            <div className="flex flex-col gap-6 xl:flex-row">
              {/* Reason */}
              {/* TODO::Don't show input to admin if user didn't feel value. USE getValues */}
              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="ex: Annual monthly check-up"
                disabled={type === 'schedule'}
              />
              {/* Additional Notes */}
              {/*TODO:: Don't show input to admin if user didn't feel value. USE getValues  */}

              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="note"
                label="Additional comments/notes"
                placeholder="ex: Prefer afternoon appointments, if possible"
                disabled={type === 'schedule'}
              />
            </div>
            {/* Appointment date */}
            <CustomFormField
              fieldType={FormFieldTypes.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Select your appointment date"
              placeholder="ex: Prefer afternoon appointments, if possible"
              dateFormat="dd/MM/yyyy - h:mm aa"
              showTimeSelect={true}
            />
          </>
        )}

        <SubmitBtn
          isLoading={isSubmitting}
          {...(isCancelForm && {
            className: 'shad-danger-btn',
          })}
        >
          {capitalizeFirstLetter(type)} Appointment
        </SubmitBtn>
      </form>
    </Form>
  );
};

export default AppointmentForm;
