import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function TopNavbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#ffffff",
        color: "#222",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}

        <Box>

          <Typography
            variant="h5"
            fontWeight="bold"
            color="#4CAF50"
          >
            Rent APP Pilot
          </Typography>

          <Typography
            variant="subtitle2"
            color="green"
          >
            Automated Rent Collection
          </Typography>

        </Box>

        {/* Search */}

        <TextField
          size="small"
          placeholder="Search..."
          sx={{
            width: 300,
            bgcolor: "#F5F5F5",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Right Side */}

        <Box
          display="flex"
          alignItems="center"
          gap={4}
        >
          <Badge
            badgeContent={3}
            color="warning"
          >
            <NotificationsIcon />
          </Badge>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Avatar>B</Avatar>

            <Typography
              fontWeight="bold"
            >
              Bhoopal
            </Typography>
          </Box>

        </Box>

      </Toolbar>
    </AppBar>
  );
}