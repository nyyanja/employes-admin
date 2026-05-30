import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  DateInput,
  ReferenceInput,
  required,
  email,
  minValue,
  maxValue,
} from "react-admin";

const validateStipend = (value: number, allValues: any) => {
  if (!allValues.startDate || !allValues.endDate) return undefined;

  const start = new Date(allValues.startDate);
  const end = new Date(allValues.endDate);
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months > 2 && value < 627) {
    return "Stage > 2 mois : gratification minimale de 627 €";
  }
  if (months <= 2 && value > 0) {
    return "Stage ≤ 2 mois : gratification non obligatoire (0 €)";
  }
  return undefined;
};

export const InternCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" validate={[required(), email()]} />
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
      <ReferenceInput source="managerId" reference="employees" label="Manager">
        <SelectInput
          optionText={(record) => `${record.firstname} ${record.lastname}`}
          validate={required()}
        />
      </ReferenceInput>
      <DateInput source="startDate" label="Date de début" validate={required()} />
      <DateInput source="endDate" label="Date de fin" validate={required()} />
      <SelectInput
        source="contractType"
        label="Type de contrat"
        validate={required()}
        choices={[
          { id: "Convention de stage", name: "Convention de stage" },
        ]}
        defaultValue="Convention de stage"
      />
      <NumberInput
        source="stipend"
        label="Gratification (€/mois)"
        validate={[required(), minValue(0), maxValue(3000), validateStipend]}
      />
      <SelectInput
        source="status"
        label="Statut"
        validate={required()}
        defaultValue="active"
        choices={[
          { id: "active", name: "Actif" },
          { id: "finished", name: "Terminé" },
        ]}
      />
    </SimpleForm>
  </Create>
);