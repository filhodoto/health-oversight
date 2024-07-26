'use client';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Control } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { ICONS_URL } from '@/constants';

// By using an enum, we improve code readability, maintainability, and type safety by providing a clear and restricted set of options.
export enum FormFieldTypes {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

// Common props for all field types
export interface CustomFormFieldProps {
  control: Control<any>;
  label?: string;
  fieldType?: FormFieldTypes;
  name: string;
  placeholder?: string;
  description?: string;
  icon?: { src: string; alt: string };
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode; // Use this to show a loading state for example
  className?: string;
}

const renderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const {
    placeholder,
    fieldType,
    description,
    icon,
    disabled,
    dateFormat,
    children,
    showTimeSelect = false,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldTypes.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            className="ml-2"
            src={`${ICONS_URL}/calendar.svg`}
            height={24}
            width={24}
            alt="calendar"
          />
          <FormControl>
            <DatePicker
              wrapperClassName="date-picker"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showTimeSelect}
              timeInputLabel="Time:"
              {...(dateFormat && { dateFormat })}
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.PHONE_INPUT:
      return (
        <PhoneInput
          className="input-phone"
          defaultCountry="PT"
          placeholder={placeholder}
          value={field.value}
          onChange={field.onChange}
          withCountryCallingCode
          international
        />
      );

    default:
      return (
        <>
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {icon && (
              <Image
                className="ml-2"
                src={icon.src}
                height={24}
                width={24}
                alt={icon.alt}
              />
            )}
            <FormControl>
              <Input
                className="shad-input border-0"
                type={fieldType}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            </FormControl>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
        </>
      );
  }
};

const CustomFormField = ({
  fieldType = FormFieldTypes.INPUT,
  ...props
}: CustomFormFieldProps) => {
  const { control, name, label, className } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex-1 ${className ?? ''}`}>
          {/* Make sure we only show label for all inputs that are not type Checkbox */}
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          {renderField({ field, props: { fieldType, ...props } })}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
