import { IDENTIFICATION_TYPES } from '@/constants';
import CustomFormField, { FormFieldTypes } from '../CustomFormField';
import { Control } from 'react-hook-form';
import { SelectItem } from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';
import FileUploader from '../FileUploader';

const IdentificationFormFields = ({
  formControl,
}: {
  formControl: Control<any>;
}) => {
  return (
    <>
      {/* Identification type select */}
      <CustomFormField
        fieldType={FormFieldTypes.SELECT}
        control={formControl}
        name="identificationType"
        label="Identification type"
        placeholder="Select identification type"
      >
        {IDENTIFICATION_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </CustomFormField>

      {/* Identification Number */}
      <CustomFormField
        control={formControl}
        name="identificationNumber"
        label="Identification number"
        placeholder="ex:1234567"
      />

      {/* Identification Document */}
      <CustomFormField
        fieldType={FormFieldTypes.SKELETON}
        control={formControl}
        name="identificationDocument"
        label="Scanned copy of identification document"
        renderSkeleton={(field) => (
          <FormControl>
            {/* Instead of storing things in state, we use react hook form to keep track of the value */}
            <FileUploader files={field.value} onChange={field.onChange} />
          </FormControl>
        )}
      />
    </>
  );
};

export default IdentificationFormFields;
