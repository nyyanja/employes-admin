import { useRecordContext } from "react-admin";
import { useGetList } from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";

export const DepartmentStats = () => {
  const employee = useRecordContext();

  const { data, isPending } = useGetList(
    "employees",
    {
      filter: { department: employee?.department, active: true },
      pagination: { page: 1, perPage: 1 },
    },
    { enabled: !!employee?.department },
  );

  if (isPending) return <Typography>Chargement des stats...</Typography>;

  return (
    <Card variant="outlined" sx={{ mt: 2, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📊 Département {employee?.department}
        </Typography>
        <Typography variant="h3" color="primary">
          {data?.length ?? 0}
        </Typography>
        <Typography color="text.secondary">
          collègue(s) actif(s) dans ce département
        </Typography>
      </CardContent>
    </Card>
  );
};
