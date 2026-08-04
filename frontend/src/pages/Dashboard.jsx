import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  getPayments,
  getProperties,
  getTenants,
} from "../api/dashboardApi";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

const openMenu = Boolean(anchorEl);

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {
    try {
      const p = await getProperties();
      const t = await getTenants();
      const pay = await getPayments();

      setProperties(p.data);
      setTenants(t.data);
      setPayments(pay.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );

  const monthlyData = payments.reduce((acc, p) => {
    const month = p.paymentDate
      ? p.paymentDate.substring(0, 7)
      : "Unknown";

    const existing = acc.find((x) => x.month === month);

    if (existing) {
      existing.amount += p.amount || 0;
    } else {
      acc.push({
        month,
        amount: p.amount || 0,
      });
    }

    return acc;
  }, []);

  const pieData = [
    {
      name: "Paid",
      value: payments.filter(
        (x) => x.paymentStatus === "Paid"
      ).length,
    },
    {
      name: "Pending",
      value: payments.filter(
        (x) => x.paymentStatus === "Pending"
      ).length,
    },
    {
      name: "Failed",
      value: payments.filter(
        (x) => x.paymentStatus === "Failed"
      ).length,
    },
  ];

  const COLORS = [
    "#4F46E5",
    "#22C55E",
    "#F97316",
  ];

  const cards = [
    {
      title: "Properties",
      value: properties.length,
      icon: <ApartmentRoundedIcon />,
      bg: "#EEF2FF",
      color: "#4F46E5",
    },
    {
      title: "Tenants",
      value: tenants.length,
      icon: <GroupsRoundedIcon />,
      bg: "#ECFDF5",
      color: "#16A34A",
    },
    {
      title: "Payments",
      value: payments.length,
      icon: <PaymentsRoundedIcon />,
      bg: "#FFF7ED",
      color: "#EA580C",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <CurrencyRupeeRoundedIcon />,
      bg: "#FDF2F8",
      color: "#DB2777",
    },
  ];
    return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#F5F7FB",
        p: 4,
        boxSizing: "border-box",
      }}
    >
      {/* ================= HEADER ================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#0F172A"
          >
            Dashboard
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              mt: 1,
            }}
          >
            Welcome back 👋 Here's your rent management overview.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
  placeholder="Search..."
  size="small"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{
    width: 280,
    bgcolor: "#fff",
    borderRadius: 3,
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchRoundedIcon />
      </InputAdornment>
    ),
  }}
/>

          <IconButton
  onClick={() => setOpenNotification(true)}
  sx={{
    bgcolor: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  }}
>
  <NotificationsNoneRoundedIcon />
</IconButton>

          <IconButton
  onClick={() => navigate("/settings")}
  sx={{
    bgcolor: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
    transition: "0.3s",

    "&:hover": {
      bgcolor: "#4F46E5",
      color: "#fff",
      transform: "rotate(45deg)",
    },
  }}
>
  <SettingsRoundedIcon />
</IconButton>

          <Avatar
  onClick={handleMenuOpen}
  sx={{
    bgcolor: "#6366F1",
    width: 45,
    height: 45,
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  D
</Avatar>
        </Box>
      </Box>

      {/* ================= HERO BANNER ================= */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 6,
          overflow: "hidden",
          mb: 4,
          background:
            "linear-gradient(135deg,#4F46E5,#7C3AED)",
          color: "#fff",
          p: 5,
          position: "relative",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
        >
          Welcome to RentPilot 🚀
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: 18,
            opacity: 0.9,
            maxWidth: 600,
          }}
        >
          Manage properties, tenants and rent collection
          with a beautiful modern dashboard.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 4,
            flexWrap: "wrap",
          }}
        >
          <Button
  variant="contained"
  onClick={() => navigate("/properties")}
  sx={{
    bgcolor: "#fff",
    color: "#4F46E5",
    px: 4,
    py: 1.2,
    borderRadius: 3,
    fontWeight: 700,
  }}
>
  + Add Property
</Button>

          <Button
  variant="outlined"
  onClick={() => navigate("/payments")}
  sx={{
    borderColor: "#fff",
    color: "#fff",
    px: 4,
    py: 1.2,
    borderRadius: 3,
    "&:hover": {
      borderColor: "#fff",
      bgcolor: "rgba(255,255,255,0.1)",
    },
  }}
>
  Collect Rent
