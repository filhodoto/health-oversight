'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';

import SubmitBtn from './SubmitBtn';
import { PatientFormSchema } from '@/lib/zodValidations';
import { registerPatient } from '@/lib/actions/patients';
import PersonalFormFields from './fields/PersonalFormFields';
import MedicalFormFields from './fields/MedicalFormFields';
import IdentificationFormFields from './fields/IdentificationFormFields';
import CustomFormField, { FormFieldTypes } from './CustomFormField';
import { PATIENT_FORM_DEFAULT_VALUES } from '@/constants';

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();

  // Define form.
  const form = useForm({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: PATIENT_FORM_DEFAULT_VALUES,
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof PatientFormSchema>) => {
    const { identificationDocument } = values;

    // Create a new FormData object to hold the file data
    let documentFormData;

    // Check if user passed a document file and create a new formData with document info
    if (identificationDocument && identificationDocument[0]) {
      // Extract the file info from the identificationDocument array
      const doc = identificationDocument[0];

      // Create blob file so browser can understand the file information.
      // Blobs are browser objects representing raw file or data
      const blobFile = new Blob([doc], {
        type: doc.type, // ex: "image/png"
      });

      documentFormData = new FormData();
      // Append the Blob object as 'blobFile' to the FormData
      documentFormData.append('blobFile', blobFile);
      // Append the original file name as 'fileName' to the FormData
      documentFormData.append('fileName', doc.name);
    }

    try {
      // Create object with patient data to send to appwrite DB
      const patientData = {
        ...values,
        userId: user.$id, // user id from appwrite uses "$id"
        // Convert string value into date.
        // By converting it to a Date object, we ensure that the data is in a suitable format for database storage
        birthDate: new Date(values.birthDate),
        identificationDocument: values.identificationDocument
          ? documentFormData
          : undefined,
      };

      // Store patient in DB
      const newPatient = await registerPatient(patientData);

      // Navigate user to book appointments page
      if (newPatient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">
            Welcome <span className="text-primary-default">{user.name}</span>
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
          <MedicalFormFields formControl={form.control} />
        </section>
        <section className="space-y-6">
          <h2 className="sub-header">Identification and Verification</h2>
          <IdentificationFormFields formControl={form.control} />
        </section>
        <section className="space-y-6">
          <h2 className="sub-header">Consent and Privacy</h2>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="treatmentConsent"
            label="I consent to treatment"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="disclosureConsent"
            label="I consent to disclosure of information"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="privacyConsent"
            label="I consent to privacy policy"
          />
        </section>
        <SubmitBtn isLoading={isSubmitting}>Get Started</SubmitBtn>
      </form>
    </Form>
  );
};

export default RegisterForm;
