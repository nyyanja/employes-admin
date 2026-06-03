import { useRecordContext } from "react-admin";
import { useGetList } from "react-admin";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Link,
} from "@mui/material";

export const InternsByManager = () => {
  const employee = useRecordContext();

  const { data, isPending, error } = useGetList(
    "interns",
    {
      filter: { managerId: employee?.id },
      pagination: { page: 1, perPage: 100 },
      sort: { field: "lastname", order: "ASC" },
    },
    { enabled: !!employee?.id },
  );

  if (isPending) return <Typography>Chargement des stagiaires...</Typography>;
  if (error) return <Typography color="error">Erreur de chargement</Typography>;

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🎓 Stagiaires encadrés ({data?.length ?? 0})
        </Typography>
        {!data || data.length === 0 ? (
          <Typography color="text.secondary">
            Aucun stagiaire encadré
          </Typography>
        ) : (
          <List dense>
            {data.map((intern) => (
              <ListItem key={intern.id} divider>
                <ListItemText
                  primary={
                    <Link href={`#/interns/${intern.id}/show`}>
                      {intern.firstname} {intern.lastname}
                    </Link>
                  }
                  secondary={
                    <>
                      {intern.department} —{" "}
                      <Chip
                        label={
                          intern.isRemunerate
                            ? `${intern.stipend} €`
                            : "Non rémunéré"
                        }
                        color={intern.isRemunerate ? "success" : "default"}
                        size="small"
                      />{" "}
                      <Chip
                        label={intern.status === "active" ? "Actif" : "Terminé"}
                        color={
                          intern.status === "active" ? "primary" : "default"
                        }
                        size="small"
                      />
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};
