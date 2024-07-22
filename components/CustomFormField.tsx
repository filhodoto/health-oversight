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
import { Control, Field } from 'react-hook-form/dist';

export enum FormFieldTypes {
  INPUT = 'input',
}

export interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  fieldType?: FormFieldTypes;
  placeholder: string;
  description: string;
}

const CustomFormField = ({
  control,
  name,
  label,
  fieldType = FormFieldTypes.INPUT,
  placeholder,
  description,
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: Field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={fieldType} placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
