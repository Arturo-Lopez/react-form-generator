import React from "react";

import Form from "./FormGenerator";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as Yup from "yup";

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
}

const formDefinition = {
  fields: [
    {
      name: "firstName",
      label: "First name",
    },
    {
      name: "lastName",
      label: "Last name",
    },
    {
      name: "email",
      type: "email",
      label: "E-mail",
    },
    {
      name: "gender",
      type: "select",
      label: "Genero",
      values: [
        {
          label: "Masculino",
          value: "male",
        },

        {
          label: "Femenino",
          value: "female",
        },

        {
          label: "Indefinido",
          value: "no-gender",
        },
      ],
    },
  ],
  submitClickCallback: (values: any) => {
    console.log(values);
  },
  validation: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    gender: Yup.string().required("Required"),
  }),
};

const UserForm = () => (
  <>
    <CssBaseline />
    <Form formDefinition={formDefinition} />
  </>
);

export default UserForm;
