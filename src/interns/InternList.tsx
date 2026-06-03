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
  BooleanField,
  EditButton,
  DeleteButton,
  useCreate,
  useRefresh,
  ReferenceInput,
  required,
} from "react-admin";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  Alert,
  MenuItem,
} from "@mui/material";

const QuickAddIntern = () => {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [managerId, setManagerId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [create, { isPending }] = useCreate();
  const refresh = useRefresh();

  const handleSubmit = () => {
    if (!firstname || !lastname || !managerId) {
      setErrorMsg("Tous les champs sont obligatoires");
      return;
    }
    create(
      "interns",
      {
        data: {
          firstname,
          lastname,
          managerId: parseInt(managerId),
          email: "",
          department: "",
          startDate: new Date().toISOString().split("T")[0],
          endDate: "",
          contractType: "Convention de stage",
          stipend: 0,
          isRemunerate: false,
          status: "active",
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
          setFirstname("");
          setLastname("");
          setManagerId("");
          setErrorMsg("");
          refresh();
        },
        onError: () => {
          setErrorMsg("Erreur lors de la création du stagiaire");
        },
      },
    );
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 1 }}
      >
        + Ajouter stagiaire rapide
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ajout rapide d'un stagiaire</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          <MuiTextField
            label="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
          />
          <MuiTextField
            label="Nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
          />
          <MuiTextField
            label="Manager"
            select
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            fullWidth
          >
            <MenuItem value="1">Alice Martin</MenuItem>
            <MenuItem value="2">Bob Dupont</MenuItem>
            <MenuItem value="4">David Moreau</MenuItem>
            <MenuItem value="5">Emma Bernard</MenuItem>
          </MuiTextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isPending}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Création..." : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

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
    source="isRemunerate"
    label="Rémunéré"
    choices={[
      { id: true, name: "Rémunéré" },
      { id: false, name: "Non rémunéré" },
    ]}
  />,
];

export const InternList = () => (
  <List filters={filters} perPage={5} actions={<QuickAddIntern />}>
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
      <DataTable.Col source="isRemunerate" label="Rémunéré">
        <BooleanField source="isRemunerate" />
      </DataTable.Col>
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
