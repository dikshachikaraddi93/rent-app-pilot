import { Grid, Paper, Typography } from "@mui/material";

const stats = [
  {
    title: "Occupancy Rate",
    value: "92%",
    color: "#22C55E",
  },
  {
    title: "Vacant Units",
    value: "8",
    color: "#F59E0B",
  },
  {
    title: "Average Rent",
    value: "₹18,500",
    color: "#2563EB",
  },
  {
    title: "Today's Visitors",
    value: "145",
    color: "#8B5CF6",
  },
];

export default function DashboardStats() {
  return (
    <Grid container spacing={3}>
      {stats.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 4,
              borderLeft: `6px solid ${item.color}`,
            }}
          >
            <Typography color="text.secondary">
              {item.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}