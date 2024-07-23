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
  placeholder: string;
  description?: string;
  icon?: { src: string; alt: string };
  disabled?: boolean;
  dateFormat?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode; // Use this to show a loading state for example
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
    renderSkeleton,
  } = props;
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
};

const CustomFormField = ({
  fieldType = FormFieldTypes.INPUT,
  ...props
}: CustomFormFieldProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
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