</Button>
        </Box>

        <Box
          sx={{
            position: "absolute",
            right: -60,
            top: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,.10)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: 60,
            bottom: -70,
            width: 160,
            height: 160,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,.08)",
          }}
        />
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>

  <Grid size={{ xs: 12, md: 4 }}>
    <Paper
      onClick={() => navigate("/properties")}
      sx={{
        p: 3,
        cursor: "pointer",
        borderRadius: 4,
        textAlign: "center",
        transition: ".3s",
        "&:hover": {
          bgcolor: "#EEF2FF",
          transform: "translateY(-5px)",
        },
      }}
    >
      <ApartmentRoundedIcon
        sx={{
          fontSize: 45,
          color: "#4F46E5",
        }}
      />

      <Typography
        variant="h6"
        mt={2}
        fontWeight="bold"
      >
        Add Property
      </Typography>

      <Typography color="text.secondary">
        Register a new property
      </Typography>

    </Paper>
  </Grid>

  <Grid size={{ xs: 12, md: 4 }}>
    <Paper
      onClick={() => navigate("/tenants")}
      sx={{
        p: 3,
        cursor: "pointer",
        borderRadius: 4,
        textAlign: "center",
        transition: ".3s",
        "&:hover": {
          bgcolor: "#ECFDF5",
          transform: "translateY(-5px)",
        },
      }}
    >
      <GroupsRoundedIcon
        sx={{
          fontSize: 45,
          color: "#10B981",
        }}
      />

      <Typography
        variant="h6"
        mt={2}
        fontWeight="bold"
      >
        Add Tenant
      </Typography>

      <Typography color="text.secondary">
        Register a new tenant
      </Typography>

    </Paper>
  </Grid>

  <Grid size={{ xs: 12, md: 4 }}>
    <Paper
      onClick={() => navigate("/payments")}
      sx={{
        p: 3,
        cursor: "pointer",
        borderRadius: 4,
        textAlign: "center",
        transition: ".3s",
        "&:hover": {
          bgcolor: "#FFF7ED",
          transform: "translateY(-5px)",
        },
      }}
    >
      <PaymentsRoundedIcon
        sx={{
          fontSize: 45,
          color: "#F97316",
        }}
      />

      <Typography
        variant="h6"
        mt={2}
        fontWeight="bold"
      >
        Collect Rent
      </Typography>

      <Typography color="text.secondary">
        Record a rent payment
      </Typography>

    </Paper>
  </Grid>

</Grid>

      {/* ================= STATISTICS ================= */}

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}
            key={index}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                background: "#fff",
                boxShadow:
                  "0 12px 30px rgba(0,0,0,.08)",
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,.15)",
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography color="text.secondary">
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    mt={1}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      color: "#22C55E",
                      fontWeight: 600,
                    }}
                  >
                    ↑ 12% this month
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    bgcolor: card.bg,
                    color: card.color,
                    width: 70,
                    height: 70,
                  }}
                >
                  {card.icon}
                </Avatar>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
            {/* ================= CHARTS ================= */}

      <Grid container spacing={3} sx={{ mt: 1 }}>

        {/* Monthly Revenue */}

        <Grid size={{ xs: 12, lg: 8 }}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              height: 420,
              boxShadow: "0 12px 30px rgba(0,0,0,.08)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
            >
              Monthly Revenue
            </Typography>

            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="4 4" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  radius={[10, 10, 0, 0]}
                  fill="#6366F1"
                />
              </BarChart>
            </ResponsiveContainer>

          </Paper>

        </Grid>

        {/* Payment Status */}

        <Grid size={{ xs: 12, lg: 4 }}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              height: 420,
              boxShadow: "0 12px 30px rgba(0,0,0,.08)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
            >
              Payment Status
            </Typography>

            <ResponsiveContainer width="100%" height="85%">
              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </Paper>

        </Grid>

      </Grid>
      <Grid container spacing={3} sx={{ mt: 2, mb: 3 }}>

  <Grid size={{ xs: 12 }}>

    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 5,
        boxShadow: "0 12px 30px rgba(0,0,0,.08)",
      }}
    >

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Recent Activity
      </Typography>

      <Timeline position="right">

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="success" />
            <TimelineConnector />
          </TimelineSeparator>

          <TimelineContent>
            <Typography fontWeight="bold">
              Rent Received
            </Typography>

            <Typography color="text.secondary">
              Rahul Sharma paid ₹15,000 today.
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>

          <TimelineContent>
            <Typography fontWeight="bold">
              Property Added
            </Typography>

            <Typography color="text.secondary">
              Sunrise Apartments added successfully.
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="warning" />
            <TimelineConnector />
          </TimelineSeparator>

          <TimelineContent>
            <Typography fontWeight="bold">
              Rent Due
            </Typography>

            <Typography color="text.secondary">
              2 tenants have rent due tomorrow.
            </Typography>
          </TimelineContent>
        </TimelineItem>

      </Timeline>

    </Paper>

  </Grid>

