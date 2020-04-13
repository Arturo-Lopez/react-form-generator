import React from "react";

import Form from "./FormGenerator";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as Yup from "yup";
import { FormDefinition } from "./type";

const formDefinition: FormDefinition = {
  fields: [
    {
      name: "firstName",
      label: "First name",
      default: "Arturo",
    },
    {
      name: "age",
      type: "number",
      label: "Edad",
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
    {
      name: "disable",
      label: "Habilitado",
      type: "boolean",
      default: true,
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
