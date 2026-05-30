import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  SelectField,
  ReferenceField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";

const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InternShow = () => (
  <Show actions={<InternShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <ReferenceField source="managerId" reference="employees" label="Manager">
        <TextField source="firstname" /> <TextField source="lastname" />
      </ReferenceField>
      <DateField source="startDate" label="Date de début" />
      <DateField source="endDate" label="Date de fin" />
      <TextField source="contractType" label="Type de contrat" />
      <NumberField
        source="stipend"
        label="Gratification"
        options={{ style: "currency", currency: "EUR" }}
      />
      <SelectField
        source="status"
        label="Statut"
        choices={[
          { id: "active", name: "Actif" },
          { id: "finished", name: "Terminé" },
        ]}
      />
    </SimpleShowLayout>
  </Show>
);