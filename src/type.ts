import { FormFieldProps } from "./FormField";
import { FormFieldSelectProps } from "./FormFieldSelect";
import { FormFieldBooleanProps } from "./FormFieldBoolean";

export type FieldProps = FormFieldProps &
  FormFieldSelectProps &
  FormFieldBooleanProps;

export interface FormDefinition {
  fields: Array<FieldFormDefinition>;
  submitClickCallback: (values: any) => void;
  validation: any;
}

type FieldFormDefinition =
  | FieldSelectFormDefinition
  | FieldTextFormDefinition
  | FieldBooleanFormDefinition;

interface FieldTextFormDefinition {
  name: string;
  label: string;
  type?: "email" | "number";
  default?: string | number | boolean;
}

interface FieldSelectFormDefinition {
  name: string;
  label: string;
  type: "select";
  default?: string | number;
  values: Array<{ label: string; value: string | number }>;
}

interface FieldBooleanFormDefinition {
  name: string;
  label: string;
  type: "boolean";
  default?: boolean;
}
