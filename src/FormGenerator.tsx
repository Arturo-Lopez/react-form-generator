import React from "react";
import { Form, FormikProps, Formik } from "formik";
import { Button, Box } from "@material-ui/core";

import FormField, { FormFieldProps } from "./FormField";

const FormGenerator: React.FC<any> = (props) => {
  const { fields, submitClickCallback, validation } = props.formDefinition;
  return fields ? (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        submitClickCallback(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validationSchema={validation && validation}
    >
      {(props: FormikProps<any>) => (
        <Form>
          {fields.map(
            ({ name, type = "text", label, values }: FormFieldProps) => (
              <FormField
                key={name}
                name={name}
                type={type}
                label={label}
                values={values}
              />
            )
          )}
          <Box>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  ) : null;
};

export default FormGenerator;
