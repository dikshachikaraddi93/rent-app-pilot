import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import {
  Bar,
  Pie,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Reports() {

  const [dashboard, setDashboard] = useState({
    totalProperties: 0,
    totalTenants: 0,
    totalPayments: 0,
    totalRentCollected: 0,
  });

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setDashboard(res.data))
      .catch(console.error);
  }, []);

  const barData = {
    labels: [
      "Properties",
      "Tenants",
      "Payments",
    ],
    datasets: [
      {
        label: "Count",
        data: [
          dashboard.totalProperties,
          dashboard.totalTenants,
          dashboard.totalPayments,
        ],
        backgroundColor: [
          "#1976d2",
          "#43a047",
          "#fb8c00",
        ],
      },
    ],
  };

  const pieData = {
    labels: [
      "Rent Collected",
      "Remaining",
    ],
    datasets: [
      {
        data: [
          dashboard.totalRentCollected,
          100000 - dashboard.totalRentCollected,
        ],
        backgroundColor: [
          "#4caf50",
          "#e53935",
        ],
      },
    ],
  };

  return (
    <Box sx={{ p:4 }}>

      <Typography variant="h4" mb={4}>
        Reports Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <Card>

            <CardContent>

              <Typography variant="h6">
                Properties
              </Typography>

              <Typography variant="h4">
                {dashboard.totalProperties}
              </Typography>

            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>

            <CardContent>

              <Typography variant="h6">
                Tenants
              </Typography>

              <Typography variant="h4">
                {dashboard.totalTenants}
              </Typography>

            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>

            <CardContent>

              <Typography variant="h6">
                Payments
              </Typography>

              <Typography variant="h4">
                {dashboard.totalPayments}
              </Typography>

            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>

            <CardContent>

              <Typography variant="h6">
                Rent Collected
              </Typography>

              <Typography variant="h4">
                ₹{dashboard.totalRentCollected}
              </Typography>

            </CardContent>

          </Card>
        </Grid>

      </Grid>

      <Grid
        container
        spacing={4}
        sx={{ mt:2 }}
      >

        <Grid item xs={12} md={6}>
          <Bar data={barData} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Pie data={pieData} />
        </Grid>

      </Grid>

    </Box>
  );
}