import { useRecordContext, useUpdate, useRefresh } from "react-admin";
import { Button } from "@mui/material";

export const QuickStatusToggle = () => {
  const record = useRecordContext();
  const refresh = useRefresh();

  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    update(
      "employees",
      {
        id: record.id,
        data: { active: !record.active },
        previousData: record,
      },
      {
        onSuccess: () => refresh(),
      },
    );
  };

  return (
    <Button
      variant="contained"
      size="small"
      color={record.active ? "error" : "success"}
      disabled={isPending}
      onClick={handleClick}
    >
      {record.active ? "Désactiver" : "Activer"}
    </Button>
  );
};
