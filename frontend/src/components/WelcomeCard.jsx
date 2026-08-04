import { Card, CardContent, Typography } from "@mui/material";

export default function WelcomeCard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {greeting}, Bhoopal 👋
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Welcome to Rent APP Pilot
        </Typography>

      </CardContent>
    </Card>
  );
}