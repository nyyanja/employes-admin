import { useGetList } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const StatCard = ({
  title,
  value,
  icon,
  color,
  isPending,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  isPending: boolean;
}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {icon} {title}
      </Typography>
      {isPending ? (
        <CircularProgress />
      ) : (
        <Typography variant="h2" color={color} fontWeight="bold">
          {value}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: totalEmployees, isPending: p1 } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: activeEmployees, isPending: p2 } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    filter: { active: true },
  });

  const { total: totalInterns, isPending: p3 } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: remuneratedInterns, isPending: p4 } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    filter: { isRemunerate: true },
  });

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          📊 Tableau de bord RH
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total employés"
          value={totalEmployees ?? 0}
          icon={<PeopleIcon />}
          color="primary.main"
          isPending={p1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Employés actifs"
          value={activeEmployees ?? 0}
          icon={<CheckCircleIcon />}
          color="success.main"
          isPending={p2}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total stagiaires"
          value={totalInterns ?? 0}
          icon={<SchoolIcon />}
          color="secondary.main"
          isPending={p3}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Stagiaires rémunérés"
          value={remuneratedInterns ?? 0}
          icon={<AttachMoneyIcon />}
          color="warning.main"
          isPending={p4}
        />
      </Grid>
    </Grid>
  );
};
