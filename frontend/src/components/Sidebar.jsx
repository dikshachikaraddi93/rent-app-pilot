import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 250;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    text: "Properties",
    icon: <ApartmentIcon />,
    path: "/properties",
  },
  {
    text: "Tenants",
    icon: <GroupsIcon />,
    path: "/tenants",
  },
  {
    text: "Payments",
    icon: <PaymentsIcon />,
    path: "/payments",
  },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0F172A",
          color: "white",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#4ADE80"
        >
          RentPilot
        </Typography>

        <Typography
          variant="body2"
          color="#94A3B8"
        >
          Rent Collection System
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,
              color: "white",
              "&.Mui-selected": {
                backgroundColor: "#2563EB",
              },
              "&:hover": {
                backgroundColor: "#1E293B",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}