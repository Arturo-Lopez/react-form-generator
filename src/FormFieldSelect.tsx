import React from "react";
import { useField, FieldInputProps } from "formik";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

export interface FormFieldSelectProps extends FieldInputProps<""> {
  name: string;
  type: string;
  label: string;
  values?: Array<{ value: string; label: string }>;
}

const FormFieldSelect: React.FC<FormFieldSelectProps> = ({
  label,
  type,
  values,
  ...props
}: FormFieldSelectProps) => {
  const [field, meta] = useField(props);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      style={{ marginBottom: 16 }}
      error={meta.touched && !!meta.error}
    >
      <InputLabel id={`select-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-${label}`}
        id={`select-${label}`}
        {...field}
        {...props}
      >
        {values &&
          values.map(({ value, label }) => (
            <MenuItem key={value + "label-item"} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>
        {meta.touched && meta.error ? meta.error : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default FormFieldSelect;
