import { useRecordContext } from "react-admin";
import { useGetOne } from "react-admin";
import { Card, CardContent, Typography, Chip, Link } from "@mui/material";

export const ManagerCard = () => {
  const intern = useRecordContext();

  const { data, isPending, error } = useGetOne(
    "employees",
    { id: intern?.managerId },
    { enabled: !!intern?.managerId },
  );

  if (isPending) return <Typography>Chargement du manager...</Typography>;
  if (error) return <Typography color="error">Manager introuvable</Typography>;
  if (!data) return null;

  return (
    <Card variant="outlined" sx={{ mt: 2, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          👤 Manager
        </Typography>
        <Typography>
          <strong>Nom :</strong> {data.firstname} {data.lastname}
        </Typography>
        <Typography>
          <strong>Département :</strong> {data.department}
        </Typography>
        <Typography>
          <strong>Email :</strong>{" "}
          <Link href={`mailto:${data.email}`}>{data.email}</Link>
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Statut :</strong>{" "}
          <Chip
            label={data.active ? "Actif" : "Inactif"}
            color={data.active ? "success" : "error"}
            size="small"
          />
        </Typography>
      </CardContent>
    </Card>
  );
};
