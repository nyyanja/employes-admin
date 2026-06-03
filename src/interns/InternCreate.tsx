import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  DateInput,
  BooleanInput,
  ReferenceInput,
  required,
  email,
  minValue,
} from "react-admin";
import { useWatch } from "react-hook-form";

const StipendInput = () => {
  const isRemunerate = useWatch({ name: "isRemunerate" });

  const validateStipend = (value: number, allValues: any) => {
    if (!isRemunerate) return undefined;
    if (!value || value < 627) {
      return "Gratification minimale de 627 € requise";
    }
    if (!allValues.startDate || !allValues.endDate) return undefined;
    const start = new Date(allValues.startDate);
    const end = new Date(allValues.endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    if (months > 2 && value < 627) {
      return "Stage > 2 mois : gratification minimale de 627 €";
    }
    return undefined;
  };

  return (
    <NumberInput
      source="stipend"
      label="Gratification (€/mois)"
      validate={
        isRemunerate ? [required(), minValue(627), validateStipend] : []
      }
      disabled={!isRemunerate}
      defaultValue={isRemunerate ? 627 : 0}
    />
  );
};

const ManagerInput = () => {
  const department = useWatch({ name: "department" });

  return (
    <ReferenceInput
      source="managerId"
      reference="employees"
      filter={{ department, active: true }}
    >
      <SelectInput
        label="Manager"
        optionText={(record) => `${record.firstname} ${record.lastname}`}
        validate={required()}
      />
    </ReferenceInput>
  );
};

export const InternCreate = () => (
  <Create redirect="list">
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
      <ManagerInput />
      <DateInput
        source="startDate"
        label="Date de début"
        validate={required()}
      />
      <DateInput source="endDate" label="Date de fin" validate={required()} />
      <SelectInput
        source="contractType"
        label="Type de contrat"
        validate={required()}
        defaultValue="Convention de stage"
        choices={[{ id: "Convention de stage", name: "Convention de stage" }]}
      />
      <BooleanInput
        source="isRemunerate"
        label="Rémunéré"
        defaultValue={false}
      />
      <StipendInput />
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
