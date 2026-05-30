import {
  List,
  DataTable,
  DateField,
  EmailField,
  ReferenceField,
  TextField,
  NumberField,
  SelectField,
  SearchInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from "react-admin";

const filters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
  <SelectInput
    source="status"
    label="Statut"
    choices={[
      { id: "active", name: "Actif" },
      { id: "finished", name: "Terminé" },
    ]}
  />,
];

export const InternList = () => (
  <List filters={filters} perPage={5}>
    <DataTable rowClick="show">
      <DataTable.Col source="firstname" label="Prénom" />
      <DataTable.Col source="lastname" label="Nom" />
      <DataTable.Col source="email" label="Email">
        <EmailField source="email" />
      </DataTable.Col>
      <DataTable.Col source="department" label="Département" />
      <DataTable.Col source="managerId" label="Manager">
        <ReferenceField source="managerId" reference="employees">
          <TextField source="firstname" /> <TextField source="lastname" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="startDate" label="Début">
        <DateField source="startDate" />
      </DataTable.Col>
      <DataTable.Col source="endDate" label="Fin">
        <DateField source="endDate" />
      </DataTable.Col>
      <DataTable.Col source="contractType" label="Contrat" />
      <DataTable.NumberCol
        source="stipend"
        label="Gratification"
        options={{ style: "currency", currency: "EUR" }}
      />
      <DataTable.Col source="status" label="Statut">
        <SelectField
          source="status"
          choices={[
            { id: "active", name: "Actif" },
            { id: "finished", name: "Terminé" },
          ]}
        />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);