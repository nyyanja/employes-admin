import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
  minValue,
} from "react-admin";

export const EmployeeCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" type="email" validate={required()} />
      <SelectInput
        source="department"
        label="Département"
        validate={required()}
        choices={[
          { id: "Informatique", name: "Informatique" },
          { id: "Marketing", name: "Marketing" },
          { id: "RH", name: "RH" },
          { id: "Finance", name: "Finance" },
        ]}
      />
      <NumberInput
        source="salary"
        label="Salaire"
        validate={[required(), minValue(1500)]}
        min={1500}
      />
      <BooleanInput source="active" label="Actif" defaultValue={true} />
    </SimpleForm>
  </Create>
);
