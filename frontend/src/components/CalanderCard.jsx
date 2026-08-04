import {
  Paper,
  Typography,
} from "@mui/material";

export default function CalendarCard() {

  const today = new Date();

  return (

    <Paper
      sx={{
        p:3,
        borderRadius:4
      }}
    >

      <Typography
      variant="h6"
      fontWeight="bold"
      >
      Today's Date
      </Typography>

      <Typography
      variant="h4"
      mt={2}
      >
      {today.toDateString()}
      </Typography>

    </Paper>

  );

}