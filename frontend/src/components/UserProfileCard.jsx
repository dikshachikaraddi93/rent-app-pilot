import {
  Avatar,
  Box,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

export default function UserProfile() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{
            width: 70,
            height: 70,
            bgcolor: "#2563EB",
          }}
        >
          D
        </Avatar>

        <Box>
          <Typography variant="h6" fontWeight="bold">
            Diksha Chikaraddi
          </Typography>

          <Typography color="text.secondary">
            Admin
          </Typography>

          <Chip
            label="Online"
            color="success"
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>
    </Paper>
  );
}