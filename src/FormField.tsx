import React from "react";
import { useField, FieldInputProps } from "formik";

import TextField from "@material-ui/core/TextField";

export interface FormFieldProps extends FieldInputProps<""> {
  name: string;
  type: string;
  label: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  values,
  ...props
}: FormFieldProps) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      label={label}
      type={type}
      {...field}
      {...props}
      variant="outlined"
      helperText={meta.touched && meta.error ? meta.error : ""}
      error={meta.touched && !!meta.error}
      style={{ marginBottom: 16 }}
    />
  );
};

export default FormField;
