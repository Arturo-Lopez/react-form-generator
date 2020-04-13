import React from "react";
import { Form, FormikProps, Formik } from "formik";
import { Button, Box } from "@material-ui/core";

import { FieldProps } from "./type";

import FormField from "./FormField";
import FormFieldSelect from "./FormFieldSelect";
import FormFieldBoolean from "./FormFieldBoolean";

const FormGenerator: React.FC<any> = (props) => {
  const { fields, submitClickCallback, validation } = props.formDefinition;

  /* Genera el estado inicial Formik 
      NOTA: Previene error de uncontrolled component
  */
  const generateState = () => {
    return fields.reduce(
      (
        acc,
        val: {
          name: string;
          type: string;
          default: string | number | boolean;
          values: Array<{ name: string; value: string | number }>;
        }
      ) => {
        let objectVal;
        switch (val.type) {
          case "number":
            objectVal = val.default ? val.default : undefined;
            break;
          case "select":
            objectVal =
              typeof val.values[0].value === "number"
                ? val.default
                  ? val.default
                  : undefined
                : val.default
                ? val.default
                : "";
            break;
          case "boolean":
            objectVal = val.default ? val.default : false;
            break;
          default:
            objectVal = val.default ? val.default : "";
            break;
        }

        return (acc = { ...acc, [val.name]: objectVal });
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
              case "boolean":
                return (
                  <FormFieldBoolean
                    key={name}
                    name={name}
                    type="checkbox"
                    label={label}
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
