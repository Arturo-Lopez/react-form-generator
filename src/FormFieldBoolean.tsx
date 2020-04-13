import React from "react";
import { useField, FieldInputProps } from "formik";

import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export interface FormFieldBooleanProps extends FieldInputProps<""> {
  name: string;
  type: string;
  label: string;
}

const FormFieldBoolean: React.FC<FormFieldBooleanProps> = ({
  label,
  type,
  ...props
}: FormFieldBooleanProps) => {
  const [field] = useField(props);

  return (
    <FormControl {...props}>
      <FormControlLabel
        control={<Switch color="primary" {...field} checked={field.value} />}
        label={<span>{label}</span>}
      />
    </FormControl>
  );
};

export default FormFieldBoolean;
