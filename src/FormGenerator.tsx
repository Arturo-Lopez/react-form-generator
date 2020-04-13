import React from "react";
import { Form, FormikProps, Formik } from "formik";
import { Button, Box } from "@material-ui/core";

import { FieldProps } from "./type";

import FormField from "./FormField";
import FormFieldSelect from "./FormFieldSelect";

const FormGenerator: React.FC<any> = (props) => {
  const { fields, submitClickCallback, validation } = props.formDefinition;

  const generateState = () => {
    return fields.reduce(
      (
        acc,
        val: {
          name: string;
          type: string;
          values: Array<{ name: string; value: string | number }>;
        }
      ) => {
        let newValue = {
          [val.name]:
            val.type === "number"
              ? undefined
              : val.type === "select"
              ? typeof val.values[0].value === "number"
                ? undefined
                : ""
              : "",
        };
        return (acc = { ...acc, ...newValue });
      },
      {}
    );
  };

  return fields ? (
    <Formik
      initialValues={generateState()}
      onSubmit={(values, actions) => {
        submitClickCallback(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validationSchema={validation && validation}
    >
      {(props: FormikProps<any>) => (
        <Form>
          {fields.map(({ name, type = "text", label, values }: FieldProps) => {
            switch (type) {
              case "select":
                return (
                  <FormFieldSelect
                    key={name}
                    name={name}
                    type={type}
                    label={label}
                    values={values}
                  />
                );
              default:
                return (
                  <FormField key={name} name={name} type={type} label={label} />
                );
            }
          })}
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
