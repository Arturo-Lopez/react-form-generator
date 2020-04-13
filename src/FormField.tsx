import React from "react";
import { useField, FieldInputProps } from "formik";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

export interface FormFieldProps extends FieldInputProps<""> {
  name: string;
  type: string;
  label: string;
  values?: any[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  values,
  ...props
}: FormFieldProps) => {
  const [field, meta] = useField(props);

  const defaultField = () => (
    <Grid container>
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
    </Grid>
  );

  const selectField = () => (
    <Grid container>
      <FormControl
        variant="outlined"
        style={{ minWidth: "100%", marginBottom: 16 }}
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
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </FormControl>
    </Grid>
  );

  switch (type) {
    case "select":
      return selectField();
    default:
      return defaultField();
  }
};

export default FormField;
