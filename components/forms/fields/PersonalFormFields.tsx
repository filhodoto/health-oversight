import { GENDER_OPTIONS, ICONS_URL } from '@/constants';
import CustomFormField, {
  CustomFormFieldProps,
  FormFieldTypes,
} from '../CustomFormField';
import { FormControl } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { Control } from 'react-hook-form';
import { groupFieldsInPairs } from '@/lib/utils';

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

const PersonalFormFields = ({ formControl }: { formControl: Control<any> }) => {
  return (
    <>
      {/* Set "name" here because it needs to be full width */}
      <CustomFormField
        control={formControl}
        name="name"
        label="Full Name"
        placeholder="John Doe"
        description="This is the description for name"
        icon={{ src: `${ICONS_URL}/user.svg`, alt: 'user' }}
      />

      {/* Create div for each pair of elements in our personalFormFields object */}
      {groupFieldsInPairs(personalFormFields).map((pair, index) => (
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

export default PersonalFormFields;