</Grid>
            {/* ================= BOTTOM SECTION ================= */}

      <Grid container spacing={3} sx={{ mt: 1 }}>

        {/* Recent Payments */}

        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              boxShadow: "0 12px 30px rgba(0,0,0,.08)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Recent Payments
            </Typography>

            <TableContainer>

              <Table>

                <TableHead>

                  <TableRow>

                    <TableCell><b>Tenant</b></TableCell>

                    <TableCell><b>Amount</b></TableCell>

                    <TableCell><b>Date</b></TableCell>

                    <TableCell><b>Mode</b></TableCell>

                    <TableCell><b>Status</b></TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {payments
                    .filter((p) => {
  const searchText = search.toLowerCase();

  return (
    p.tenant?.fullName?.toLowerCase().includes(searchText) ||
    p.paymentMode?.toLowerCase().includes(searchText) ||
    p.paymentStatus?.toLowerCase().includes(searchText) ||
    String(p.amount).includes(searchText) ||
    p.paymentDate?.includes(searchText)
  );
})
                    .slice(0, 6)
                    .map((payment) => (
                      <TableRow
                        key={payment.id}
                        hover
                      >
                        <TableCell>

                          <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "#6366F1",
                              }}
                            >
                              {payment.tenant?.fullName?.charAt(0)}
                            </Avatar>

                            <Typography fontWeight={600}>
                              {payment.tenant?.fullName}
                            </Typography>

                          </Box>

                        </TableCell>

                        <TableCell>
                          ₹{payment.amount}
                        </TableCell>

                        <TableCell>
                          {payment.paymentDate}
                        </TableCell>

                        <TableCell>

                          <Chip
                            label={payment.paymentMode}
                            color="primary"
                            variant="outlined"
                          />

                        </TableCell>

                        <TableCell>

                          <Chip
                            label={payment.paymentStatus}
                            color={
                              payment.paymentStatus === "Paid"
                                ? "success"
                                : payment.paymentStatus === "Pending"
                                ? "warning"
                                : "error"
                            }
                          />

                        </TableCell>

                      </TableRow>
                    ))}

                </TableBody>

              </Table>

            </TableContainer>

          </Paper>
        </Grid>

        {/* Quick Summary */}

        <Grid size={{ xs: 12, lg: 4 }}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              height: "100%",
              boxShadow: "0 12px 30px rgba(0,0,0,.08)",
            }}
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
            >
              Quick Summary
            </Typography>

            <Box
              display="flex"
              flexDirection="column"
              gap={3}
            >

              <Paper
                sx={{
                  p: 2,
                  bgcolor: "#EEF2FF",
                  borderRadius: 3,
                }}
              >
                <Typography color="text.secondary">
                  Total Properties
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {properties.length}
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  bgcolor: "#ECFDF5",
                  borderRadius: 3,
                }}
              >
                <Typography color="text.secondary">
                  Active Tenants
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {tenants.length}
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  bgcolor: "#FEF3C7",
                  borderRadius: 3,
                }}
              >
                <Typography color="text.secondary">
                  Total Revenue
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  ₹{totalRevenue.toLocaleString()}
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  bgcolor: "#FCE7F3",
                  borderRadius: 3,
                }}
              >
                <Typography color="text.secondary">
                  Paid Payments
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {
                    payments.filter(
                      (p) => p.paymentStatus === "Paid"
                    ).length
                  }
                </Typography>
              </Paper>

            </Box>

          </Paper>

        </Grid>

      </Grid>
      <Dialog
  open={openNotification}
  onClose={() => setOpenNotification(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Notifications</DialogTitle>

  <DialogContent>
    <List>

      <ListItem>
        <ListItemText
          primary="💰 Rent received from Rahul Sharma"
          secondary="Today"
        />
      </ListItem>

      <ListItem>
        <ListItemText
          primary="🏠 New Property Added"
          secondary="Yesterday"
        />
      </ListItem>

      <ListItem>
        <ListItemText
          primary="⏰ Two tenants have pending rent"
          secondary="This Week"
        />
      </ListItem>

    </List>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenNotification(false)}>
      Close
    </Button>
  </DialogActions>
</Dialog>
<Menu
  anchorEl={anchorEl}
  open={openMenu}
  onClose={handleMenuClose}
>
  <MenuItem onClick={handleMenuClose}>
    👤 My Profile
  </MenuItem>

  <MenuItem
    onClick={() => {
      navigate("/");
      handleMenuClose();
    }}
  >
    🏠 Dashboard
  </MenuItem>

  <MenuItem
    onClick={() => {
      navigate("/settings");
      handleMenuClose();
    }}
  >
    ⚙️ Settings
  </MenuItem>

  <Divider />

  <MenuItem
    onClick={() => {
      alert("Logout functionality coming soon!");
      handleMenuClose();
    }}
    sx={{ color: "red" }}
  >
    🚪 Logout
  </MenuItem>
</Menu>
    </Box>
    
  );
}