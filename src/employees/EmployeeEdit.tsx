import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
  email,
  minValue,
  useRecordContext,
} from "react-admin";

const EmployeeTitle = () => {
  const record = useRecordContext();
  if (!record) return <span>Modifier un employé</span>;
  return (
    <span>
      Modifier : {record.firstname} {record.lastname}
    </span>
  );
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />}>
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
      />
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
      <BooleanInput source="active" label="Actif" />
    </SimpleForm>
  </Edit>
);
