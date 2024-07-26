import { DOCTORS, GENDER_OPTIONS, ICONS_URL } from '@/constants';
import CustomFormField, {
  CustomFormFieldProps,
  FormFieldTypes,
} from '../CustomFormField';
import { Control } from 'react-hook-form';
import { groupFieldsInPairs } from './PersonalFormFields';
import { SelectItem } from '@/components/ui/select';
import Image from 'next/image';

// Array in which each object represents an input for the form
const medicalFormFields: Omit<CustomFormFieldProps, 'control'>[] = [
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
];

const MedicalFormFields = ({ formControl }: { formControl: Control<any> }) => {
  return (
    <>
      {/* primary care doctor here because it needs to be full width */}
      <CustomFormField
        fieldType={FormFieldTypes.SELECT}
        control={formControl}
        name="primaryPhysician"
        label="Primary Care Doctor"
        placeholder="Choose your doctor"
      >
        {/* This will be shown as props.childrned inside our FormControl */}
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
      {groupFieldsInPairs(medicalFormFields).map((pair, index) => (
        <div key={index} className="flex flex-col gap-6 xl:flex-row">
          {pair.map((field) => (
            <CustomFormField
              key={field.name}
              control={formControl}
              {...field}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default MedicalFormFields;
