import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

export default function Settings({
  darkMode,
  setDarkMode,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const [name, setName] = useState(
    localStorage.getItem("userName") || "Admin"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );

  const [openPassword, setOpenPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    alert("Profile updated successfully!");
  };

  const handlePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("userPassword", newPassword);

    alert("Password updated successfully!");

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setOpenPassword(false);
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("isLoggedIn");

    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }

    navigate("/login");
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Settings
      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>

            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar
                sx={{
                  bgcolor: "#6366F1",
                  width: 60,
                  height: 60,
                }}
              >
                <PersonRoundedIcon />
              </Avatar>

              <Typography variant="h5" fontWeight="bold">
                Profile
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSave}
            >
              Save Changes
            </Button>

          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>

            <Typography variant="h5" fontWeight="bold" mb={3}>
              Preferences
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) =>
                    setDarkMode(e.target.checked)
                  }
                />
              }
              label="Dark Mode"
            />

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="SMS Notifications"
            />

          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>

            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <SecurityRoundedIcon color="primary" />

              <Typography variant="h5" fontWeight="bold">
                Security
              </Typography>
            </Box>

            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => setOpenPassword(true)}
            >
              Change Password
            </Button>

            <Button
              color="error"
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>

            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <NotificationsRoundedIcon color="primary" />

              <Typography variant="h5" fontWeight="bold">
                Notification Settings
              </Typography>
            </Box>

            <Typography color="text.secondary">
              Manage email alerts, payment reminders,
              rent due notifications and tenant updates.
            </Typography>

          </Paper>
        </Grid>

      </Grid>

      <Dialog
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Change Password</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            type="password"
            label="Current Password"
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="New Password"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpenPassword(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handlePassword}
          >
            Update Password
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );
}